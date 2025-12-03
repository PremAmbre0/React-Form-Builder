import React from 'react';
import useFormStore from '../../store/useFormStore';

const ACCENT_COLORS = [
    { name: 'Indigo', value: '#4f46e5', class: 'indigo-600' },
    { name: 'Emerald', value: '#10b981', class: 'emerald-500' },
    { name: 'Rose', value: '#f43f5e', class: 'rose-500' },
    { name: 'Amber', value: '#f59e0b', class: 'amber-500' },
    { name: 'Slate', value: '#475569', class: 'slate-600' },
];

export default function MetadataEditor() {
    const { activeForm, updateFormMetadata } = useFormStore();

    if (!activeForm) return null;

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Form Settings</h3>

            <div className="space-y-4 pb-4 border-b border-border/50">
                <label htmlFor="form-title" className="text-sm font-medium">
                    Form Title
                </label>
                <input
                    id="form-title"
                    type="text"
                    value={activeForm.title}
                    onChange={(e) => updateFormMetadata({ title: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-0"
                    placeholder="Enter form title"
                />
            </div>

            <div className="space-y-4 pb-4 border-b border-border/50">
                <label htmlFor="form-description" className="text-sm font-medium">
                    Description
                </label>
                <textarea
                    id="form-description"
                    value={activeForm.description}
                    onChange={(e) => updateFormMetadata({ description: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-0 min-h-[80px]"
                    placeholder="Enter form description"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Accent Color</label>
                <div className="flex gap-3">
                    {ACCENT_COLORS.map((color) => (
                        <button
                            key={color.class}
                            onClick={() => updateFormMetadata({ accentColor: color.class })}
                            className={`w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring flex items-center justify-center ${activeForm.accentColor === color.class ? 'ring-2 ring-offset-2 ring-ring scale-110' : ''
                                }`}
                            title={color.name}
                        >
                            <div
                                className="w-full h-full rounded-full border border-border/20"
                                style={{ backgroundColor: color.value }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
