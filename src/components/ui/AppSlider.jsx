import React, { useState } from 'react';

const AppSlider = ({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    showTooltip = false,
    error,
    required = false,
    disabled = false,
    className = '',
    helpText,
    accentColor = 'primary'
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleSliderChange = (e) => {
        onChange(parseFloat(e.target.value));
    };

    return (
        <div className={`flex flex-col ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Label and Hint Group */}
            {(label || helpText) && (
                <div className="mb-2">
                    <div className="flex justify-between items-center">
                        {label && (
                            <label className="block text-sm font-medium">
                                {label} {required && <span className="text-destructive">*</span>}
                            </label>
                        )}
                        <span className="text-sm font-medium text-muted-foreground">{value}</span>
                    </div>
                    {helpText && <div className="text-xs text-muted-foreground">{helpText}</div>}
                </div>
            )}

            <div className="relative flex items-center h-6">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value || min}
                    onChange={handleSliderChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    disabled={disabled}
                    className={`w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-${accentColor}`}
                    style={{
                        accentColor: `var(--color-${accentColor})`
                    }}
                />

                {/* Tooltip */}
                {showTooltip && isDragging && (
                    <div
                        className="absolute -top-8 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md border border-border"
                        style={{
                            left: `${((value - min) / (max - min)) * 100}%`
                        }}
                    >
                        {value}
                    </div>
                )}
            </div>

            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{min}</span>
                <span>{max}</span>
            </div>

            {error && <span className="text-xs text-destructive mt-1">{error}</span>}
        </div>
    );
};

export default AppSlider;
