import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, QrCode, Trash2Icon, Download } from "lucide-react";

export default function SlugSkeleton() {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">
                    Link Details
                </h1>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Skeleton className="w-24 h-6" />
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <Skeleton className="w-12 h-4" />
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                                disabled
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                                disabled
                            >
                                <QrCode className="mr-2 h-4 w-4" />
                                QR Code
                            </Button>
                            <Button variant="destructive" size="sm" disabled>
                                <Trash2Icon className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Total clicks:
                            </span>
                            <span className="text-sm">
                                <Skeleton className="w-12 h-4" />
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Analytics</h2>
                <div className="flex items-center gap-2">
                    <Select value="allTime" disabled>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="allTime">All time</SelectItem>
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
                            <Skeleton className="w-24 h-6" />
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
                            <Skeleton className="w-24 h-6" />
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
                        <Skeleton className="w-32 h-32" />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" disabled>
                            <Download className="mr-2 h-4 w-4" />
                            Download PNG
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
