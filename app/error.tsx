"use client";
import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col">
            <LandingHeader />
            <main className="flex-1 flex items-center justify-center">
                <div className="container px-4 md:px-6 flex flex-col items-center text-center py-16 md:py-24 lg:py-32">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-8">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        500
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
                        Server Error
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mb-8">
                        Oops! Something went wrong on our end. We&apos;re
                        working to fix the issue.
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
                            onClick={() => reset()}
                            className="min-w-[150px]"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
