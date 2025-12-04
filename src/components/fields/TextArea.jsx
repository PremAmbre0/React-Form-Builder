import React from 'react';
import AppTextArea from '../ui/AppTextArea';

export default function TextArea({ field, value, onChange, onBlur, error, accentColor, isLast, disabled }) {
    const { config, validation } = field;

    const handleClear = () => {
        onChange(field.id, '');
    };

    return (
        <AppTextArea
            label={config.label}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            onBlur={() => onBlur(field.id)}
            placeholder={config.placeholder}
            error={error}
            required={validation.required}
            disabled={disabled}
            onClear={handleClear}
            helpText={config.helpText}
            accentColor={accentColor}
            className="mb-8"
            minLength={validation.minLength}
            maxLength={validation.maxLength}
            id={field.id}
        />
    );
}
