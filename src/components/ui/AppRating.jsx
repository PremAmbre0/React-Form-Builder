import React, { useState } from 'react';
import { Star } from 'lucide-react';

const AppRating = ({
    label,
    value,
    onChange,
    maxStars = 5,
    starSize = 'medium',
    customStarSize,
    error,
    required = false,
    disabled = false,
    className = '',
    helpText,
    accentColor = 'primary'
}) => {
    const [hoverValue, setHoverValue] = useState(0);

    const getStarSize = () => {
        switch (starSize) {
            case 'small': return 16;
            case 'large': return 32;
            case 'custom': return customStarSize || 24;
            case 'medium':
            default: return 24;
        }
    };

    const size = getStarSize();

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
                    </div>
                    {helpText && <div className="text-xs text-muted-foreground">{helpText}</div>}
                </div>
            )}

            <div className="flex items-center gap-1" onMouseLeave={() => setHoverValue(0)}>
                {[...Array(maxStars)].map((_, index) => {
                    const ratingValue = index + 1;
                    const isFilled = (hoverValue || value) >= ratingValue;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onChange(ratingValue)}
                            onMouseEnter={() => !disabled && setHoverValue(ratingValue)}
                            disabled={disabled}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                size={size}
                                className={`transition-colors ${isFilled ? `fill-${accentColor} text-${accentColor}` : 'text-muted-foreground'}`}
                                style={{
                                    color: isFilled ? `var(--color-${accentColor})` : undefined,
                                    fill: isFilled ? `var(--color-${accentColor})` : 'transparent'
                                }}
                            />
                        </button>
                    );
                })}
            </div>

            {error && <span className="text-xs text-destructive mt-1">{error}</span>}
        </div>
    );
};

export default AppRating;
