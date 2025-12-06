import React from 'react';
import AppTextArea from '../ui/AppTextArea';

export default function TextArea({ field, value, onChange, onBlur, error, accentColor, disabled, hideLabel }) {
    const { config, validation } = field;

    const handleClear = () => {
        onChange(field.id, '');
    };

    return (
        <AppTextArea
            label={hideLabel ? null : config.label}
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            onBlur={() => onBlur(field.id)}
            placeholder={config.placeholder}
            error={error}
            required={validation.required}
            disabled={disabled}
            onClear={handleClear}
            helpText={hideLabel ? null : config.helpText}
            accentColor={accentColor}
            className="mb-8"
            id={field.id}
            rows={3}
            autoResize={true}
            minLength={validation.minLength}
            maxLength={validation.maxLength}
        />
    );
}
