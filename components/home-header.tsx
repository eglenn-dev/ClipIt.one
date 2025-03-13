import { Link2 } from "lucide-react";
import Link from "next/link";

export default function HomeHeader() {
    return (
        <header className="sticky top-0 z-10 border-b bg-background">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link
                    href="/home"
                    className="flex items-center gap-2 font-bold text-xl select-none"
                >
                    <Link2 className="h-6 w-6" />
                    <span>ClipIt</span>
                </Link>
            </div>
        </header>
    );
}
