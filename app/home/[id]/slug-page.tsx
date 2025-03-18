"use client";
import Link from "next/link";
import QRCodeComponent from "@/components/qr-code";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { updateLoadingScreenAction } from "./action";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@radix-ui/react-hover-card";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Copy, Download, QrCode, Trash2Icon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { RedirectLink } from "@/lib/interfaces";
import { updateUrlAction, updateSlugAction, deleteLinkAction } from "./action";

interface SlugPageProps {
    link: RedirectLink;
}

export default function SlugPage({ link }: SlugPageProps) {
    const [urlCode, setUrlCode] = useState("");
    const [timeRange, setTimeRange] = useState("allTime");
    const [isEditingSlug, setIsEditingSlug] = useState(false);
    const [editedSlug, setEditedSlug] = useState(link.slug);
    const [currentSlug, setCurrentSlug] = useState(link.slug);
    const [currentUrl, setCurrentUrl] = useState(link.url);
    const [error, setError] = useState("");
    const [editLoading, setEditLoading] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(
        link.loadingScreen || false
    );
    const numberActiveDays = Math.floor(
        (new Date().getTime() - new Date(link.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
    );
    const clicksPerDay =
        numberActiveDays > 0 ? (link.clicks || 0) / numberActiveDays : 0;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                console.log("Text copied to clipboard");
                toast("Link has been copied to your clipboard.");
            },
            (err) => {
                console.error("Could not copy text: ", err);
                toast("Failed to copy link to clipboard.");
            }
        );
    };

    const getFilteredClicks = () => {
        const now = new Date();
        let startDate = new Date(link.createdAt);

        if (timeRange === "7days") {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
        } else if (timeRange === "30days") {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 30);
        } else if (timeRange === "90days") {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 90);
        }
        const totalDays = Math.floor(
            (now.getTime() - new Date(link.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
        );
        const filteredDays = Math.floor(
            (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (filteredDays >= totalDays) {
            return link.clicks || 0;
        }
        return Math.round((link.clicks || 0) * (filteredDays / totalDays));
    };

    const getActiveDays = () => {
        if (timeRange === "7days") {
            return Math.max(1, Math.min(7, numberActiveDays));
        } else if (timeRange === "30days") {
            return Math.max(1, Math.min(30, numberActiveDays));
        } else if (timeRange === "90days") {
            return Math.max(1, Math.min(90, numberActiveDays));
        }

        return Math.max(1, numberActiveDays);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedUrl, setEditedUrl] = useState(link.url);

    const updateUrl = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setEditLoading(false);
        if (editedUrl === currentUrl) {
            setIsEditing(false);
            return;
        }
        try {
            new URL(editedUrl);
        } catch (error) {
            setError("Invalid URL");
            console.log(error);
            return;
        }
        setError("");
        setEditLoading(true);
        await updateUrlAction(currentSlug, editedUrl);
        setCurrentUrl(editedUrl);
        setIsEditingSlug(false);
        setEditLoading(false);
    };

    const updateSlug = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setEditLoading(false);
        if (editedSlug === currentSlug) {
            setIsEditingSlug(false);
            return;
        }
        try {
            new URL(`https://clipit.one/${editedSlug}`);
        } catch (error) {
            setError("Invalid slug");
            console.log(error);
            return;
        }
        if (editedSlug.length < 3) {
            setError("Slug must be at least 3 characters long");
            return;
        } else if (editedSlug.length > 50) {
            setError("Slug must be at most 50 characters long");
            return;
        }
        setError("");
        setEditLoading(true);
        await updateSlugAction(currentSlug, editedSlug);
        setCurrentSlug(editedSlug);
        setIsEditingSlug(false);
        window.history.replaceState(null, "", `/home/${editedSlug}`);
        setEditLoading(false);
    };

    useEffect(() => {
        const updateLoadingScreen = async () => {
            if (loadingScreen === link.loadingScreen) return;
            await updateLoadingScreenAction(currentSlug, loadingScreen);
        };
        updateLoadingScreen();
    }, [link, currentSlug, loadingScreen]);

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
                    Link Details
                </h1>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <a
                                    href={
                                        isEditingSlug
                                            ? "#"
                                            : `https://clipit.one/${currentSlug}`
                                    }
                                    target={isEditingSlug ? "_self" : "_blank"}
                                    rel="noreferrer"
                                >
                                    <div className="flex items-center">
                                        {error && (
                                            <span className="text-red-500">
                                                {error}
                                            </span>
                                        )}
                                        <Button
                                            variant="link"
                                            className="p-0 underline text-lg cursor-pointer gap-0"
                                        >
                                            https://clipit.one/
                                            {!isEditingSlug ? (
                                                <span>{currentSlug}</span>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={editedSlug}
                                                    onChange={(e) =>
                                                        setEditedSlug(
                                                            e.target.value.trim()
                                                        )
                                                    }
                                                    className="w-40 px-1 border rounded-md text-base"
                                                    autoFocus
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                />
                                            )}
                                        </Button>
                                        {isEditingSlug ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="ml-2 h-7"
                                                onClick={updateSlug}
                                                disabled={editLoading}
                                            >
                                                {editLoading
                                                    ? "Saving"
                                                    : "Save"}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0 ml-1"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsEditingSlug(true);
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-4 w-4"
                                                >
                                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                    <path d="m15 5 4 4" />
                                                </svg>
                                                <span className="sr-only">
                                                    Edit Slug
                                                </span>
                                            </Button>
                                        )}
                                    </div>
                                </a>
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedUrl}
                                            onChange={(e) =>
                                                setEditedUrl(e.target.value)
                                            }
                                            className="flex-1 min-w-0 px-2 py-1 border rounded-md w-44"
                                            autoFocus
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={updateUrl}
                                            disabled={editLoading}
                                        >
                                            {editLoading ? "Saving" : "Save"}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <span className="line-clamp-1 flex-1 max-w-44">
                                            {currentUrl}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4"
                                            >
                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                <path d="m15 5 4 4" />
                                            </svg>
                                            <span className="sr-only">
                                                Edit URL
                                            </span>
                                        </Button>
                                    </>
                                )}
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    defaultChecked={link.loadingScreen}
                                    onClick={() =>
                                        setLoadingScreen(!loadingScreen)
                                    }
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
                                            Enable this option to use a loading
                                            screen when the link is clicked.
                                            This slows down link redirect time.
                                        </p>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() =>
                                    copyToClipboard(
                                        `https://clipit.one/${
                                            isEditingSlug
                                                ? editedSlug
                                                : currentSlug
                                        }`
                                    )
                                }
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                            <Link href="#qr-code">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer"
                                >
                                    <QrCode className="mr-2 h-4 w-4" />
                                    QR Code
                                </Button>
                            </Link>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Trash2Icon className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your link,
                                            and all associated analytics data.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                deleteLinkAction(currentSlug)
                                            }
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Created on:
                            </span>
                            <span className="text-sm">
                                {new Date(link.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Total clicks:
                            </span>
                            <span className="text-sm">{link.clicks}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Analytics</h2>
                <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="allTime">All time</SelectItem>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Clicks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {timeRange === "allTime"
                                ? link.clicks
                                : getFilteredClicks()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Clicks Per Day
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {timeRange === "allTime"
                                ? numberActiveDays > 0
                                    ? clicksPerDay.toFixed(1)
                                    : link.clicks || "0"
                                : (
                                      getFilteredClicks() / getActiveDays()
                                  ).toFixed(1)}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="text-sm text-gray-500">
                Note that clicks do not include times you open the link from a
                device you are singed in on.
            </div>
            <Card id="qr-code">
                <CardHeader>
                    <CardTitle>QR Code</CardTitle>
                    <CardDescription>
                        Generate a QR code for your shortened link
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="flex h-[200px] w-[200px] items-center justify-center rounded-md border">
                        <QRCodeComponent
                            size={1000}
                            url={`https://clipit.one/${currentSlug}`}
                            urlCode={setUrlCode}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => {
                                const downloadLink =
                                    document.createElement("a");
                                downloadLink.href = urlCode;
                                downloadLink.download = `ClipIt_${
                                    isEditingSlug ? editedSlug : currentSlug
                                }.png`;
                                downloadLink.click();
                            }}
                            disabled={!urlCode}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download PNG
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
