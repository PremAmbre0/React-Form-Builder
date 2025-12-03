import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFormStore from '../store/useFormStore';
import { ArrowLeft, Eye, Plus } from 'lucide-react';
import FormHeader from '../components/builder/FormHeader';
import FieldList from '../components/builder/FieldList';
import ContextualSidebar from '../components/builder/ContextualSidebar';

export default function BuilderPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { activeForm, loadForm, openSidebar } = useFormStore();

    useEffect(() => {
        if (id) {
            loadForm(id);
        }
    }, [id, loadForm]);

    if (!activeForm) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-muted-foreground">Loading form...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            {/* Contextual Sidebar (Right Drawer) */}
            <ContextualSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => openSidebar('picker')}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <Plus size={20} />
                            Add Field
                        </button>
                        <button
                            onClick={() => navigate(`/preview/${id}`)}
                            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-secondary/80 transition-colors"
                        >
                            <Eye size={20} />
                            Preview
                        </button>
                    </div>
                </div>

                {/* Form Builder Canvas */}
                <div className="flex-1 overflow-y-auto p-8 bg-accent/5">
                    <div className="max-w-3xl mx-auto pb-20">
                        <div className="bg-card border border-border rounded-xl shadow-lg relative overflow-hidden">
                            {/* Accent Color Bar */}
                            <div
                                className="absolute top-0 left-0 w-full h-2 transition-colors duration-300"
                                style={{ backgroundColor: `var(--color-${activeForm.accentColor})` }}
                            />
                            {/* We need to handle dynamic tailwind classes for colors or use inline styles. 
                                PreviewPage uses `bg-${activeForm.accentColor}` which might rely on safelist or JIT if the class exists.
                                Let's use inline style for the bar to be safe, or map classes.
                                Actually, FormHeader has the color picker.
                            */}
                            <div className={`absolute top-0 left-0 w-full h-2 bg-${activeForm.accentColor}`} />

                            <div className="p-8 pt-10">
                                <FormHeader />

                                <hr className={`border-t border-${activeForm.accentColor}/20 my-8`} />

                                <FieldList />

                                <hr className={`border-t border-${activeForm.accentColor}/20 my-8`} />

                                <div className="">
                                    <button
                                        disabled
                                        className={`w-full bg-${activeForm.accentColor} text-white py-3 rounded-md font-semibold opacity-50 cursor-not-allowed`}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
