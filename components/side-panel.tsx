"use client";
import Link from "next/link";
import {
    BarChart3,
    Plus,
    LogOutIcon,
    Settings2Icon,
    QrCodeIcon,
} from "lucide-react";
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
            <nav className="grid gap-2 p-4 fixed top-16 w-fit">
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
                <Link
                    href="/home/create-qr"
                    className={
                        pathname === "/home/create-qr"
                            ? activeLinkStyles
                            : inactiveLinkStyles
                    }
                >
                    <QrCodeIcon className="h-4 w-4" />
                    Create QR Code
                </Link>
            </nav>
            <div className="p-4 fixed bottom-0 w-fit grid gap-2">
                <Link href="/home/api-keys">
                    <Button type="submit" variant="ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={34}
                            height={34}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M5.5 13L7 11.5l5.5 5.5l-1.5 1.5c-.75.75-3.5 2-5.5 0s-.75-4.75 0-5.5M3 21l2.5-2.5m13-7.5L17 12.5L11.5 7L13 5.5c.75-.75 3.5-2 5.5 0s.75 4.75 0 5.5m-6-3l-2 2M21 3l-2.5 2.5m-2.5 6l-2 2"
                            ></path>
                        </svg>
                        API
                    </Button>
                </Link>
                <Link href="/home/settings">
                    <Button type="submit" variant="ghost">
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
