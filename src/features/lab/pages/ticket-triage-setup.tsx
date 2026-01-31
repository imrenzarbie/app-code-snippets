import React, { useState, useEffect } from "react";
import {
    Check,
    ChevronLeft,
    ChevronRight,
    X,
    Plus,
    Sparkles,
    MessageSquare,
    ArrowRight,
    Menu,
    Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

const TicketTriageSetup = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Step management
    const [currentStepIndex, setCurrentStepIndex] = useState(3); // Start at step 4 (index 3)

    const [ruleName, setRuleName] = useState("Billing Inquiries - Tier 1");
    const [routeVia, setRouteVia] = useState("Zendesk");
    const [confidence, setConfidence] = useState("High (85%+)");
    const [autonomyLevel, setAutonomyLevel] = useState("complex");
    const [keywords, setKeywords] = useState([
        "invoice",
        "payment",
        "billing",
        "charge",
        "refund",
    ]);
    const [newKeyword, setNewKeyword] = useState("");
    const [frequency, setFrequency] = useState("Continuous");
    const [hours, setHours] = useState("24/7");
    const [days, setDays] = useState("Mon-Sun");

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
                setPreviewOpen(true);
            } else {
                setPreviewOpen(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const steps = [
        {
            id: 1,
            label: "AGENT CONFIGURATION",
            subtitle: "Support Specialist",
        },
        {
            id: 2,
            label: "KNOWLEDGE SOURCES",
            subtitle: "Help Center, API Docs",
        },
        {
            id: 3,
            label: "INTEGRATION SETTINGS",
            subtitle: "Zendesk Connected",
        },
        {
            id: 4,
            label: "AUTOMATION RULES",
            subtitle: "Ticket Triage",
        },
    ];

    // Calculate step status based on currentStepIndex
    const getStepStatus = (index: number) => {
        if (index < currentStepIndex) return "complete";
        if (index === currentStepIndex) return "current";
        return "pending";
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    // Calculate progress percentage
    const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);

    const sidebarItems = [
        { id: 1, label: "GENERAL SETTINGS", status: "complete" },
        { id: 2, label: "RESPONSE TEMPLATES", status: "complete" },
        { id: 3, label: "TICKET TRIAGE", status: "current" },
        { id: 4, label: "ESCALATION RULES", status: "pending" },
        { id: 5, label: "FOLLOW-UP SCHEDULING", status: "pending" },
        { id: 6, label: "QUALITY CHECKS", status: "pending" },
    ];

    const addKeyword = () => {
        if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
            setKeywords([...keywords, newKeyword.trim()]);
            setNewKeyword("");
        }
    };

    const removeKeyword = (kw: string) => {
        setKeywords(keywords.filter((k) => k !== kw));
    };

    const autonomyOptions = [
        {
            id: "review",
            label: "Review each decision",
            description: "Agent suggests, you approve before routing.",
        },
        {
            id: "auto",
            label: "Auto-route if confident",
            description:
                "Agent routes when above threshold, flags uncertain cases.",
        },
        {
            id: "complex",
            label: "Complex Tasks",
            description:
                "Agent routes when above threshold, flags uncertain cases.",
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-[#fafafa] flex flex-col">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
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
                        onClick={() => setPreviewOpen(true)}
                        className="p-2 -mr-2 hover:bg-gray-100 rounded-lg">
                        <Bot className="h-5 w-5 text-gray-700" />
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 flex">
                        <div className="w-64 bg-white h-full shadow-xl flex flex-col">
                            <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
                                <span className="font-semibold text-gray-900">
                                    Setup Steps
                                </span>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSidebarOpen(false)}
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
                        <div
                            className="flex-1 bg-black/50"
                            onClick={() => setSidebarOpen(false)}
                        />
                    </div>
                )}

                {/* Desktop Top Stepper */}
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
                                            status === "current" &&
                                                "bg-gray-50/50",
                                            status === "pending" &&
                                                "opacity-60",
                                            status !== "current" &&
                                                "hover:bg-gray-50/30",
                                        )}
                                        onClick={() =>
                                            setCurrentStepIndex(idx)
                                        }>
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

                {/* Mobile Stepper - Horizontal scroll */}
                <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto">
                    <div className="flex px-4 py-3 gap-6 min-w-max">
                        {steps.map((step, idx) => {
                            const status = getStepStatus(idx);
                            return (
                                <div
                                    key={step.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setCurrentStepIndex(idx)}>
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

                {/* Main Content Area */}
                <div className="flex-1 flex overflow-hidden relative">
                    {/* Left Sidebar - Desktop only */}
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

                    {/* Center Form */}
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-32 lg:pb-8">
                        <div className="max-w-2xl mx-auto lg:mx-0">
                            <div className="mb-6 lg:mb-8">
                                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                                    Setup {steps[currentStepIndex].label}
                                </h1>
                                <p className="text-sm lg:text-base text-gray-500">
                                    {currentStepIndex === 3
                                        ? "Specify how agent should categorizes and route incoming support tickets."
                                        : `Configure your ${steps[currentStepIndex].label.toLowerCase()} settings.`}
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
                                        onChange={(e) =>
                                            setRuleName(e.target.value)
                                        }
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
                                                onValueChange={setRouteVia}>
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
                                                onValueChange={setConfidence}>
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
                                        onValueChange={setAutonomyLevel}
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
                                                    onClick={() =>
                                                        removeKeyword(kw)
                                                    }
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
                                                    setNewKeyword(
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    addKeyword()
                                                }
                                                placeholder="Add keyword..."
                                                className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 flex-1 min-h-[36px]"
                                            />
                                            <button
                                                onClick={addKeyword}
                                                className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                                                <Plus className="h-4 w-4 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Agent uses semantic understanding beyond
                                        exact matches. Keywords help focus the
                                        classification model on relevant ticket
                                        content.
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
                                                onValueChange={setFrequency}>
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
                                                onValueChange={setHours}>
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
                                                onValueChange={setDays}>
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

                    {/* Right Preview Panel - Desktop */}
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

                        <div className="flex-1 space-y-3">
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
                                        <Plus className="h-4 w-4 text-gray-400" />
                                    </button>
                                    <button className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-md">
                                        <ArrowRight className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Preview Panel - Bottom Sheet */}
                    {previewOpen && isMobile && (
                        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
                            <div
                                className="absolute inset-0 bg-black/50"
                                onClick={() => setPreviewOpen(false)}
                            />
                            <div className="relative bg-white rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300" />
                                        <span className="text-sm font-medium text-gray-900">
                                            Support Specialist (Preview)
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setPreviewOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="p-4 space-y-3 overflow-y-auto">
                                    <button className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200">
                                        <Sparkles className="h-4 w-4 text-gray-500" />
                                        <span className="text-xs font-medium text-gray-600 tracking-wider">
                                            HOW DO I UPGRADE MY PLAN?
                                        </span>
                                    </button>

                                    <button className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200">
                                        <MessageSquare className="h-4 w-4 text-gray-500" />
                                        <span className="text-xs font-medium text-gray-600 tracking-wider">
                                            SUMMARIZE
                                        </span>
                                    </button>

                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="text-sm text-gray-600 mb-4">
                                            Try:{" "}
                                            <span className="text-gray-400">
                                                "I was double-charged this
                                                month."
                                            </span>
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <button className="p-2 hover:bg-gray-200 rounded-md">
                                                <Plus className="h-5 w-5 text-gray-400" />
                                            </button>
                                            <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                                                <ArrowRight className="h-5 w-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Navigation - Sticky on mobile */}
                <footer className="bg-white border-t border-gray-200 px-4 lg:px-6 py-4 sticky bottom-0 z-20">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <button
                            onClick={handlePrevious}
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
                                    Step {currentStepIndex + 1} of{" "}
                                    {steps.length}
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
                            onClick={handleNext}
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
            </div>
        </>
    );
};

export default TicketTriageSetup;
