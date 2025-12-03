import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function FieldConfigEditor({ field, updateField }) {
    const { type, config, validation } = field;

    const handleConfigChange = (key, value) => {
        updateField(field.id, { config: { [key]: value } });
    };

    const handleValidationChange = (key, value) => {
        updateField(field.id, { validation: { [key]: value } });
    };

    const addOption = () => {
        const newOption = { label: `Option ${config.options.length + 1}`, value: `option${config.options.length + 1}` };
        handleConfigChange('options', [...config.options, newOption]);
    };

    const updateOption = (index, key, value) => {
        const newOptions = [...config.options];
        newOptions[index] = { ...newOptions[index], [key]: value };
        // Auto-update value if it matches the old label (simple convenience)
        if (key === 'label' && newOptions[index].value === newOptions[index].label.toLowerCase().replace(/\s+/g, '')) {
            newOptions[index].value = value.toLowerCase().replace(/\s+/g, '');
        }
        handleConfigChange('options', newOptions);
    };

    const removeOption = (index) => {
        const newOptions = config.options.filter((_, i) => i !== index);
        handleConfigChange('options', newOptions);
    };

    return (
        <div className="space-y-4 p-1">
            {/* Common Configuration */}
            <div className="space-y-3">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Label</label>
                    <input
                        type="text"
                        value={config.label}
                        onChange={(e) => handleConfigChange('label', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                </div>

                {/* Help Text / Description */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Help Text</label>
                    <input
                        type="text"
                        value={config.helpText || ''}
                        onChange={(e) => handleConfigChange('helpText', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        placeholder="Description or instructions for the user"
                    />
                </div>
            </div>

            {/* Type Specific Configuration */}
            <div className="space-y-3 pt-2 border-t border-border/50">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Settings</h4>

                {/* Placeholder (Text, Number, Textarea) */}
                {['text', 'number', 'textarea'].includes(type) && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Placeholder</label>
                        <input
                            type="text"
                            value={config.placeholder || ''}
                            onChange={(e) => handleConfigChange('placeholder', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                    </div>
                )}

                {/* Validation Type (Text) */}
                {type === 'text' && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Validation Type</label>
                        <select
                            value={config.validationType || 'none'}
                            onChange={(e) => handleConfigChange('validationType', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        >
                            <option value="none">None (Text)</option>
                            <option value="email">Email</option>
                            <option value="website">Website (URL)</option>
                            <option value="number">Number (Numeric String)</option>
                        </select>
                    </div>
                )}

                {/* Options (Dropdown, Checkbox, Radio) */}
                {['dropdown', 'checkboxGroup', 'radioGroup'].includes(type) && (
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Options</label>
                        <div className="space-y-2">
                            {config.options?.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={option.label}
                                        onChange={(e) => updateOption(index, 'label', e.target.value)}
                                        className="flex-1 px-2 py-1.5 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary"
                                        placeholder="Option Label"
                                    />
                                    <button
                                        onClick={() => removeOption(index)}
                                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addOption}
                                className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                            >
                                <Plus size={14} /> Add Option
                            </button>
                        </div>
                    </div>
                )}

                {/* Toggle Labels */}
                {type === 'toggle' && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">On Label</label>
                            <input
                                type="text"
                                value={config.onLabel || 'On'}
                                onChange={(e) => handleConfigChange('onLabel', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Off Label</label>
                            <input
                                type="text"
                                value={config.offLabel || 'Off'}
                                onChange={(e) => handleConfigChange('offLabel', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Validation */}
            <div className="space-y-3 pt-2 border-t border-border/50">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Validation</h4>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id={`required-${field.id}`}
                        checked={validation.required || false}
                        onChange={(e) => handleValidationChange('required', e.target.checked)}
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <label htmlFor={`required-${field.id}`} className="text-sm font-medium cursor-pointer select-none">Required Field</label>
                </div>

                {/* Min/Max Length (Text types) */}
                {['text'].includes(type) && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Min Length</label>
                            <input
                                type="number"
                                value={validation.minLength || ''}
                                onChange={(e) => handleValidationChange('minLength', e.target.value ? parseInt(e.target.value) : undefined)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Max Length</label>
                            <input
                                type="number"
                                value={validation.maxLength || ''}
                                onChange={(e) => handleValidationChange('maxLength', e.target.value ? parseInt(e.target.value) : undefined)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                )}

                {/* Min/Max Value (Number, Range) */}
                {['number', 'range'].includes(type) && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Min</label>
                            <input
                                type="number"
                                value={validation.min !== undefined ? validation.min : ''}
                                onChange={(e) => handleValidationChange('min', e.target.value ? parseFloat(e.target.value) : undefined)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-muted-foreground">Max</label>
                            <input
                                type="number"
                                value={validation.max !== undefined ? validation.max : ''}
                                onChange={(e) => handleValidationChange('max', e.target.value ? parseFloat(e.target.value) : undefined)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
