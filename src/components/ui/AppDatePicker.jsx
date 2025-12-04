import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, X } from 'lucide-react';
import '../../assets/styles/CustomDatePicker.css';

export default function AppDatePicker({ value, onChange, minDate, maxDate, placeholder = "Select date" }) {
    const [portalContainer, setPortalContainer] = useState(null);

    const handleChange = (date) => {
        if (date) {
            // Format as YYYY-MM-DD for standard HTML date input compatibility
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            onChange(`${year}-${month}-${day}`);
        } else {
            onChange('');
        }
    };

    // Parse YYYY-MM-DD string back to Date object
    const selectedDate = value ? new Date(value) : null;

    return (
        <div className="relative">
            <div
                className="relative date-picker-wrapper"
                style={{ '--accent-color': 'hsl(var(--primary))' }}
                ref={setPortalContainer}
            >
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText={placeholder}
                    minDate={minDate ? new Date(minDate) : null}
                    maxDate={maxDate ? new Date(maxDate) : null}
                    className="w-full px-3 py-2 pl-10 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
                    wrapperClassName="w-full"
                    showPopperArrow={false}
                    popperPlacement="bottom-start"
                    calendarClassName="shadow-lg border border-border"
                    readOnly={false}
                    onFocus={(e) => e.target.readOnly = true}
                    portalContainer={portalContainer}
                />
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                {value && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleChange(null);
                        }}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground z-10"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}
