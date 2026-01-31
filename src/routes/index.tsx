import NavbarLayout from "@/pages/navbar-layout";
import { createBrowserRouter } from "react-router";
import KanbanDashboardPage from "@/features/lab/pages/kanban-dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarLayout />,
        children: [
            {
                path: "/",
                element: <h1>Home Page</h1>,
            },            {
                path: "/lab/kanban-dashboard",
                element: <KanbanDashboardPage />,
            },
        
        ],
    },
]);
