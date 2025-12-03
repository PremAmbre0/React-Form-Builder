import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../store/useFormStore';
import { Plus, FileText, Trash2 } from 'lucide-react';

export default function HomePage() {
    const { allForms, createNewForm, deleteForm } = useFormStore();
    const navigate = useNavigate();

    const handleCreateNew = () => {
        const newFormId = createNewForm();
        navigate(`/builder/${newFormId}`);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">My Forms</h2>
                    <p className="text-muted-foreground mt-1">Manage and create your forms.</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} />
                    Create New Form
                </button>
            </div>

            {allForms.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-border rounded-lg bg-card/50">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">No forms yet</h3>
                    <p className="text-muted-foreground">Create your first form to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allForms.map((form) => (
                        <div
                            key={form.id}
                            className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
                            onClick={() => navigate(`/builder/${form.id}`)}
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full bg-${form.accentColor}`} />
                            <h3 className="text-xl font-semibold mb-2 pr-8">{form.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                {form.description || 'No description'}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                                <span>{new Date(form.createdAt).toLocaleDateString()}</span>
                                <span className="bg-secondary px-2 py-1 rounded-full">
                                    {form.fields.length} fields
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteForm(form.id);
                                }}
                                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
