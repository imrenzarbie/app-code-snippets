import React from "react";
import { Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Step, AutonomyOption } from "../types";

interface MainFormProps {
    step: Step;
    ruleName: string;
    onRuleNameChange: (value: string) => void;
    routeVia: string;
    onRouteViaChange: (value: string) => void;
    confidence: string;
    onConfidenceChange: (value: string) => void;
    autonomyLevel: string;
    onAutonomyLevelChange: (value: string) => void;
    autonomyOptions: AutonomyOption[];
    keywords: string[];
    newKeyword: string;
    onNewKeywordChange: (value: string) => void;
    onAddKeyword: () => void;
    onRemoveKeyword: (keyword: string) => void;
    frequency: string;
    onFrequencyChange: (value: string) => void;
    hours: string;
    onHoursChange: (value: string) => void;
    days: string;
    onDaysChange: (value: string) => void;
}

export const MainForm: React.FC<MainFormProps> = ({
    step,
    ruleName,
    onRuleNameChange,
    routeVia,
    onRouteViaChange,
    confidence,
    onConfidenceChange,
    autonomyLevel,
    onAutonomyLevelChange,
    autonomyOptions,
    keywords,
    newKeyword,
    onNewKeywordChange,
    onAddKeyword,
    onRemoveKeyword,
    frequency,
    onFrequencyChange,
    hours,
    onHoursChange,
    days,
    onDaysChange,
}) => {
    return (
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-32 lg:pb-8">
            <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="mb-6 lg:mb-8">
                    <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                        Setup {step.label}
                    </h1>
                    <p className="text-sm lg:text-base text-gray-500">
                        {step.id === 4
                            ? "Specify how agent should categorizes and route incoming support tickets."
                            : `Configure your ${step.label.toLowerCase()} settings.`}
                    </p>
                </div>

                <div className="space-y-4 lg:space-y-6">
                    {/* Rule Name */}
                    <Card className="p-4 lg:p-6">
                        <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-2 block">
                            RULE NAME
                        </Label>
                        <Input
                            value={ruleName}
                            onChange={(e) => onRuleNameChange(e.target.value)}
                        />
                    </Card>

                    {/* Route and Confidence */}
                    <Card className="p-4 lg:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-2 block">
                                    ROUTE TICKETS VIA
                                </Label>
                                <Select
                                    value={routeVia}
                                    onValueChange={onRouteViaChange}>
                                    <SelectTrigger className="w-full min-h-[44px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Zendesk">
                                            Zendesk
                                        </SelectItem>
                                        <SelectItem value="Intercom">
                                            Intercom
                                        </SelectItem>
                                        <SelectItem value="HubSpot">
                                            HubSpot
                                        </SelectItem>
                                        <SelectItem value="Freshdesk">
                                            Freshdesk
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-2 block">
                                    CONFIDENCE THRESHOLD
                                </Label>
                                <Select
                                    value={confidence}
                                    onValueChange={onConfidenceChange}>
                                    <SelectTrigger className="w-full min-h-[44px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High (85%+)">
                                            High (85%+)
                                        </SelectItem>
                                        <SelectItem value="Medium (70%+)">
                                            Medium (70%+)
                                        </SelectItem>
                                        <SelectItem value="Low (50%+)">
                                            Low (50%+)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    {/* Autonomy Level */}
                    <Card className="p-4 lg:p-6">
                        <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-4 block">
                            AGENT AUTONOMY LEVEL
                        </Label>
                        <RadioGroup
                            value={autonomyLevel}
                            onValueChange={onAutonomyLevelChange}
                            className="space-y-3">
                            {autonomyOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className="flex items-start space-x-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <RadioGroupItem
                                        value={option.id}
                                        id={option.id}
                                        className="mt-1"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <Label
                                            htmlFor={option.id}
                                            className="text-sm font-medium text-gray-900 cursor-pointer">
                                            {option.label}
                                        </Label>
                                        <p className="text-sm text-gray-500 leading-relaxed mt-0.5">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </RadioGroup>
                    </Card>

                    {/* Keywords */}
                    <Card className="p-4 lg:p-6">
                        <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-3 block">
                            MATCH KEYWORDS AND INTENTS
                        </Label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {keywords.map((kw) => (
                                <Badge
                                    key={kw}
                                    variant="secondary"
                                    className="px-3 py-1.5 text-sm font-medium min-h-[32px] gap-1.5">
                                    {kw}
                                    <button
                                        onClick={() => onRemoveKeyword(kw)}
                                        className="hover:text-gray-900 ml-0.5 p-0.5 rounded-sm hover:bg-gray-200 transition-colors">
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </Badge>
                            ))}
                            <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                                <input
                                    type="text"
                                    value={newKeyword}
                                    onChange={(e) =>
                                        onNewKeywordChange(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && onAddKeyword()
                                    }
                                    placeholder="Add keyword..."
                                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 flex-1 min-h-[36px]"
                                />
                                <button
                                    onClick={onAddKeyword}
                                    className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                                    <Plus className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Agent uses semantic understanding beyond exact
                            matches. Keywords help focus the classification
                            model on relevant ticket content.
                        </p>
                    </Card>

                    {/* Frequency */}
                    <Card className="p-4 lg:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-2 block">
                                    FREQUENCY
                                </Label>
                                <Select
                                    value={frequency}
                                    onValueChange={onFrequencyChange}>
                                    <SelectTrigger className="w-full min-h-[44px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Continuous">
                                            Continuous
                                        </SelectItem>
                                        <SelectItem value="Hourly">
                                            Hourly
                                        </SelectItem>
                                        <SelectItem value="Daily">
                                            Daily
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-2 block">
                                    HOURS
                                </Label>
                                <Select
                                    value={hours}
                                    onValueChange={onHoursChange}>
                                    <SelectTrigger className="w-full min-h-[44px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="24/7">
                                            24/7
                                        </SelectItem>
                                        <SelectItem value="Business Hours">
                                            Business Hours
                                        </SelectItem>
                                        <SelectItem value="Custom">
                                            Custom
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-xs font-semibold text-gray-500 tracking-wider mb-2 block">
                                    DAYS
                                </Label>
                                <Select
                                    value={days}
                                    onValueChange={onDaysChange}>
                                    <SelectTrigger className="w-full min-h-[44px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mon-Sun">
                                            Mon-Sun
                                        </SelectItem>
                                        <SelectItem value="Mon-Fri">
                                            Mon-Fri
                                        </SelectItem>
                                        <SelectItem value="Weekends">
                                            Weekends
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
};
