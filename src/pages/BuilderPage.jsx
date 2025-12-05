import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFormStore from '../store/useFormStore';
import { ChevronLeft, Eye, Plus } from 'lucide-react';
import FormHeader from '../components/builder/FormHeader';
import FieldList from '../components/builder/FieldList';
import ContextualSidebar from '../components/builder/ContextualSidebar';

export default function BuilderPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { activeForm, loadForm } = useFormStore();

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
        <div className="flex h-full relative">
            {/* Contextual Sidebar (Right Drawer) */}
            <ContextualSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                {/* Form Builder Canvas */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-accent/5">
                    <div className="max-w-3xl mx-auto pb-8">
                        <div className="bg-card border border-border rounded-xl shadow-lg relative overflow-hidden">
                            {/* Accent Color Bar */}
                            <div className={`absolute top-0 left-0 w-full h-2 bg-${activeForm.accentColor}`} />

                            <div className="p-4 pt-6 md:p-8 md:pt-10">
                                {/* Navigation & Actions */}
                                <div className="flex items-center justify-between mb-8">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <ChevronLeft size={24} />
                                        <span className="hidden md:inline">Back to Home</span>
                                    </button>
                                    <button
                                        onClick={() => navigate(`/preview/${id}`)}
                                        className="bg-secondary/50 hover:bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Eye size={16} />
                                        Preview
                                    </button>
                                </div>

                                <FormHeader />

                                <hr className={`border-t border-${activeForm.accentColor}/20 my-8`} />

                                <FieldList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
