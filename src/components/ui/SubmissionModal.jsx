import React from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function SubmissionModal({ isOpen, onClose, data }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">Submission Successful!</h2>
                    <p className="text-muted-foreground mt-2">
                        Here is the data that was submitted:
                    </p>
                </div>

                <div className="bg-muted/50 rounded-md p-4 overflow-auto max-h-60">
                    <pre className="text-xs font-mono whitespace-pre-wrap">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>

                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
