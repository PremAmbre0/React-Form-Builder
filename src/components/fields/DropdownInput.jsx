import React from 'react';

export default function DropdownInput({ field, value, onChange, onBlur, error, accentColor, isLast }) {
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

            <select
                id={field.id}
                value={value || ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                onBlur={() => onBlur(field.id)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none transition-colors appearance-none ${error
                    ? 'border-destructive focus:border-destructive'
                    : `border-input focus:border-${accentColor}`
                    }`}
            >
                <option value="" disabled>Select an option</option>
                {config.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
