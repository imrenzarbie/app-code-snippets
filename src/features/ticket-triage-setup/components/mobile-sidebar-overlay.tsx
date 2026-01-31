import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SidebarItem } from "../types";

interface MobileSidebarProps {
    sidebarItems: SidebarItem[];
    isOpen: boolean;
    onClose: () => void;
}

export const MobileSidebarOverlay: React.FC<MobileSidebarProps> = ({
    sidebarItems,
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="w-64 bg-white h-full shadow-xl flex flex-col">
                <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
                    <span className="font-semibold text-gray-900">
                        Setup Steps
                    </span>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={onClose}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors",
                                item.status === "current"
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-50",
                            )}>
                            <div
                                className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                                    item.status === "complete"
                                        ? "bg-gray-200 text-gray-600"
                                        : item.status === "current"
                                          ? "bg-gray-900 text-white"
                                          : "bg-gray-100 text-gray-400 border border-gray-200",
                                )}>
                                {item.status === "complete" ? (
                                    <Check className="h-3.5 w-3.5" />
                                ) : (
                                    item.id
                                )}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-medium tracking-wider",
                                    item.status === "current"
                                        ? "text-gray-900"
                                        : "text-gray-600",
                                )}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-1 bg-black/50" onClick={onClose} />
        </div>
    );
};
