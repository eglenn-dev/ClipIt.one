"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Link2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { createLinkAction, checkSlugAvailabilityAction } from "./action";

export default function CreatePage() {
    const [url, setUrl] = useState("");
    const [customSlug, setCustomSlug] = useState("");
    const [useCustomSlug, setUseCustomSlug] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateLink = async () => {
        if (!url) {
            setError("URL is required");
            return;
        }
        try {
            new URL(url);
        } catch (error) {
            console.log(error);
            setError("Invalid URL");
            return;
        }
        if (useCustomSlug && !customSlug) {
            setError("No custom slug provided");
            return;
        }
        if (useCustomSlug && (await checkSlugAvailabilityAction(customSlug))) {
            setError("Slug is not unique");
            return;
        }
        setLoading(true);
        setError("");
        await createLinkAction(url, customSlug);
    };

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (useCustomSlug && customSlug) {
                const isAvailable = await checkSlugAvailabilityAction(
                    customSlug
                );
                if (!isAvailable) {
                    setError("Slug is not unique");
                } else {
                    setError("");
                }
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [customSlug, useCustomSlug]);

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 border-b bg-background">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Link2 className="h-6 w-6" />
                        <span>ClipIt</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                        >
                            {/* eslint-disable @next/next/no-img-element */}
                            <img
                                src="/placeholder.svg?height=32&width=32"
                                width="32"
                                height="32"
                                alt="Avatar"
                                className="rounded-full"
                            />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </div>
                </div>
            </header>
            <div className="flex flex-1">
                <aside className="hidden w-[200px] flex-col border-r bg-muted/40 md:flex">
                    <nav className="grid gap-2 p-4">
                        <Link
                            href="/home"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M3 3v18h18"></path>
                                <path d="M18 17V9"></path>
                                <path d="M13 17V5"></path>
                                <path d="M8 17v-3"></path>
                            </svg>
                            Dashboard
                        </Link>
                        <Link
                            href="/home/create"
                            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                            Create Link
                        </Link>
                    </nav>
                </aside>
                <main className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col gap-4 md:gap-8">
                        <div className="flex items-center gap-2">
                            <Link href="/home">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Create Link
                            </h1>
                            {error && (
                                <div className="text-red-500">{error}</div>
                            )}
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create a New Link</CardTitle>
                                <CardDescription>
                                    Enter a long URL to create a shortened link
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="url">URL to shorten</Label>
                                    <Input
                                        id="url"
                                        placeholder="https://example.com/your-long-url"
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        onClick={() =>
                                            setUseCustomSlug(!useCustomSlug)
                                        }
                                    />
                                    <Label htmlFor="custom-slug">
                                        Custom slug
                                    </Label>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">
                                        Custom slug (optional)
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-shrink-0 text-sm text-muted-foreground">
                                            ClipIt.one/
                                        </div>
                                        <Input
                                            id="slug"
                                            placeholder="my-custom-slug"
                                            disabled={!useCustomSlug}
                                            onChange={(e) =>
                                                setCustomSlug(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Link href="/home">
                                    <Button
                                        variant="outline"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        handleCreateLink();
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Create Link"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
