import React from 'react';

export default function EmailInput({ field, value, onChange, onBlur, error, accentColor, isLast }) {
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
            <input
                type="email"
                id={field.id}
                value={value || ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                onBlur={() => onBlur(field.id)}
                placeholder={config.placeholder}
                className={`w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none transition-colors ${error
                    ? 'border-destructive focus:border-destructive placeholder:text-destructive/60'
                    : `border-input focus:border-${accentColor} placeholder:text-${accentColor}/60`
                    }`}
            />
        </div>
    );
}
