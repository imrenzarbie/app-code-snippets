import React from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step } from "../types";

interface BottomNavigationProps {
    steps: Step[];
    currentStepIndex: number;
    progress: number;
    onNext: () => void;
    onPrevious: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
    steps,
    currentStepIndex,
    progress,
    onNext,
    onPrevious,
}) => {
    return (
        <footer className="bg-white border-t border-gray-200 px-4 lg:px-6 py-4 sticky bottom-0 z-20">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <button
                    onClick={onPrevious}
                    disabled={currentStepIndex === 0}
                    className={cn(
                        "flex items-center gap-2 text-sm p-2 -ml-2 lg:ml-0 transition-colors",
                        currentStepIndex === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:text-gray-900",
                    )}>
                    <ChevronLeft className="h-4 w-4 lg:hidden" />
                    <div className="text-left">
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5 hidden lg:block">
                            Previous
                        </div>
                        <div className="font-medium lg:font-normal">
                            {currentStepIndex > 0
                                ? steps[currentStepIndex - 1].label
                                : "Start"}
                        </div>
                    </div>
                </button>

                <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden sm:block">
                    <div className="flex justify-between text-xs mb-2">
                        <span className="font-medium text-gray-900">
                            {progress}% COMPLETED
                        </span>
                        <span className="text-gray-400">
                            Step {currentStepIndex + 1} of {steps.length}
                        </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gray-900 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <button
                    onClick={onNext}
                    disabled={currentStepIndex === steps.length - 1}
                    className={cn(
                        "flex items-center gap-2 lg:gap-4 text-sm p-2 -mr-2 lg:mr-0 transition-colors",
                        currentStepIndex === steps.length - 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-900 hover:text-gray-700",
                    )}>
                    <div className="text-right">
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5 hidden lg:block">
                            Next
                        </div>
                        <div className="font-medium lg:font-normal">
                            {currentStepIndex < steps.length - 1
                                ? steps[currentStepIndex + 1].label
                                : "Finish"}
                        </div>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </footer>
    );
};
