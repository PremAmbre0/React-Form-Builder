import React from 'react';
import AppRadioGroup from '../ui/AppRadioGroup';

export default function RadioGroup({ field, value, onChange, onBlur, error, accentColor, isLast, disabled }) {
    const { config, validation } = field;

    return (
        <AppRadioGroup
            label={config.label}
            options={config.options}
            value={value}
            onChange={(val) => onChange(field.id, val)}
            allowOther={config.allowOther}
            error={error}
            required={validation.required}
            disabled={disabled}
            helpText={config.helpText}
            accentColor={accentColor}
            className="mb-8"
        />
    );
}
