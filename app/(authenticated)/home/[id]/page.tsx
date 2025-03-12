import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Download, Link2, QrCode, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const link = {
    id: "1",
    originalUrl:
        "https://example.com/very/long/url/that/needs/to/be/shortened/for/better/sharing/and/tracking",
    shortUrl: "ClipIt.com/abc123",
    createdAt: "2023-04-15",
    clicks: 1245,
    status: "active",
    analytics: {
        clicksByDay: [
            { date: "2023-04-15", clicks: 120 },
            { date: "2023-04-16", clicks: 145 },
            { date: "2023-04-17", clicks: 210 },
            { date: "2023-04-18", clicks: 180 },
            { date: "2023-04-19", clicks: 195 },
            { date: "2023-04-20", clicks: 230 },
            { date: "2023-04-21", clicks: 165 },
        ],
        referrers: [
            { name: "Direct", count: 450 },
            { name: "Twitter", count: 320 },
            { name: "Facebook", count: 280 },
            { name: "Instagram", count: 195 },
        ],
        locations: [
            { name: "United States", count: 520 },
            { name: "United Kingdom", count: 215 },
            { name: "Canada", count: 180 },
            { name: "Germany", count: 130 },
            { name: "France", count: 100 },
            { name: "Other", count: 100 },
        ],
        devices: [
            { name: "Mobile", count: 720 },
            { name: "Desktop", count: 425 },
            { name: "Tablet", count: 100 },
        ],
    },
};

export default async function LinkDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
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
                                Link Details {id}
                            </h1>
                        </div>
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            {link.shortUrl}
                                            <Badge
                                                variant={
                                                    link.status === "active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {link.status}
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-1">
                                            {link.originalUrl}
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button variant="outline" size="sm">
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <QrCode className="mr-2 h-4 w-4" />
                                            QR Code
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
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
                                            {link.createdAt}
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
                                <Select defaultValue="7days">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select timeframe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="7days">
                                            Last 7 days
                                        </SelectItem>
                                        <SelectItem value="30days">
                                            Last 30 days
                                        </SelectItem>
                                        <SelectItem value="90days">
                                            Last 90 days
                                        </SelectItem>
                                        <SelectItem value="custom">
                                            Custom range
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">
                                        Download report
                                    </span>
                                </Button>
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
                                        {link.clicks}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +12% from last period
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Unique Visitors
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        982
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +5% from last period
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Avg. Click Time
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        2.4s
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        -8% from last period
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Conversion Rate
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        3.2%
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +2% from last period
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <Tabs defaultValue="clicks">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="clicks">Clicks</TabsTrigger>
                                <TabsTrigger value="referrers">
                                    Referrers
                                </TabsTrigger>
                                <TabsTrigger value="locations">
                                    Locations
                                </TabsTrigger>
                                <TabsTrigger value="devices">
                                    Devices
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="clicks" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Click Analytics</CardTitle>
                                        <CardDescription>
                                            View click trends over time
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[300px] w-full">
                                            {/* This would be a chart in a real application */}
                                            <div className="flex h-full flex-col justify-between rounded-md border p-4">
                                                <div className="space-y-2">
                                                    <div className="text-sm font-medium">
                                                        Clicks over time
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Last 7 days
                                                    </div>
                                                </div>
                                                <div className="flex items-end gap-2 pt-4">
                                                    {link.analytics.clicksByDay.map(
                                                        (day, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex flex-1 flex-col items-center gap-2"
                                                            >
                                                                <div
                                                                    className="w-full bg-primary"
                                                                    style={{
                                                                        height: `${
                                                                            (day.clicks /
                                                                                Math.max(
                                                                                    ...link.analytics.clicksByDay.map(
                                                                                        (
                                                                                            d
                                                                                        ) =>
                                                                                            d.clicks
                                                                                    )
                                                                                )) *
                                                                            150
                                                                        }px`,
                                                                    }}
                                                                ></div>
                                                                <div className="text-xs">
                                                                    {
                                                                        day.date.split(
                                                                            "-"
                                                                        )[2]
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="referrers" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Referrer Analytics
                                        </CardTitle>
                                        <CardDescription>
                                            See where your traffic is coming
                                            from
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {link.analytics.referrers.map(
                                                (referrer, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                            <span>
                                                                {referrer.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-sm">
                                                                {referrer.count}{" "}
                                                                clicks
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {Math.round(
                                                                    (referrer.count /
                                                                        link.clicks) *
                                                                        100
                                                                )}
                                                                %
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="locations" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Location Analytics
                                        </CardTitle>
                                        <CardDescription>
                                            See where your visitors are located
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {link.analytics.locations.map(
                                                (location, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                            <span>
                                                                {location.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-sm">
                                                                {location.count}{" "}
                                                                clicks
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {Math.round(
                                                                    (location.count /
                                                                        link.clicks) *
                                                                        100
                                                                )}
                                                                %
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="devices" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Device Analytics</CardTitle>
                                        <CardDescription>
                                            See what devices your visitors are
                                            using
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {link.analytics.devices.map(
                                                (device, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                            <span>
                                                                {device.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-sm">
                                                                {device.count}{" "}
                                                                clicks
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {Math.round(
                                                                    (device.count /
                                                                        link.clicks) *
                                                                        100
                                                                )}
                                                                %
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                        <Card>
                            <CardHeader>
                                <CardTitle>QR Code</CardTitle>
                                <CardDescription>
                                    Generate a QR code for your shortened link
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="flex h-[200px] w-[200px] items-center justify-center rounded-md border">
                                    <QrCode className="h-32 w-32 text-muted-foreground" />
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download PNG
                                    </Button>
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download SVG
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm text-muted-foreground">
                                    Pro users can customize QR code colors and
                                    add logos
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
