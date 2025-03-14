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
import { ArrowLeft } from "lucide-react";
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
        const urlPattern = /^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;
        if (!urlPattern.test(url)) {
            setError("URL contains unsupported characters");
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
        const isAvailable = await checkSlugAvailabilityAction(customSlug);
        if (useCustomSlug && !isAvailable) {
            setError("That slug is already taken");
            return;
        }
        setLoading(true);
        setError("");
        await createLinkAction(url, customSlug);
    };

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (useCustomSlug && customSlug) {
                const urlPattern = /^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;
                if (!urlPattern.test(customSlug)) {
                    setError("Slug contains unsupported characters");
                    return;
                } else if (customSlug.length < 3) {
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
                                onChange={(e) => setCustomSlug(e.target.value)}
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
