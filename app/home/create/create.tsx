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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { createLinkAction, checkSlugAvailabilityAction } from "./action";

interface CreatePageProps {
    limitReached: boolean;
}

export default function CreatePage({ limitReached }: CreatePageProps) {
    const [url, setUrl] = useState("");
    const [customSlug, setCustomSlug] = useState("");
    const [useCustomSlug, setUseCustomSlug] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateLink = async () => {
        setLoading(true);
        if (!url) {
            setError("URL is required");
            setLoading(false);
            return;
        }
        try {
            new URL(url);
        } catch (error) {
            console.log(error);
            setError("Invalid URL");
            setLoading(false);
            return;
        }
        if (useCustomSlug && !customSlug) {
            setError("No custom slug provided");
            setLoading(false);
            return;
        }
        const isAvailable = await checkSlugAvailabilityAction(customSlug);
        if (useCustomSlug && !isAvailable) {
            setError("That slug is already taken");
            setLoading(false);
            return;
        }
        setError("");
        await createLinkAction(url, customSlug, loadingScreen);
    };

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (useCustomSlug && customSlug) {
                try {
                    new URL(`https://clipit.one/${customSlug}`);
                } catch (error) {
                    setError("Invalid slug format");
                    console.log(error);
                    return;
                }
                if (customSlug.length < 3) {
                    setError("Slug must be at least 3 characters long");
                    return;
                } else if (customSlug.length > 50) {
                    setError("Slug must be at most 50 characters long");
                    return;
                }
                const isAvailable = await checkSlugAvailabilityAction(
                    customSlug
                );
                if (!isAvailable) {
                    setError("That slug is already taken");
                } else {
                    setError("");
                }
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [customSlug, useCustomSlug]);

    if (limitReached) {
        return (
            <div className="flex flex-col gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                    <Link href="/home">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Create Link
                    </h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Create a New Link</CardTitle>
                        <CardDescription>
                            You have reached the maximum number of links
                            allowed.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Link href="/home">
                            <Button variant="outline">Back</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex items-center gap-2">
                <Link href="/home">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">
                    Create Link
                </h1>
                {error && <div className="text-red-500">{error}</div>}
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
                            onClick={() => setLoadingScreen(!loadingScreen)}
                        />
                        <Label htmlFor="loading-screen">
                            Use loading screen
                        </Label>
                        <HoverCard>
                            <HoverCardTrigger>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-6 w-6 rounded-full border"
                                >
                                    i
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>
                                    Enable this option to use a loading screen
                                    when the link is clicked. This slows down
                                    link redirect time.
                                </p>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            onClick={() => setUseCustomSlug(!useCustomSlug)}
                        />
                        <Label htmlFor="custom-slug">Custom slug</Label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Custom slug (optional)</Label>
                        <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 text-sm text-muted-foreground">
                                ClipIt.one/
                            </div>
                            <Input
                                id="slug"
                                placeholder="my-custom-slug"
                                disabled={!useCustomSlug}
                                value={customSlug}
                                onChange={(e) =>
                                    setCustomSlug(e.target.value.trim())
                                }
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href="/home">
                        <Button variant="outline" disabled={loading}>
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
    );
}
