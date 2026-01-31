export interface Step {
    id: number;
    label: string;
    subtitle: string;
}

export interface SidebarItem {
    id: number;
    label: string;
    status: "complete" | "current" | "pending";
}

export interface AutonomyOption {
    id: string;
    label: string;
    description: string;
}

export type StepStatus = "complete" | "current" | "pending";
