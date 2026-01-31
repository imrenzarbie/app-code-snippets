import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

const NavbarLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 items-center justify-center p-0">
                <Outlet />
            </main>
        </div>
    );
};

export default NavbarLayout;
