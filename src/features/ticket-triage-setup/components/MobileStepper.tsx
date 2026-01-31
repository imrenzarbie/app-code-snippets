import React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step, StepStatus } from "../types";

interface MobileStepperProps {
    steps: Step[];
    currentStepIndex: number;
    onSelectStep: (index: number) => void;
    getStepStatus: (index: number) => StepStatus;
}

export const MobileStepper: React.FC<MobileStepperProps> = ({
    steps,
    onSelectStep,
    getStepStatus,
}) => {
    return (
        <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto">
            <div className="flex px-4 py-3 gap-6 min-w-max">
                {steps.map((step, idx) => {
                    const status = getStepStatus(idx);
                    return (
                        <div
                            key={step.id}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => onSelectStep(idx)}>
                            <div
                                className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0",
                                    status === "complete"
                                        ? "bg-emerald-100 text-emerald-600"
                                        : status === "current"
                                          ? "bg-gray-900 text-white"
                                          : "bg-gray-100 text-gray-400",
                                )}>
                                {status === "complete" ? (
                                    <Check className="h-3.5 w-3.5" />
                                ) : (
                                    step.id
                                )}
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-900">
                                    Step {step.id}
                                </div>
                                <div className="text-[10px] text-gray-500 uppercase">
                                    {status}
                                </div>
                            </div>
                            {idx < steps.length - 1 && (
                                <ChevronRight className="h-4 w-4 text-gray-300 ml-2" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
