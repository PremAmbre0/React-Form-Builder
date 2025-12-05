import React, { useState, useEffect } from 'react';

const AppCheckboxGroup = ({
    label,
    options = [],
    value = [],
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

    // Initialize other value if present in value but not in options
    useEffect(() => {
        if (allowOther && value && value.length > 0) {
            const knownValues = options.map(o => o.value);
            const unknownValue = value.find(v => !knownValues.includes(v));
            if (unknownValue) {
                setOtherValue(unknownValue);
                setIsOtherSelected(true);
            }
        }
    }, [value, options, allowOther]);

    const handleCheckboxChange = (optionValue, checked) => {
        let newValue = [...(value || [])];
        if (checked) {
            newValue.push(optionValue);
        } else {
            newValue = newValue.filter(v => v !== optionValue);
        }
        onChange(newValue);
    };

    const handleOtherCheckboxChange = (checked) => {
        setIsOtherSelected(checked);
        let newValue = [...(value || [])];
        if (checked) {
            if (otherValue) newValue.push(otherValue);
        } else {
            if (otherValue) newValue = newValue.filter(v => v !== otherValue);
        }
        onChange(newValue);
    };

    const handleOtherInputChange = (e) => {
        const newOtherValue = e.target.value;
        setOtherValue(newOtherValue);

        if (isOtherSelected) {
            // Remove old other value and add new one
            // This is tricky because we don't know what the OLD other value was in the 'value' array easily without tracking it.
            // But we know 'value' contains 'otherValue' (maybe).

            // Simpler approach: Filter out all known options, then replace the rest with newOtherValue
            const knownValues = options.map(o => o.value);
            let newValue = (value || []).filter(v => knownValues.includes(v));
            if (newOtherValue) {
                newValue.push(newOtherValue);
            }
            onChange(newValue);
        }
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
                    <label key={option.value} className="flex items-start gap-2 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={value?.includes(option.value) || false}
                                onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                                disabled={disabled}
                                className={`peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${!accentColorHex ? `checked:bg-${accentColor} checked:border-${accentColor}` : ''}`}
                                style={{
                                    backgroundColor: value?.includes(option.value) ? (accentColorHex || `var(--color-${accentColor})`) : undefined,
                                    borderColor: value?.includes(option.value) ? (accentColorHex || `var(--color-${accentColor})`) : undefined
                                }}
                            />
                            <svg
                                className="absolute left-0 top-0 h-4 w-4 hidden peer-checked:block text-white pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <span className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0.5">
                            {option.label}
                        </span>
                    </label>
                ))}

                {allowOther && (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isOtherSelected}
                                    onChange={(e) => handleOtherCheckboxChange(e.target.checked)}
                                    disabled={disabled}
                                    className={`peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${!accentColorHex ? `checked:bg-${accentColor} checked:border-${accentColor}` : ''}`}
                                    style={{
                                        backgroundColor: isOtherSelected ? (accentColorHex || `var(--color-${accentColor})`) : undefined,
                                        borderColor: isOtherSelected ? (accentColorHex || `var(--color-${accentColor})`) : undefined
                                    }}
                                />
                                <svg
                                    className="absolute left-0 top-0 h-4 w-4 hidden peer-checked:block text-white pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="text-sm font-normal leading-none mt-0.5">Other</span>
                        </label>
                        {isOtherSelected && (
                            <input
                                type="text"
                                value={otherValue}
                                onChange={handleOtherInputChange}
                                placeholder="Please specify..."
                                disabled={disabled}
                                className={`w-full px-3 py-1.5 ml-6 text-sm border rounded-md focus:outline-none focus:border-${accentColor} transition-colors`}
                            />
                        )}
                    </div>
                )}
            </div>

            {error && <span className="text-xs text-destructive mt-1">{error}</span>}
        </div>
    );
};

export default AppCheckboxGroup;
