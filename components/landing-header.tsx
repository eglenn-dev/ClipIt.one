"use client";
import { Link2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LandingHeader() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Link2 className="h-6 w-6" />
                    <span>ClipIt.one</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <Link
                        href="#features"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Features
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#faq"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        FAQ
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="outline">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
