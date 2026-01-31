import NavbarLayout from "@/pages/navbar-layout";
import { createBrowserRouter } from "react-router";
import KanbanDashboardPage from "@/features/lab/pages/kanban-dashboard";
import TicketTriageSetupPage from "@/features/lab/pages/ticket-triage-setup";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarLayout />,
        children: [
            {
                path: "/",
                element: <h1>Home Page</h1>,
            },
            {
                path: "/lab/kanban-dashboard",
                element: <KanbanDashboardPage />,
            },
            {
                path: "/lab/ticket-triage-setup",
                element: <TicketTriageSetupPage />,
            },
        ],
    },
]);
