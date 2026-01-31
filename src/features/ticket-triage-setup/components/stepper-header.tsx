import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step, StepStatus } from "../types";

interface StepperHeaderProps {
    steps: Step[];
    currentStepIndex: number;
    onSelectStep: (index: number) => void;
    getStepStatus: (index: number) => StepStatus;
}

export const StepperHeader: React.FC<StepperHeaderProps> = ({
    steps,
    onSelectStep,
    getStepStatus,
}) => {
    return (
        <header className="hidden lg:block bg-white border-b border-gray-200 px-6">
            <div className="flex items-center h-16">
                <button className="p-2 hover:bg-gray-100 rounded-lg mr-4 shrink-0">
                    <X className="h-5 w-5 text-gray-500" />
                </button>

                <div className="flex-1 flex min-w-0">
                    {steps.map((step, idx) => {
                        const status = getStepStatus(idx);
                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex-1 flex items-center gap-3 px-4 xl:px-6 py-4 border-r border-gray-100 last:border-r-0 min-w-0 cursor-pointer transition-colors",
                                    status === "current" && "bg-gray-50/50",
                                    status === "pending" && "opacity-60",
                                    status !== "current" &&
                                        "hover:bg-gray-50/30",
                                )}
                                onClick={() => onSelectStep(idx)}>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                    <div
                                        className={cn(
                                            "text-xs font-semibold tracking-wider mb-0.5",
                                            status === "complete"
                                                ? "text-emerald-600"
                                                : status === "current"
                                                  ? "text-emerald-600"
                                                  : "text-gray-400",
                                        )}>
                                        {status === "complete"
                                            ? "COMPLETE"
                                            : status === "current"
                                              ? "CURRENT"
                                              : "PENDING"}
                                    </div>
                                    <div className="text-sm font-medium text-gray-900 truncate">
                                        {step.id}. {step.label}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                                        {step.subtitle}
                                    </div>
                                </div>

                                {status === "complete" && (
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Check className="h-4 w-4 text-emerald-600" />
                                    </div>
                                )}

                                {status === "current" && (
                                    <div className="hidden xl:flex gap-1 shrink-0">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "w-1.5 h-1.5 rounded-sm",
                                                    i <= 2
                                                        ? "bg-gray-800"
                                                        : "bg-gray-200",
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </header>
    );
};
