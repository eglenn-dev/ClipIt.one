"use client";
import { Link2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LandingHeader() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl cursor-pointer select-none"
                >
                    <Link2 className="h-6 w-6" />
                    <span>ClipIt.one</span>
                </Link>
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href="/#features"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Features
                        </Link>
                        <Link
                            href="/#faq"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            About
                        </Link>
                    </nav>
                    <Link href="/signup">
                        <Button variant="outline" className="cursor-pointer">
                            Sign Up
                        </Button>
                    </Link>
                    <Link href="/home">
                        <Button className="cursor-pointer">Dashboard</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
