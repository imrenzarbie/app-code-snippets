import { Menu } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

interface NavbarProps {
    onMenuClick?: () => void;
    showMenuButton?: boolean;
}
const Navbar = ({ onMenuClick, showMenuButton = false }: NavbarProps) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="flex h-14 items-center px-4">
                {showMenuButton && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2 md:hidden"
                        onClick={onMenuClick}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>
                )}
                <div className="flex items-center gap-2 font-semibold">
                    <span>Logo</span>
                </div>
                <nav className="ml-auto flex items-center gap-4">
                    {" "}
                    <Link
                        to="/lab/kanban-dashboard"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Kanban Dashboard
                    </Link>
                    <Link
                        to="/ticket-triage-setup"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Ticket Triage Setup
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
