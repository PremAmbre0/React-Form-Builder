import React from 'react';
import { X } from 'lucide-react';

const AppTextInput = ({
    label,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    type = 'text',
    className = '',
    onClear,
    icon: Icon,
    helpText,
    accentColor = 'primary',
    ...props
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

            {/* Input and Error Group */}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        <Icon size={16} />
                    </div>
                )}

                {value && onClear && !disabled && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors z-10"
                        tabIndex={-1}
                    >
                        <X size={14} />
                    </button>
                )}

                <input
                    type={type}
                    value={value || ''}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full px-3 py-2 ${Icon ? 'pl-9' : ''} ${value && onClear ? 'pr-8' : ''} border rounded-md bg-background text-sm focus:outline-none transition-colors ${error
                        ? 'border-destructive focus:border-destructive placeholder:text-destructive/60'
                        : `border-input focus:border-${accentColor} placeholder:text-${accentColor}/60`
                        }`}
                    {...props}
                />
                {error && <span className="absolute top-full left-0 text-xs text-destructive">{error}</span>}
            </div>
        </div>
    );
};

export default AppTextInput;
