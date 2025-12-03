import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function RatingInput({ field, value, onChange, onBlur, error, accentColor, isLast }) {
    const { config, validation } = field;
    const [hoverValue, setHoverValue] = useState(0);
    const maxRating = validation.scale || 5;
    const currentValue = value || 0;

    return (
        <div className={`space-y-2 relative ${isLast ? 'pb-5' : 'pb-0'}`}>
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">
                    {config.label} {validation.required && <span className="text-destructive">*</span>}
                </label>
                {error && <span className="text-xs text-destructive">{error}</span>}
            </div>
            {config.helpText && <p className="text-xs text-muted-foreground">{config.helpText}</p>}

            <div className="flex items-center gap-1" onMouseLeave={() => setHoverValue(0)}>
                {Array.from({ length: maxRating }).map((_, index) => {
                    const ratingValue = index + 1;
                    const isFilled = (hoverValue || currentValue) >= ratingValue;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onChange(field.id, ratingValue)}
                            onMouseEnter={() => setHoverValue(ratingValue)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                size={24}
                                className={cn(
                                    "transition-colors",
                                    isFilled ? `fill-${accentColor} text-${accentColor}` : "text-muted-foreground/30"
                                )}
                                // Inline style for fill color since tailwind dynamic classes might not work if not safelisted
                                style={isFilled ? { fill: `var(--${accentColor})`, color: `var(--${accentColor})` } : {}}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
