import { Link2 } from "lucide-react";
import Link from "next/link";

export default function LandingFooter() {
    return (
        <footer className="border-t px-8">
            <div className="container mx-auto flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
                <div className="flex flex-col gap-2 md:gap-4 lg:flex-1">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Link2 className="h-6 w-6" />
                        <span>ClipIt</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Simplify, share, and track your links with ease.
                    </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/#features"
                                    className="text-muted-foreground hover:underline"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#faq"
                                    className="text-muted-foreground hover:underline"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-muted-foreground hover:underline"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between md:py-6">
                <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} ClipIt.one. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
