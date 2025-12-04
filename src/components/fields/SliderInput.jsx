import React from 'react';
import AppSlider from '../ui/AppSlider';

export default function SliderInput({ field, value, onChange, onBlur, error, accentColor, isLast, disabled }) {
    const { config, validation } = field;

    return (
        <AppSlider
            label={config.label}
            value={value}
            onChange={(val) => onChange(field.id, val)}
            min={validation.min}
            max={validation.max}
            step={config.step}
            showTooltip={config.showTooltip}
            error={error}
            required={validation.required}
            disabled={disabled}
            helpText={config.helpText}
            accentColor={accentColor}
            className="mb-8"
        />
    );
}
