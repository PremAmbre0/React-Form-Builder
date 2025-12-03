import React from 'react';
import useFormStore from '../../store/useFormStore';
import { Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';

// Field Components
import TextInput from '../fields/TextInput';
import TextArea from '../fields/TextArea';
import NumberInput from '../fields/NumberInput';
import SliderInput from '../fields/SliderInput';
import RatingInput from '../fields/RatingInput';
import DropdownInput from '../fields/DropdownInput';
import CheckboxGroup from '../fields/CheckboxGroup';
import RadioGroup from '../fields/RadioGroup';
import ToggleInput from '../fields/ToggleInput';
import DateInput from '../fields/DateInput';
import TimeInput from '../fields/TimeInput';
import DateTimeInput from '../fields/DateTimeInput';
import ColorPickerInput from '../fields/ColorPickerInput';

const FIELD_COMPONENTS = {
    text: TextInput,
    textarea: TextArea,
    number: NumberInput,
    range: SliderInput,
    rating: RatingInput,
    dropdown: DropdownInput,
    checkboxGroup: CheckboxGroup,
    radioGroup: RadioGroup,
    toggle: ToggleInput,
    date: DateInput,
    time: TimeInput,
    'datetime-local': DateTimeInput,
    color: ColorPickerInput
};

<div className={cn(
    "absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity",
    isSelected || "group-hover:opacity-100"
)}>
    <button
        onClick={(e) => {
            e.stopPropagation();
            removeField(field.id);
        }}
        className="p-1.5 bg-destructive text-destructive-foreground rounded-md shadow-sm hover:bg-destructive/90 transition-colors"
        title="Delete Field"
    >
        <Trash2 size={16} />
    </button>
</div>
                            </div >
                        );
                    })
                )}
            </div >
        </div >
    );
}
