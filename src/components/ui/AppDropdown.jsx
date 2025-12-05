import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import AppMenu from './AppMenu';

const AppDropdown = ({ value, options, onChange, trigger }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);



    const selectedOption = options.find(o => o.value === value) || options[0];



    return (
        <div className="relative">
            <div ref={containerRef} onClick={() => setIsOpen(!isOpen)}>
                {trigger || (
                    <button
                        type="button"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm flex items-center justify-between focus:outline-none focus:border-primary transition-colors hover:bg-accent/50"
                    >
                        <span className="truncate">{selectedOption?.label || 'Select...'}</span>
                        <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </div>

            <AppMenu
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                triggerRef={containerRef}
                className="min-w-[100px] bg-popover border border-border rounded-md shadow-lg overflow-y-auto animate-in fade-in zoom-in-95 duration-100"
            >
                <div className="max-h-60">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between transition-colors hover:bg-primary hover:text-primary-foreground ${value === option.value ? 'bg-primary/10 text-primary font-medium' : ''}`}
                        >
                            <span>{option.label}</span>
                            {value === option.value && <Check size={14} />}
                        </div>
                    ))}
                </div>
            </AppMenu>
        </div>
    );
};

export default AppDropdown;
