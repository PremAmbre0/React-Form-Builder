export function validateField(field, value) {
    const { validation = {}, config = {}, type } = field;

    // Required check
    if (validation.required) {
        if (value === null || value === undefined || value === '') {
            return 'This field is required';
        }
        if (Array.isArray(value) && value.length === 0) {
            return 'Please select at least one option';
        }
    }

    if (value) {
        // String length checks
        if (typeof value === 'string') {
            if (validation.minLength && value.length < validation.minLength) {
                return `Minimum length is ${validation.minLength} characters`;
            }
            if (validation.maxLength && value.length > validation.maxLength) {
                return `Maximum length is ${validation.maxLength} characters`;
            }
        }

        // Number checks (for Number, Range, Rating fields)
        if (['number', 'range', 'rating'].includes(type)) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                return 'Please enter a valid number';
            }
            if (validation.min !== undefined && numValue < validation.min) {
                return `Minimum value is ${validation.min}`;
            }
            if (validation.max !== undefined && numValue > validation.max) {
                return `Maximum value is ${validation.max}`;
            }
        }

        // Date/Time checks
        if (['date', 'datetime-local'].includes(type)) {
            if (validation.minDate && value < validation.minDate) {
                return `Date must be after ${validation.minDate}`;
            }
            if (validation.maxDate && value > validation.maxDate) {
                return `Date must be before ${validation.maxDate}`;
            }
        }

        // Email check (Validation Type)
        if (type === 'email' || (type === 'text' && config?.validationType === 'email')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Please enter a valid email address';
            }
        }

        // URL check (Validation Type)
        if (type === 'url' || (type === 'text' && config?.validationType === 'website')) {
            try {
                new URL(value);
            } catch (_) {
                return 'Please enter a valid URL';
            }
        }

        // Numeric String check (Validation Type)
        if (type === 'text' && config?.validationType === 'number') {
            const numRegex = /^[0-9]*$/;
            if (!numRegex.test(value)) {
                return 'Please enter a valid number';
            }
        }
    }

    return null;
}
