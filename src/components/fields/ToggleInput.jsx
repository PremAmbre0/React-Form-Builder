import React from 'react';

export default function ToggleInput({ field, value, onChange, onBlur, error, accentColor, isLast }) {
    const { config, validation } = field;
    const isChecked = !!value;

    return (
        <div className={`space-y-2 relative ${isLast ? 'pb-5' : 'pb-0'}`}>
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">
                    {config.label} {validation.required && <span className="text-destructive">*</span>}
                </label>
                {error && <span className="text-xs text-destructive">{error}</span>}
            </div>
            {config.helpText && <p className="text-xs text-muted-foreground">{config.helpText}</p>}

            <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isChecked}
                        onChange={(e) => onChange(field.id, e.target.checked)}
                        onBlur={() => onBlur(field.id)}
                    />
                    <div className={`w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-${accentColor}/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${accentColor}`}
                        style={isChecked ? { backgroundColor: `var(--${accentColor})` } : {}}
                    ></div>
                </label>
                <span className="text-sm font-medium text-muted-foreground">
                    {isChecked ? (config.onLabel || 'On') : (config.offLabel || 'Off')}
                </span>
            </div>
        </div>
    );
}
