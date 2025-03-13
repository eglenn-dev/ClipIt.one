"use client";
import { Search, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-1 flex items-center justify-center">
                <div className="container px-4 md:px-6 flex flex-col items-center text-center py-16 md:py-24 lg:py-32">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-8">
                        <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
                        Page Not Found
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mb-8">
                        Oops! The page you&apos;re looking for doesn&apos;t
                        exist or has been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/">
                            <Button className="min-w-[150px]">
                                <Home className="mr-2 h-4 w-4" />
                                Go Home
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="min-w-[150px]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
