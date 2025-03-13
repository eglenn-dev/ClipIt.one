"use client";
import Link from "next/link";
import { BarChart3, Plus, LogOutIcon, Settings2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { logoutAction } from "./action";
import { usePathname } from "next/navigation";

export default function SidePanel() {
    const activeLinkStyles =
        "flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground";
    const inactiveLinkStyles =
        "flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted";
    const pathname = usePathname();

    return (
        <aside className="hidden w-[200px] flex-col border-r bg-muted/40 md:flex justify-between">
            <nav className="grid gap-2 p-4">
                <Link
                    href="/home"
                    className={
                        pathname === "/home"
                            ? activeLinkStyles
                            : inactiveLinkStyles
                    }
                >
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                </Link>
                <Link
                    href="/home/create"
                    className={
                        pathname === "/home/create"
                            ? activeLinkStyles
                            : inactiveLinkStyles
                    }
                >
                    <Plus className="h-4 w-4" />
                    Create Link
                </Link>
            </nav>
            <div className="p-4 fixed bottom-0 w-full grid gap-2">
                <Link href="/home/settings">
                    <Button
                        type="submit"
                        variant="ghost"
                        className="cursor-pointer"
                    >
                        <Settings2Icon />
                        Settings
                    </Button>
                </Link>
                <form action={logoutAction}>
                    <Button
                        type="submit"
                        variant="ghost"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer"
                    >
                        <LogOutIcon className="h-4 w-4" />
                        Logout
                    </Button>
                </form>
            </div>
        </aside>
    );
}
