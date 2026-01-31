import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SidebarItem } from "../types";

interface LeftSidebarProps {
    sidebarItems: SidebarItem[];
    progress: number;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
    sidebarItems,
    progress,
}) => {
    return (
        <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
            <nav className="flex-1 py-6 px-4 space-y-1">
                {sidebarItems.map((item) => (
                    <button
                        key={item.id}
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

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{progress}% COMPLETED</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gray-900 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </aside>
    );
};
