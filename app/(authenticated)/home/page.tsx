import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BarChart3,
    Link2,
    Plus,
    Search,
    ExternalLink,
    Copy,
    QrCode,
    BarChart2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const links = [
    {
        id: "1",
        originalUrl:
            "https://example.com/very/long/url/that/needs/to/be/shortened/for/better/sharing/and/tracking",
        shortUrl: "ClipIt.com/abc123",
        createdAt: "2023-04-15",
        clicks: 1245,
        status: "active",
    },
    {
        id: "2",
        originalUrl:
            "https://anotherexample.com/blog/how-to-create-effective-marketing-campaigns-in-2023",
        shortUrl: "ClipIt.com/def456",
        createdAt: "2023-05-20",
        clicks: 873,
        status: "active",
    },
    {
        id: "3",
        originalUrl:
            "https://example.org/products/new-product-launch-spring-collection",
        shortUrl: "ClipIt.com/ghi789",
        createdAt: "2023-06-10",
        clicks: 421,
        status: "active",
    },
    {
        id: "4",
        originalUrl:
            "https://example.net/events/annual-conference-2023-registration",
        shortUrl: "ClipIt.com/jkl012",
        createdAt: "2023-07-05",
        clicks: 156,
        status: "inactive",
    },
];

export default async function DashboardPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 border-b bg-background">
                <div className="container flex h-16 items-center justify-between px-4">
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
                                    <p className="text-xs text-muted-foreground">
                                        +2 from last month
                                    </p>
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
                                            (acc, link) => acc + link.clicks,
                                            0
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +20% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Active Links
                                    </CardTitle>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {
                                            links.filter(
                                                (link) =>
                                                    link.status === "active"
                                            ).length
                                        }
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +1 from last month
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <Tabs defaultValue="all">
                            <div className="flex items-center justify-between">
                                <TabsList>
                                    <TabsTrigger value="all">
                                        All Links
                                    </TabsTrigger>
                                    <TabsTrigger value="active">
                                        Active
                                    </TabsTrigger>
                                    <TabsTrigger value="inactive">
                                        Inactive
                                    </TabsTrigger>
                                </TabsList>
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
                            <TabsContent value="all" className="mt-4">
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
                                                    key={link.id}
                                                    className="rounded-lg border p-4"
                                                >
                                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                        <div className="grid gap-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">
                                                                    {
                                                                        link.shortUrl
                                                                    }
                                                                </span>
                                                                <Badge
                                                                    variant={
                                                                        link.status ===
                                                                        "active"
                                                                            ? "default"
                                                                            : "secondary"
                                                                    }
                                                                >
                                                                    {
                                                                        link.status
                                                                    }
                                                                </Badge>
                                                            </div>
                                                            <div className="text-sm text-muted-foreground line-clamp-1">
                                                                {
                                                                    link.originalUrl
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-sm text-muted-foreground">
                                                                {link.clicks}{" "}
                                                                clicks
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                >
                                                                    <Copy className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        Copy
                                                                    </span>
                                                                </Button>
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
                                                                <Link
                                                                    href={`/home/${link.id}`}
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
                            </TabsContent>
                            <TabsContent value="active" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Active Links</CardTitle>
                                        <CardDescription>
                                            Manage your active shortened links
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {links
                                                .filter(
                                                    (link) =>
                                                        link.status === "active"
                                                )
                                                .map((link) => (
                                                    <div
                                                        key={link.id}
                                                        className="rounded-lg border p-4"
                                                    >
                                                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                            <div className="grid gap-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">
                                                                        {
                                                                            link.shortUrl
                                                                        }
                                                                    </span>
                                                                    <Badge>
                                                                        active
                                                                    </Badge>
                                                                </div>
                                                                <div className="text-sm text-muted-foreground line-clamp-1">
                                                                    {
                                                                        link.originalUrl
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="text-sm text-muted-foreground">
                                                                    {
                                                                        link.clicks
                                                                    }{" "}
                                                                    clicks
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8"
                                                                    >
                                                                        <Copy className="h-4 w-4" />
                                                                        <span className="sr-only">
                                                                            Copy
                                                                        </span>
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8"
                                                                    >
                                                                        <QrCode className="h-4 w-4" />
                                                                        <span className="sr-only">
                                                                            QR
                                                                            Code
                                                                        </span>
                                                                    </Button>
                                                                    <Link
                                                                        href={`/home/${link.id}`}
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
                                </Card>
                            </TabsContent>
                            <TabsContent value="inactive" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Inactive Links</CardTitle>
                                        <CardDescription>
                                            Manage your inactive shortened links
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {links
                                                .filter(
                                                    (link) =>
                                                        link.status ===
                                                        "inactive"
                                                )
                                                .map((link) => (
                                                    <div
                                                        key={link.id}
                                                        className="rounded-lg border p-4"
                                                    >
                                                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                            <div className="grid gap-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">
                                                                        {
                                                                            link.shortUrl
                                                                        }
                                                                    </span>
                                                                    <Badge variant="secondary">
                                                                        inactive
                                                                    </Badge>
                                                                </div>
                                                                <div className="text-sm text-muted-foreground line-clamp-1">
                                                                    {
                                                                        link.originalUrl
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="text-sm text-muted-foreground">
                                                                    {
                                                                        link.clicks
                                                                    }{" "}
                                                                    clicks
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8"
                                                                    >
                                                                        <Copy className="h-4 w-4" />
                                                                        <span className="sr-only">
                                                                            Copy
                                                                        </span>
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8"
                                                                    >
                                                                        <QrCode className="h-4 w-4" />
                                                                        <span className="sr-only">
                                                                            QR
                                                                            Code
                                                                        </span>
                                                                    </Button>
                                                                    <Link
                                                                        href={`/home/${link.id}`}
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
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
}
