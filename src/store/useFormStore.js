import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FIELD_DEFINITIONS } from '../constants/fieldSchemas';

const useFormStore = create(
    persist(
        (set, get) => ({
            allForms: [],
            activeForm: null,
            selectedFieldId: null,

            loadAllForms: () => {
                // Persistence handles loading, but we can have explicit logic here if needed
            },

            createNewForm: (form) => {
                const newForm = {
                    id: crypto.randomUUID(),
                    title: 'Untitled Form',
                    description: '',
                    accentColor: 'indigo-600',
                    fields: [],
                    createdAt: new Date().toISOString(),
                    ...form,
                };
                set((state) => ({
                    allForms: [...state.allForms, newForm],
                    activeForm: newForm,
                }));
                return newForm.id;
            },

            loadForm: (formId) => {
                const form = get().allForms.find((f) => f.id === formId);
                if (form) {
                    set({ activeForm: form });
                } else {
                    set({ activeForm: null });
                }
            },

            saveForm: () => {
                const { activeForm, allForms } = get();
                if (!activeForm) return;

                const updatedForms = allForms.map((f) =>
                    f.id === activeForm.id ? activeForm : f
                );
                set({ allForms: updatedForms });
            },

            deleteForm: (formId) => {
                set((state) => ({
                    allForms: state.allForms.filter((f) => f.id !== formId),
                    activeForm: state.activeForm?.id === formId ? null : state.activeForm,
                }));
            },

            updateFormMetadata: (updates) => {
                set((state) => ({
                    activeForm: state.activeForm
                        ? { ...state.activeForm, ...updates }
                        : null,
                }));
                get().saveForm();
            },

            sidebarMode: null, // 'picker', 'settings', or null

            openSidebar: (mode = 'picker') => set({ sidebarMode: mode }),
            closeSidebar: () => set({ sidebarMode: null, selectedFieldId: null }),

            addField: (fieldType) => {
                set((state) => {
                    if (!state.activeForm) return state;

                    const definition = FIELD_DEFINITIONS[fieldType] || FIELD_DEFINITIONS.text;
                    const newField = {
                        id: crypto.randomUUID(),
                        type: fieldType,
                        config: { ...definition.config },
                        validation: { ...definition.validation }
                    };

                    return {
                        activeForm: {
                            ...state.activeForm,
                            fields: [...state.activeForm.fields, newField],
                        },
                        selectedFieldId: null, // Deselect to close settings if open, or keep closed
                        sidebarMode: null, // Close sidebar after adding
                    };
                });
                get().saveForm();
            },

            updateField: (fieldId, updates) => {
                set((state) => {
                    if (!state.activeForm) return state;
                    const updatedFields = state.activeForm.fields.map((f) => {
                        if (f.id !== fieldId) return f;

                        // Handle nested updates for config and validation
                        const newConfig = updates.config
                            ? { ...f.config, ...updates.config }
                            : f.config;

                        const newValidation = updates.validation
                            ? { ...f.validation, ...updates.validation }
                            : f.validation;

                        return {
                            ...f,
                            ...updates,
                            config: newConfig,
                            validation: newValidation
                        };
                    });
                    return {
                        activeForm: { ...state.activeForm, fields: updatedFields },
                    };
                });
                get().saveForm();
            },

            removeField: (fieldId) => {
                set((state) => {
                    if (!state.activeForm) return state;
                    return {
                        activeForm: {
                            ...state.activeForm,
                            fields: state.activeForm.fields.filter((f) => f.id !== fieldId),
                        },
                        selectedFieldId:
                            state.selectedFieldId === fieldId ? null : state.selectedFieldId,
                        sidebarMode: state.selectedFieldId === fieldId ? null : state.sidebarMode
                    };
                });
                get().saveForm();
            },

            selectField: (fieldId) => set({ selectedFieldId: fieldId, sidebarMode: 'settings' }),

            moveField: (activeId, overId) => {
                set((state) => {
                    if (!state.activeForm) return state;
                    const fields = [...state.activeForm.fields];
                    const oldIndex = fields.findIndex((f) => f.id === activeId);
                    const newIndex = fields.findIndex((f) => f.id === overId);

                    if (oldIndex === -1 || newIndex === -1) return state;

                    const [movedField] = fields.splice(oldIndex, 1);
                    fields.splice(newIndex, 0, movedField);

                    return {
                        activeForm: { ...state.activeForm, fields },
                    };
                });
                get().saveForm();
            },
        }),
        {
            name: 'form-builder-storage',
            partialize: (state) => ({ allForms: state.allForms }), // Only persist allForms
        }
    )
);

export default useFormStore;
