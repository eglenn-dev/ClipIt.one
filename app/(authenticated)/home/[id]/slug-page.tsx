"use client";
import Link from "next/link";
import QRCodeComponent from "@/components/qr-code";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Copy, Download, Link2, QrCode } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { RedirectLink } from "@/lib/interfaces";

interface SlugPageProps {
    link: RedirectLink;
}

export default function SlugPage({ link }: SlugPageProps) {
    const [urlCode, setUrlCode] = useState("");
    const [timeRange, setTimeRange] = useState("allTime");
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
            },
            (err) => {
                console.error("Could not copy text: ", err);
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

        // For a real implementation, you would filter clicks from your database
        // This is a simplified version that estimates filtered clicks
        const totalDays = Math.floor(
            (now.getTime() - new Date(link.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
        );
        const filteredDays = Math.floor(
            (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // If we don't have enough history for the selected range, return all clicks
        if (filteredDays >= totalDays) {
            return link.clicks || 0;
        }

        // Estimate clicks for the time period (assuming uniform distribution)
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

    useEffect(() => {
        console.log(urlCode);
    }, [urlCode]);

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
                                Link Details
                            </h1>
                        </div>
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <a
                                                href={`https://ClipIt.one/${link.slug}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Button
                                                    variant="link"
                                                    className="p-0 underline text-lg cursor-pointer"
                                                >
                                                    https://ClipIt.one/
                                                    {link.slug}
                                                </Button>
                                            </a>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-1">
                                            {link.url}
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer"
                                            onClick={() =>
                                                copyToClipboard(
                                                    `https://ClipIt.one/${link.slug}`
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
                                            {new Date(
                                                link.createdAt
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Total clicks:
                                        </span>
                                        <span className="text-sm">
                                            {link.clicks}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold tracking-tight">
                                Analytics
                            </h2>
                            <div className="flex items-center gap-2">
                                <Select
                                    value={timeRange}
                                    onValueChange={setTimeRange}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select timeframe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="allTime">
                                            All time
                                        </SelectItem>
                                        <SelectItem value="7days">
                                            Last 7 days
                                        </SelectItem>
                                        <SelectItem value="30days">
                                            Last 30 days
                                        </SelectItem>
                                        <SelectItem value="90days">
                                            Last 90 days
                                        </SelectItem>
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
                                                  getFilteredClicks() /
                                                  getActiveDays()
                                              ).toFixed(1)}
                                    </div>
                                </CardContent>
                            </Card>
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
                                        url={`https://clipit.one/${link.slug}`}
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
                                            downloadLink.download = `ClipIt_${link.slug}.png`;
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
                </main>
            </div>
        </div>
    );
}
