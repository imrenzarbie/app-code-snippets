import React from "react";
import { Sparkles, MessageSquare, ArrowRight, Plus, X } from "lucide-react";

interface PreviewPanelProps {
    isMobile: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
    isMobile,
    isOpen,
    onClose,
}) => {
    const panelContent = (
        <>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 rounded-lg group border border-transparent hover:border-gray-200">
                <Sparkles className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                <span className="text-xs font-medium text-gray-600 tracking-wider">
                    HOW DO I UPGRADE MY PLAN?
                </span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 rounded-lg group border border-transparent hover:border-gray-200">
                <MessageSquare className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                <span className="text-xs font-medium text-gray-600 tracking-wider">
                    SUMMARIZE
                </span>
            </button>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600 mb-4">
                    Try:{" "}
                    <span className="text-gray-400">
                        "I was double-charged this month."
                    </span>
                </p>
                <div className="flex items-center justify-between">
                    <button className="p-1.5 hover:bg-gray-200 rounded-md">
                        <Plus
                            className={`${isMobile ? "h-5 w-5" : "h-4 w-4"} text-gray-400`}
                        />
                    </button>
                    <button className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-md">
                        <ArrowRight
                            className={`${isMobile ? "h-5 w-5" : "h-4 w-4"} text-gray-600`}
                        />
                    </button>
                </div>
            </div>
        </>
    );

    // Desktop version
    if (!isMobile) {
        return (
            <aside className="hidden lg:flex w-80 bg-white border-l border-gray-200 p-6 flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white shadow-sm" />
                        <span className="text-sm font-medium text-gray-900">
                            Support Specialist (Preview)
                        </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 space-y-3">{panelContent}</div>
            </aside>
        );
    }

    // Mobile version
    if (!isOpen) return null;

    return (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                        <span className="text-sm font-medium text-gray-900">
                            Support Specialist (Preview)
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto">
                    {panelContent}
                </div>
            </div>
        </div>
    );
};
