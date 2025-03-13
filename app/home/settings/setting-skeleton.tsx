import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsSkeleton() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col items-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Account Settings</h2>
                    </div>
                    <Tabs defaultValue="email" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="email">Email</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="email">
                            <form className="space-y-6">
                                <div>
                                    <Label htmlFor="email">
                                        New Email Address
                                    </Label>
                                    <Skeleton className="h-11 w-full" />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled
                                >
                                    Loading...
                                </Button>
                            </form>
                            <form className="mt-6 space-y-6">
                                <div>
                                    <Label htmlFor="username">
                                        New Username
                                    </Label>
                                    <Skeleton className="h-11 w-full" />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled
                                >
                                    Loading...
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
