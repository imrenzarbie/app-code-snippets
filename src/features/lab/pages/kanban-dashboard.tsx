import React, { useState } from "react";
import {
    LayoutDashboard,
    Zap,
    Battery,
    Cloud,
    PiggyBank,
    History,
    Lightbulb,
    FileText,
    Cpu,
    Map,
    Wrench,
    AlertTriangle,
    Settings,
    ChevronLeft,
    Plus,
    Calendar,
    Clock,
    CheckCircle2,
    Circle,
    Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

// UI Components (simulating shadcn/ui)
const Button = ({
    children,
    variant = "default",
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "secondary";
}) => {
    const variants = {
        default: "bg-emerald-700 text-white hover:bg-emerald-800",
        outline:
            "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
        ghost: "hover:bg-gray-100 text-gray-700",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                variants[variant],
                className,
            )}
            {...props}>
            {children}
        </button>
    );
};

const Card = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={cn(
            "bg-white rounded-xl border border-gray-100 shadow-sm",
            className,
        )}>
        {children}
    </div>
);

const Avatar = ({
    src,
    fallback,
    className,
}: {
    src?: string;
    fallback: string;
    className?: string;
}) => (
    <div
        className={cn(
            "relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 overflow-hidden",
            className,
        )}>
        {src ? (
            <img
                src={src}
                alt={fallback}
                className="h-full w-full object-cover"
            />
        ) : (
            fallback
        )}
    </div>
);

// Types
type TaskStatus = "backlog" | "todo" | "inprogress" | "done";

interface Task {
    id: string;
    title: string;
    date: string;
    assignee?: string;
    status: TaskStatus;
}

interface ServiceRecord {
    id: string;
    panelId: string;
    title: string;
    date: string;
    impact: "High" | "Moderate" | "Low";
}

// Mock Data
const tasks: Task[] = [
    // Backlog
    {
        id: "1",
        title: "Panel A7 cleaning",
        date: "Jan 12",
        assignee: "TS",
        status: "backlog",
    },
    { id: "2", title: "Inverter check", date: "Jan 24", status: "backlog" },
    {
        id: "3",
        title: "Check brackets",
        date: "Jan 25",
        assignee: "AF",
        status: "backlog",
    },
    {
        id: "4",
        title: "Panel B5 maintenance",
        date: "Feb 2",
        assignee: "TS",
        status: "backlog",
    },

    // To do
    {
        id: "5",
        title: "Bird guard installation",
        date: "Jan 13",
        assignee: "TS",
        status: "todo",
    },
    {
        id: "6",
        title: "Wiring inspection",
        date: "Jan 25",
        assignee: "AF",
        status: "todo",
    },
    {
        id: "7",
        title: "Fix Panel B4 wiring",
        date: "Feb 2",
        assignee: "TS",
        status: "todo",
    },

    // In progress
    {
        id: "8",
        title: "Panel A7 cleaning",
        date: "2 weeks",
        assignee: "TS",
        status: "inprogress",
    },
    {
        id: "9",
        title: "Panel A4 cleaning",
        date: "2 weeks",
        assignee: "TS",
        status: "inprogress",
    },

    // Done
    {
        id: "10",
        title: "Panel B1 cleaning",
        date: "Jan 12",
        assignee: "TS",
        status: "done",
    },
    {
        id: "11",
        title: "Panel B2 cleaning",
        date: "Jan 12",
        assignee: "TS",
        status: "done",
    },
    {
        id: "12",
        title: "Panel B3 cleaning",
        date: "Jan 12",
        assignee: "TS",
        status: "done",
    },
    {
        id: "13",
        title: "Panel B4 cleaning",
        date: "Jan 12",
        assignee: "TS",
        status: "done",
    },
];

const serviceHistory: ServiceRecord[] = [
    {
        id: "1",
        panelId: "A7",
        title: "Panel cleaning",
        date: "Mar 15, 2025",
        impact: "High",
    },
    {
        id: "2",
        panelId: "B5",
        title: "Q1 Maintenance check",
        date: "Feb 28, 2024",
        impact: "Moderate",
    },
];

// Components
const SidebarItem = ({
    icon: Icon,
    label,
    active = false,
    badge,
    collapsed = false,
}: {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    badge?: string;
    collapsed?: boolean;
}) => (
    <button
        className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors relative group",
            active
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        )}>
        <Icon
            className={cn(
                "h-5 w-5 shrink-0",
                active ? "text-gray-900" : "text-gray-500",
            )}
        />
        {!collapsed && (
            <>
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {badge}
                    </span>
                )}
            </>
        )}
        {collapsed && active && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                {label}
            </div>
        )}
    </button>
);

const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
    </div>
);

const StatCard = ({
    title,
    value,
    subtitle,
    status,
}: {
    title: string;
    value: string;
    subtitle: string;
    status?: "success";
}) => (
    <Card className="p-5 flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-900">{title}</span>
        <span
            className={cn(
                "text-2xl font-semibold mt-1",
                status === "success" ? "text-emerald-600" : "text-gray-900",
            )}>
            {value}
        </span>
        <span className="text-xs text-gray-500">{subtitle}</span>
    </Card>
);

const TaskCard = ({ task }: { task: Task }) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
        <h4 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2">
            {task.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>{task.date}</span>
            </div>
            {task.assignee ? (
                <div className="flex items-center gap-1.5">
                    <Avatar
                        fallback={task.assignee}
                        className="h-5 w-5 text-[10px]"
                    />
                    <span className="text-gray-600">
                        {task.assignee === "TS" ? "Thomas Smith" : "Anja Frank"}
                    </span>
                </div>
            ) : (
                <span className="text-gray-400 italic">No assignee</span>
            )}
        </div>
    </div>
);

