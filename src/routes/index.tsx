import { TicketTriageSetupPage } from "@/features/ticket-triage-setup";
import NavbarLayout from "@/pages/navbar-layout";
import { createBrowserRouter } from "react-router";
import KanbanDashboardPagePage from "@/features/lab/pages/kanban-dashboard-page";

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
                path: "/ticket-triage-setup",
                element: <TicketTriageSetupPage />,
            },
            {
                path: "/lab/kanban-dashboard-page",
                element: <KanbanDashboardPagePage />,
            },
        ],
    },
]);
