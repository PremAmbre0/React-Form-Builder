import React from 'react';
import useFormStore from '../../store/useFormStore';
import { Trash2, Pencil, Plus, GripVertical } from 'lucide-react';
import { cn } from '../../utils/cn';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
    time: TimeInput
};

export default function FieldList() {
    const { activeForm, removeField, selectField, selectedFieldId, openSidebar, setInsertionIndex, reorderFields } = useFormStore();
    const [isDragging, setIsDragging] = React.useState(false);

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = (result) => {
        setIsDragging(false);
        if (!result.destination) return;
        reorderFields(result.source.index, result.destination.index);
    };

    if (!activeForm) return null;

    return (
        <div className="flex flex-col h-full">
            <div className="">
                {activeForm.fields.length === 0 ? (
                    <button
                        onClick={() => {
                            setInsertionIndex(0);
                            openSidebar('picker');
                        }}
                        className="w-full h-32 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg bg-accent/5 hover:bg-accent/10 hover:border-primary/50 hover:text-primary transition-all"
                    >
                        <p>Click here to start adding fields to your form</p>
                    </button>
                ) : (
                    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                        <Droppable droppableId="fields">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4 pb-8"
                                >
                                    {activeForm.fields.map((field, index) => {
                                        const isSelected = selectedFieldId === field.id;
                                        const Component = FIELD_COMPONENTS[field.type];

                                        if (!Component) return null;

                                        return (
                                            <Draggable key={field.id} draggableId={field.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={cn(
                                                            "relative group/field outline-none",
                                                            snapshot.isDragging && "z-50"
                                                        )}
                                                        style={provided.draggableProps.style}
                                                    >
                                                        {/* Top Add Button */}
                                                        <div className={cn(
                                                            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity",
                                                            isDragging
                                                                ? "opacity-0"
                                                                : (isSelected
                                                                    ? "opacity-100 lg:opacity-0 lg:group-hover/field:opacity-100"
                                                                    : "opacity-0 group-hover/field:opacity-100")
                                                        )}>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setInsertionIndex(index);
                                                                    openSidebar('picker');
                                                                }}
                                                                className="relative bg-background border border-primary text-muted-foreground rounded-full p-1 shadow-sm hover:scale-110 transition-all"
                                                                title="Insert Field Above"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                selectField(field.id);
                                                                // On desktop, open settings immediately. On mobile, just select.
                                                                if (window.matchMedia('(min-width: 1024px)').matches) {
                                                                    openSidebar('settings');
                                                                }
                                                            }}
                                                            className={cn(
                                                                "relative transition-all rounded-lg p-3 md:p-4 border bg-card flex gap-3 items-start",
                                                                isSelected
                                                                    ? "border-primary shadow-sm"
                                                                    : cn("border-transparent", !isDragging && "group-hover/field:border-primary"),
                                                                snapshot.isDragging && "shadow-xl border-primary/50 scale-95 opacity-90"
                                                            )}
                                                        >
                                                            {/* Drag Handle */}
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className="mt-1 text-muted-foreground/50 hover:text-foreground cursor-grab active:cursor-grabbing transition-colors"
                                                            >
                                                                <GripVertical size={20} />
                                                            </div>

                                                            {/* Field Preview */}
                                                            <div className="flex-1 min-w-0 pointer-events-none">
                                                                <Component
                                                                    field={field}
                                                                    value=""
                                                                    onChange={() => { }}
                                                                    onBlur={() => { }}
                                                                    error={null}
                                                                    accentColor={activeForm.accentColor}
                                                                />
                                                            </div>

                                                            {/* Actions */}
                                                            <div className={cn(
                                                                "flex gap-2 transition-opacity shrink-0",
                                                                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                                            )}>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        selectField(field.id);
                                                                        openSidebar('settings');
                                                                    }}
                                                                    className="p-1.5 text-muted-foreground hover:text-primary transition-colors group/btn"
                                                                    title="Edit Field"
                                                                >
                                                                    <Pencil size={18} className="transition-all group-hover/btn:stroke-[2.5px]" />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeField(field.id);
                                                                    }}
                                                                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors group/btn"
                                                                    title="Delete Field"
                                                                >
                                                                    <Trash2 size={18} className="transition-all group-hover/btn:stroke-[2.5px]" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Bottom Add Button */}
                                                        <div className={cn(
                                                            "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 transition-opacity",
                                                            isDragging
                                                                ? "opacity-0"
                                                                : (isSelected
                                                                    ? "opacity-100 lg:opacity-0 lg:group-hover/field:opacity-100"
                                                                    : "opacity-0 group-hover/field:opacity-100")
                                                        )}>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setInsertionIndex(index + 1);
                                                                    openSidebar('picker');
                                                                }}
                                                                className="relative bg-background border border-primary text-muted-foreground rounded-full p-1 shadow-sm hover:scale-110 transition-all"
                                                                title="Insert Field Below"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </div>
        </div>
    );
}
