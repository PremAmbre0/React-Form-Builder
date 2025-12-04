import React from 'react';

const AppToggle = ({
    label,
    value,
    onChange,
    onLabel = 'On',
    offLabel = 'Off',
    toggleStyle = 'offset', // 'offset' or 'inset'
    error,
    required = false,
    disabled = false,
    className = '',
    helpText,
    accentColor = 'primary'
}) => {
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

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    role="switch"
                    aria-checked={value}
                    onClick={() => !disabled && onChange(!value)}
                    disabled={disabled}
                    className={`
                        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
                        ${value ? `bg-${accentColor}` : 'bg-input'}
                    `}
                    style={{
                        backgroundColor: value ? `var(--color-${accentColor})` : undefined
                    }}
                >
                    <span
                        className={`
                            pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform
                            ${value ? 'translate-x-5' : 'translate-x-0'}
                            ${toggleStyle === 'inset' ? 'scale-75' : ''}
                        `}
                    />
                </button>
                <span className="text-sm font-medium">
                    {value ? onLabel : offLabel}
                </span>
            </div>

            {error && <span className="text-xs text-destructive mt-1">{error}</span>}
        </div>
    );
};

export default AppToggle;
