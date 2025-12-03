import React from 'react';

export default function CurrencyInput({ field, value, onChange, onBlur, error, accentColor, isLast }) {
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

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground sm:text-sm">{config.currencySymbol || '$'}</span>
                </div>
                <input
                    type="number"
                    id={field.id}
                    value={value || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    onBlur={() => onBlur(field.id)}
                    placeholder={config.placeholder}
                    min={validation.min}
                    max={validation.max}
                    step="0.01"
                    className={`w-full pl-7 pr-3 py-2 border rounded-md bg-background text-sm focus:outline-none transition-colors ${error
                        ? 'border-destructive focus:border-destructive placeholder:text-destructive/60'
                        : `border-input focus:border-${accentColor} placeholder:text-${accentColor}/60`
                        }`}
                />
            </div>
        </div>
    );
}
