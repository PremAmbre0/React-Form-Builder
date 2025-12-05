import React, { useState, useEffect } from 'react';

const AppRadioGroup = ({
    label,
    options = [],
    value,
    onChange,
    allowOther = false,
    error,
    required = false,
    disabled = false,
    className = '',
    helpText,
    accentColor = 'primary',
    accentColorHex,
    direction = 'vertical'
}) => {
    const [otherValue, setOtherValue] = useState('');
    const [isOtherSelected, setIsOtherSelected] = useState(false);

    // Check if current value is "other"
    useEffect(() => {
        if (value) {
            const isKnownOption = options.some(o => o.value === value);
            if (!isKnownOption && allowOther && value) {
                setIsOtherSelected(true);
                setOtherValue(value);
            } else {
                setIsOtherSelected(false);
            }
        }
    }, [value, options, allowOther]);

    const handleRadioChange = (optionValue) => {
        setIsOtherSelected(false);
        onChange(optionValue);
    };

    const handleOtherRadioChange = () => {
        setIsOtherSelected(true);
        onChange(otherValue);
    };

    const handleOtherInputChange = (e) => {
        const newValue = e.target.value;
        setOtherValue(newValue);
        onChange(newValue);
    };

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
                    </div>
                    {helpText && <div className="text-xs text-muted-foreground">{helpText}</div>}
                </div>
            )}

            <div className={`space-y-2 ${direction === 'horizontal' ? 'flex flex-wrap gap-4 space-y-0' : ''}`}>
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                checked={value === option.value}
                                onChange={() => handleRadioChange(option.value)}
                                disabled={disabled}
                                className={`peer h-4 w-4 appearance-none rounded-full border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!accentColorHex ? `checked:border-${accentColor}` : ''}`}
                                style={{
                                    borderColor: value === option.value ? (accentColorHex || `var(--color-${accentColor})`) : undefined
                                }}
                            />
                            <div
                                className={`absolute h-2 w-2 rounded-full hidden peer-checked:block ${!accentColorHex ? `bg-${accentColor}` : ''}`}
                                style={{
                                    backgroundColor: value === option.value ? (accentColorHex || `var(--color-${accentColor})`) : undefined
                                }}
                            />
                        </div>
                        <span className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {option.label}
                        </span>
                    </label>
                ))}

                {allowOther && (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="radio"
                                    checked={isOtherSelected}
                                    onChange={handleOtherRadioChange}
                                    disabled={disabled}
                                    className={`peer h-4 w-4 appearance-none rounded-full border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!accentColorHex ? `checked:border-${accentColor}` : ''}`}
                                    style={{
                                        borderColor: isOtherSelected ? (accentColorHex || `var(--color-${accentColor})`) : undefined
                                    }}
                                />
                                <div
                                    className={`absolute h-2 w-2 rounded-full hidden peer-checked:block ${!accentColorHex ? `bg-${accentColor}` : ''}`}
                                    style={{
                                        backgroundColor: isOtherSelected ? (accentColorHex || `var(--color-${accentColor})`) : undefined
                                    }}
                                />
                            </div>
                            <span className="text-sm font-normal leading-none">Other</span>
                        </label>
                        {isOtherSelected && (
                            <input
                                type="text"
                                value={otherValue}
                                onChange={handleOtherInputChange}
                                placeholder="Please specify..."
                                disabled={disabled}
                                className={`w-full px-3 py-1.5 ml-6 text-sm border rounded-md focus:outline-none focus:border-${accentColor} placeholder:text-${accentColor}/60 transition-colors`}
                            />
                        )}
                    </div>
                )}
            </div>

            {error && <span className="text-xs text-destructive mt-1">{error}</span>}
        </div>
    );
};

export default AppRadioGroup;
