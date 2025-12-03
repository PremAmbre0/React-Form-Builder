import React from 'react';

export default function ColorPickerInput({ field, value, onChange, onBlur, error, accentColor, isLast }) {
    const { config, validation } = field;
    return (
        <div className={`space-y-2 relative ${isLast ? 'pb-5' : 'pb-0'}`}>
            <div className="flex justify-between items-center">
                <label htmlFor={field.id} className="block text-sm font-medium">
                    {config.label} {validation.required && <span className="text-destructive">*</span>}
                </label>
                {error && <span className="text-xs text-destructive">{error}</span>}
            </div>
            {config.helpText && <p className="text-xs text-muted-foreground">{config.helpText}</p>}

            <div className="flex items-center gap-3">
                <input
                    type="color"
                    id={field.id}
                    value={value || config.defaultValue || '#000000'}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    onBlur={() => onBlur(field.id)}
                    className="h-10 w-20 p-1 border rounded cursor-pointer bg-background"
                />
                <span className="text-sm font-mono text-muted-foreground uppercase">
                    {value || config.defaultValue || '#000000'}
                </span>
            </div>
        </div>
    );
}
