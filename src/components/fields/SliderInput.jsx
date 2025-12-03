import React from 'react';

export default function SliderInput({ field, value, onChange, onBlur, error, accentColor, isLast }) {
    const { config, validation } = field;
    const currentValue = value !== undefined ? value : config.defaultValue;

    return (
        <div className={`space-y-2 relative ${isLast ? 'pb-5' : 'pb-0'}`}>
            <div className="flex justify-between items-center">
                <label htmlFor={field.id} className="block text-sm font-medium">
                    {config.label} {validation.required && <span className="text-destructive">*</span>}
                </label>
                {config.showLabels && (
                    <span className="text-sm font-medium text-muted-foreground">{currentValue}</span>
                )}
            </div>
            {config.helpText && <p className="text-xs text-muted-foreground">{config.helpText}</p>}

            <div className="flex items-center gap-4">
                {config.showLabels && <span className="text-xs text-muted-foreground">{validation.min}</span>}
                <input
                    type="range"
                    id={field.id}
                    value={currentValue}
                    onChange={(e) => onChange(field.id, parseInt(e.target.value))}
                    onBlur={() => onBlur(field.id)}
                    min={validation.min}
                    max={validation.max}
                    step={validation.step}
                    className={`w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-${accentColor}`}
                    style={{ accentColor: `var(--${accentColor})` }} // Fallback or direct style if needed
                />
                {config.showLabels && <span className="text-xs text-muted-foreground">{validation.max}</span>}
            </div>

            {error && <span className="text-xs text-destructive block mt-1">{error}</span>}
        </div>
    );
}
