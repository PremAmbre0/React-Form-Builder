import React from 'react';
import AppToggle from '../ui/AppToggle';

export default function ToggleInput({ field, value, onChange, onBlur, error, accentColor, isLast, disabled }) {
    const { config, validation } = field;

    return (
        <AppToggle
            label={config.label}
            value={value}
            onChange={(val) => onChange(field.id, val)}
            onLabel={config.onLabel}
            offLabel={config.offLabel}
            toggleStyle={config.toggleStyle}
            error={error}
            required={validation.required}
            disabled={disabled}
            helpText={config.helpText}
            accentColor={accentColor}
            className="mb-8"
        />
    );
}
