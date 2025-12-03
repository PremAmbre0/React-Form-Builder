import React, { useState } from 'react';
import useFormStore from '../../store/useFormStore';
import { FIELD_DEFINITIONS, FIELD_CATEGORIES } from '../../constants/fieldSchemas';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

export default function FieldPicker() {
    const { addField } = useFormStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategories, setExpandedCategories] = useState(
        Object.keys(FIELD_CATEGORIES).reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
    );

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const filteredCategories = Object.entries(FIELD_CATEGORIES).reduce((acc, [category, types]) => {
        const filteredTypes = types.filter(type => {
            const def = FIELD_DEFINITIONS[type];
            return def.label.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (filteredTypes.length > 0) {
            acc[category] = filteredTypes;
        }
        return acc;
    }, {});

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border shrink-0 space-y-3">
                <div>
                    <h2 className="font-semibold text-lg">Add Element</h2>
                    <p className="text-sm text-muted-foreground">Select a field to add to your form</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search fields..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                {Object.keys(filteredCategories).length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-8">No fields found matching "{searchTerm}"</p>
                ) : (
                    Object.entries(filteredCategories).map(([category, fieldTypes]) => (
                        <div key={category} className="space-y-2">
                            <button
                                onClick={() => toggleCategory(category)}
                                className="flex items-center gap-2 w-full text-left font-medium text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {expandedCategories[category] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                {category}
                            </button>

                            {expandedCategories[category] && (
                                <div className="grid gap-2">
                                    {fieldTypes.map(type => {
                                        const def = FIELD_DEFINITIONS[type];
                                        const Icon = def.icon;
                                        return (
                                            <button
                                                key={type}
                                                onClick={() => addField(type)}
                                                className="w-full flex items-center gap-3 p-2.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all text-left group shadow-sm hover:shadow-md"
                                            >
                                                <div className="p-1.5 rounded-md bg-muted group-hover:bg-background transition-colors text-muted-foreground group-hover:text-primary">
                                                    <Icon size={16} />
                                                </div>
                                                <span className="font-medium text-sm">{def.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
