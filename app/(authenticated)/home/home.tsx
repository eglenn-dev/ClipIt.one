"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    BarChart3,
    Link2,
    Plus,
    Search,
    Copy,
    QrCode,
    BarChart2,
} from "lucide-react";
import { RedirectLink } from "@/lib/interfaces";

interface HomeProps {
    links: RedirectLink[];
}

export default function Home({ links }: HomeProps) {
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

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 border-b bg-background">
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Link2 className="h-6 w-6" />
                        <span>ClipIt</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search links..."
                                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
                            />
                        </div>
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
                            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                        >
                            <BarChart3 className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/home/create"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
                        >
                            <Plus className="h-4 w-4" />
                            Create Link
                        </Link>
                    </nav>
                </aside>
                <main className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col gap-4 md:gap-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Dashboard
                            </h1>
                            <Link href="/home/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Link
                                </Button>
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Links
                                    </CardTitle>
                                    <Link2 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {links.length}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Clicks
                                    </CardTitle>
                                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {links.reduce(
                                            (acc, link) =>
                                                acc + (link.clicks || 0),
                                            0
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="hidden md:block">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search links..."
                                        className="w-[200px] pl-8 md:w-[250px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>All Links</CardTitle>
                                <CardDescription>
                                    Manage all your shortened links
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {links.map((link) => (
                                        <div
                                            key={link.slug}
                                            className="rounded-lg border p-4"
                                        >
                                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                <Link
                                                    href={`/home/${link.slug}`}
                                                    className="grid gap-1"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">
                                                            {link.slug}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground line-clamp-1">
                                                        {link.url}
                                                    </div>
                                                </Link>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-sm text-muted-foreground">
                                                        {link.clicks} clicks
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() =>
                                                                copyToClipboard(
                                                                    `https://clipit.one/${link.slug}`
                                                                )
                                                            }
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Copy
                                                            </span>
                                                        </Button>
                                                        <Link
                                                            href={`/home/${link.slug}#qr-code`}
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                            >
                                                                <QrCode className="h-4 w-4" />
                                                                <span className="sr-only">
                                                                    QR Code
                                                                </span>
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            href={`/home/${link.slug}`}
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                            >
                                                                <BarChart2 className="h-4 w-4" />
                                                                <span className="sr-only">
                                                                    Analytics
                                                                </span>
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {links.length} links
                                </p>
                                <div className="flex gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                    >
                                        Next
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
