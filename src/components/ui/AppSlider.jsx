import React, { useState } from 'react';
import { ACCENT_COLORS } from '../../constants/colors';

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
    accentColor = 'primary',
    accentColorHex
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleSliderChange = (e) => {
        let rawValue = parseFloat(e.target.value);

        // Custom snapping logic because default range input 'step' attribute strictly 
        // follows min + k*step, which might make max unreachable (e.g. min 1, max 100, step 10 -> stops at 91).

        if (step && step > 0) {
            // Calculate nearest step
            let snapped = Math.round((rawValue - min) / step) * step + min;

            // However, we also want to snap to Max if we are close to it, or strictly clamp.
            // But specific user request: "limit as well".
            // If the strict step lands us at 91, and max is 100.
            // Users want to be able to pick 100.

            // If `snapped` is close to max, use max?
            // Or better: ensure we can always pick Max.
            // If the native 'step' was removed, `rawValue` is high precision.

            // Let's check distance to Max vs distance to nearest step.
            if (Math.abs(rawValue - max) < step) {
                snapped = max;
            }

            // Clamp to min/max
            snapped = Math.min(Math.max(snapped, min), max);

            // If we are closer to the "snapped" step, use it. But if rawValue was actually dragging to the very end...
            // The constraint is simple: Snapped points are: min, min+step, min+2step... AND MAX.
            // So valid points = { min + k*step } U { max }.
            // We find the closest valid point to `rawValue`.

            const standardSnap = Math.round((rawValue - min) / step) * step + min;
            const distStandard = Math.abs(rawValue - standardSnap);
            const distMax = Math.abs(rawValue - max);

            if (distMax < distStandard && distMax < step) {
                onChange(max);
            } else {
                onChange(standardSnap);
            }
        } else {
            onChange(rawValue);
        }
    };

    const safeValue = value !== undefined && value !== null ? value : min;
    const percentage = ((safeValue - min) / (max - min)) * 100;
    // Fallback to Indigo if no color provided or found
    const defaultColor = ACCENT_COLORS[0].value;
    const activeColor = accentColorHex || ACCENT_COLORS.find(c => c.class === accentColor)?.value || defaultColor;

    return (
        <div className={`flex flex-col ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Label and Hint Group */}
            {(label || helpText) && (
                <div className="mb-2">
                    <div className="flex justify-between items-center">
                        {label && (
                            <label className="block text-sm font-medium break-words">
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
                    step="any" // We handle snapping manually to allow reaching max even if (max-min)%step != 0
                    value={value || min}
                    onChange={handleSliderChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    disabled={disabled}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--slider-accent)] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--slider-accent)] [&::-moz-range-thumb]:border-none"
                    style={{
                        '--slider-accent': activeColor,
                        background: `linear-gradient(to right, var(--slider-accent) 0%, var(--slider-accent) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
                    }}
                />

                {/* Tooltip */}
                {showTooltip && isDragging && (
                    <div
                        className={`absolute -top-8 transform -translate-x-1/2 text-white text-xs px-2 py-1 rounded shadow-md ${!accentColorHex ? `bg-${accentColor}` : ''}`}
                        style={{
                            left: `${((value - min) / (max - min)) * 100}%`,
                            backgroundColor: accentColorHex
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
