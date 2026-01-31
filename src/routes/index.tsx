import NavbarLayout from "@/pages/navbar-layout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarLayout />,
        children: [
            {
                path: "/",
                element: <h1>Home Page</h1>,
            },
        ],
    },
]);
