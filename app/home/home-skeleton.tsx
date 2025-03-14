import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Link2, BarChart2, Search } from "lucide-react";

export default function HomePageSkeleton() {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <Button disabled>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Link
                </Button>
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
                        <Skeleton className="h-8 w-full" />
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
                        <Skeleton className="h-8 w-full" />
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
                            disabled
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
                    <Skeleton className="h-24 w-full" />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                </CardFooter>
            </Card>
        </div>
    );
}
