import { useState, useEffect } from "react";
import {
    BottomNavigation,
    LeftSidebar,
    MainForm,
    MobileHeader,
    MobileSidebarOverlay,
    MobileStepper,
    PreviewPanel,
    StepperHeader,
} from "../components";
import { STEPS, SIDEBAR_ITEMS, AUTONOMY_OPTIONS } from "../constants";
import type { StepStatus } from "../types";

const TicketTriageSetupPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(3);

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

    const getStepStatus = (index: number): StepStatus => {
        if (index < currentStepIndex) return "complete";
        if (index === currentStepIndex) return "current";
        return "pending";
    };

    const handleNext = () => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const progress = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

    const addKeyword = () => {
        if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
            setKeywords([...keywords, newKeyword.trim()]);
            setNewKeyword("");
        }
    };

    const removeKeyword = (kw: string) => {
        setKeywords(keywords.filter((k) => k !== kw));
    };

    return (
        <>
            <div className="min-h-screen bg-[#fafafa] flex flex-col">
                <MobileHeader
                    currentStepIndex={currentStepIndex}
                    steps={STEPS}
                    onMenuClick={() => setSidebarOpen(true)}
                    onPreviewClick={() => setPreviewOpen(true)}
                />

                <MobileSidebarOverlay
                    sidebarItems={SIDEBAR_ITEMS}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <StepperHeader
                    steps={STEPS}
                    currentStepIndex={currentStepIndex}
                    onSelectStep={setCurrentStepIndex}
                    getStepStatus={getStepStatus}
                />

                <MobileStepper
                    steps={STEPS}
                    currentStepIndex={currentStepIndex}
                    onSelectStep={setCurrentStepIndex}
                    getStepStatus={getStepStatus}
                />

                <div className="flex-1 flex overflow-hidden relative">
                    <LeftSidebar
                        sidebarItems={SIDEBAR_ITEMS}
                        progress={progress}
                    />

                    <MainForm
                        step={STEPS[currentStepIndex]}
                        ruleName={ruleName}
                        onRuleNameChange={setRuleName}
                        routeVia={routeVia}
                        onRouteViaChange={setRouteVia}
                        confidence={confidence}
                        onConfidenceChange={setConfidence}
                        autonomyLevel={autonomyLevel}
                        onAutonomyLevelChange={setAutonomyLevel}
                        autonomyOptions={AUTONOMY_OPTIONS}
                        keywords={keywords}
                        newKeyword={newKeyword}
                        onNewKeywordChange={setNewKeyword}
                        onAddKeyword={addKeyword}
                        onRemoveKeyword={removeKeyword}
                        frequency={frequency}
                        onFrequencyChange={setFrequency}
                        hours={hours}
                        onHoursChange={setHours}
                        days={days}
                        onDaysChange={setDays}
                    />

                    <PreviewPanel
                        isMobile={isMobile}
                        isOpen={previewOpen}
                        onClose={() => setPreviewOpen(false)}
                    />
                </div>

                <BottomNavigation
                    steps={STEPS}
                    currentStepIndex={currentStepIndex}
                    progress={progress}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            </div>
        </>
    );
};

export default TicketTriageSetupPage;
