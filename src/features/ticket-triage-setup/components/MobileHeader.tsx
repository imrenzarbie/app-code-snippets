import React from "react";
import { Menu, Bot } from "lucide-react";
import type { Step } from "../types";

interface MobileHeaderProps {
    currentStepIndex: number;
    steps: Step[];
    onMenuClick: () => void;
    onPreviewClick: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
    currentStepIndex,
    steps,
    onMenuClick,
    onPreviewClick,
}) => {
    return (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between sticky top-0 z-30">
            <button
                onClick={onMenuClick}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
                <Menu className="h-5 w-5 text-gray-700" />
            </button>

            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                        {currentStepIndex + 1}
                    </span>
                </div>
                <span className="font-semibold text-gray-900 text-sm">
                    {steps[currentStepIndex].label}
                </span>
            </div>

            <button
                onClick={onPreviewClick}
                className="p-2 -mr-2 hover:bg-gray-100 rounded-lg">
                <Bot className="h-5 w-5 text-gray-700" />
            </button>
        </div>
    );
};
