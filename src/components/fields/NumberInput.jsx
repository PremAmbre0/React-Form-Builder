import React from 'react';
import AppTextInput from '../ui/AppTextInput';

export default function NumberInput({ field, value, onChange, onBlur, error, accentColor, disabled, hideLabel }) {
    const { config, validation } = field;

    const handleClear = () => {
        onChange(field.id, '');
    };

    return (
        <AppTextInput
            label={hideLabel ? null : config.label}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            onBlur={() => onBlur(field.id)}
            placeholder={config.placeholder}
            error={error}
            required={validation.required}
            disabled={disabled}
            type="number"
            min={validation.min}
            max={validation.max}
            step={validation.step}
            onClear={handleClear}
            helpText={hideLabel ? null : config.helpText}
            accentColor={accentColor}
            className="mb-8"
            id={field.id}
        />
    );
}