const KanbanColumn = ({
    title,
    count,
    tasks,
    icon: Icon,
    colorClass,
}: {
    title: string;
    count: number;
    status: TaskStatus;
    tasks: Task[];
    icon: React.ElementType;
    colorClass: string;
}) => (
    <div className="flex-1 min-w-[280px] flex flex-col">
        <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
                <Icon className={cn("h-4 w-4", colorClass)} />
                <span className="text-sm font-semibold text-gray-900">
                    {title}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {count}
                </span>
            </div>
            <Button variant="ghost" className="h-6 w-6 p-0">
                <Plus className="h-4 w-4" />
            </Button>
        </div>
        <div className="flex flex-col gap-3">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    </div>
);

const KanbanDashboardPage = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const backlogTasks = tasks.filter((t) => t.status === "backlog");
    const todoTasks = tasks.filter((t) => t.status === "todo");
    const inProgressTasks = tasks.filter((t) => t.status === "inprogress");
    const doneTasks = tasks.filter((t) => t.status === "done");

    return (
        <div className="min-h-screen bg-[#f5f5f0] flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
                    sidebarCollapsed ? "w-16" : "w-64",
                )}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="bg-emerald-700 rounded-lg p-1.5 shrink-0">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        {!sidebarCollapsed && (
                            <span className="font-semibold text-gray-900 text-lg whitespace-nowrap">
                                solarpulse
                            </span>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 shrink-0"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                        <ChevronLeft
                            className={cn(
                                "h-4 w-4 text-gray-500 transition-transform",
                                sidebarCollapsed && "rotate-180",
                            )}
                        />
                    </Button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                    <div>
                        {!sidebarCollapsed && <SectionHeader title="Energy" />}
                        <nav className="space-y-1">
                            <SidebarItem
                                icon={LayoutDashboard}
                                label="Dashboard"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={Zap}
                                label="Production"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={Battery}
                                label="Battery"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={Cloud}
                                label="Weather"
                                collapsed={sidebarCollapsed}
                            />
                        </nav>
                    </div>

                    <div>
                        {!sidebarCollapsed && (
                            <SectionHeader title="Analytics" />
                        )}
                        <nav className="space-y-1">
                            <SidebarItem
                                icon={PiggyBank}
                                label="Savings & ROI"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={History}
                                label="History"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={Lightbulb}
                                label="Insights"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={FileText}
                                label="Reports"
                                collapsed={sidebarCollapsed}
                            />
                        </nav>
                    </div>

                    <div>
                        {!sidebarCollapsed && <SectionHeader title="System" />}
                        <nav className="space-y-1">
                            <SidebarItem
                                icon={Cpu}
                                label="Devices"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={Map}
                                label="Panel Map"
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={Wrench}
                                label="Maintenance"
                                active
                                collapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={AlertTriangle}
                                label="Alerts"
                                badge="2"
                                collapsed={sidebarCollapsed}
                            />
                        </nav>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-3 border-t border-gray-100">
                    <SidebarItem
                        icon={Settings}
                        label="Settings"
                        collapsed={sidebarCollapsed}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Maintenance
                        </h1>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Task
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            title="Warranty status"
                            value="Active"
                            subtitle="Expires in 25 days"
                            status="success"
                        />
                        <StatCard
                            title="Next scheduled check"
                            value="5 days"
                            subtitle="January 17th, 1:00 PM, 2026"
                        />
                        <StatCard
                            title="Days since cleaning"
                            value="23"
                            subtitle="In check with your schedule"
                        />
                        <StatCard
                            title="Open tasks"
                            value="7"
                            subtitle="3 in progress"
                        />
                    </div>

                    {/* Tasks Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Tasks
                        </h2>
                        <div className="flex gap-6 overflow-x-auto pb-4">
                            <KanbanColumn
                                title="Backlog"
                                count={backlogTasks.length}
                                status="backlog"
                                tasks={backlogTasks}
                                icon={Circle}
                                colorClass="text-gray-400"
                            />
                            <KanbanColumn
                                title="To do"
                                count={todoTasks.length}
                                status="todo"
                                tasks={todoTasks}
                                icon={Circle}
                                colorClass="text-gray-600"
                            />
                            <KanbanColumn
                                title="In progress"
                                count={inProgressTasks.length}
                                status="inprogress"
                                tasks={inProgressTasks}
                                icon={Clock}
                                colorClass="text-amber-500"
                            />
                            <KanbanColumn
                                title="Done"
                                count={doneTasks.length}
                                status="done"
                                tasks={doneTasks}
                                icon={CheckCircle2}
                                colorClass="text-emerald-600"
                            />
                        </div>
                    </div>

                    {/* Service History */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Service history
                        </h2>
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                            {/* Search */}
                            <div className="p-4 border-b border-gray-100">
                                <div className="relative max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* History List */}
                            <div className="divide-y divide-gray-100">
                                {serviceHistory.map((record, index) => (
                                    <div
                                        key={record.id}
                                        className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            {/* Timeline connector */}
                                            <div className="relative flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                                                    {record.panelId}
                                                </div>
                                                {index !==
                                                    serviceHistory.length -
                                                        1 && (
                                                    <div className="absolute top-8 w-px h-8 bg-gray-200" />
                                                )}
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    {record.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {record.date}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                                Impact
                                            </span>
                                            <span
                                                className={cn(
                                                    "text-xs font-medium px-2 py-1 rounded-full",
                                                    record.impact === "High"
                                                        ? "text-red-600 bg-red-50"
                                                        : "text-amber-600 bg-amber-50",
                                                )}>
                                                <span className="mr-1">•</span>
                                                {record.impact}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default KanbanDashboardPage;
