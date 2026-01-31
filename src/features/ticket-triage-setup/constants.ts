import type { Step, SidebarItem, AutonomyOption } from "./types";

export const STEPS: Step[] = [
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

export const SIDEBAR_ITEMS: SidebarItem[] = [
    { id: 1, label: "GENERAL SETTINGS", status: "complete" },
    { id: 2, label: "RESPONSE TEMPLATES", status: "complete" },
    { id: 3, label: "TICKET TRIAGE", status: "current" },
    { id: 4, label: "ESCALATION RULES", status: "pending" },
    { id: 5, label: "FOLLOW-UP SCHEDULING", status: "pending" },
    { id: 6, label: "QUALITY CHECKS", status: "pending" },
];

export const AUTONOMY_OPTIONS: AutonomyOption[] = [
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
