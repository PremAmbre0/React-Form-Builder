import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const AppTextArea = ({
    label,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    className = '',
    onClear,
    helpText,
    accentColor = 'primary',
    minLength,
    maxLength,
    rows = 3,
    autoResize = true,
    ...props
}) => {
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        if (autoResize) {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        }
        onChange(e);
    };

    useEffect(() => {
        if (autoResize && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value, autoResize]);

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
                {value && onClear && !disabled && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute right-2 top-2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors z-10"
                        tabIndex={-1}
                    >
                        <X size={14} />
                    </button>
                )}

                <textarea
                    ref={textareaRef}
                    value={value || ''}
                    onChange={handleInput}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows}
                    minLength={minLength}
                    maxLength={maxLength}
                    className={`w-full px-3 py-2 ${value && onClear ? 'pr-8' : ''} border rounded-md bg-background text-sm focus:outline-none transition-colors resize-none min-h-[80px] max-h-[200px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${error
                        ? 'border-destructive focus:border-destructive placeholder:text-destructive/60'
                        : `border-input focus:border-${accentColor} placeholder:text-${accentColor}/60`
                        }`}
                    {...props}
                />

                {/* Character Count */}
                {maxLength && (
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none bg-background/80 px-1 rounded">
                        {value?.length || 0}/{maxLength}
                    </div>
                )}

                {error && <span className="absolute top-full left-0 text-xs text-destructive">{error}</span>}
            </div>
        </div>
    );
};

export default AppTextArea;
