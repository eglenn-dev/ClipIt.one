"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { createApiKeyAction, deleteApiKeyAction } from "./action";
import { useState } from "react";
import APIDocs from "./api-docs";

interface ApiKey {
    key: string;
    createdAt: number;
    userId: string;
    note?: string;
}

interface ApiKeyProps {
    apiKeys: ApiKey[] | null;
}

export default function APIPage({ apiKeys }: ApiKeyProps) {
    const [newKeyNote, setNewKeyNote] = useState<string>("");

    const createNewKey = async () => {
        const newKey = await createApiKeyAction(newKeyNote);
        if (newKey) {
            setNewKeyNote("");
            location.reload();
        } else {
            alert("Failed to create API key. Please try again.");
        }
    };

    const deleteApiKey = async (key: string) => {
        const result = await deleteApiKeyAction(key);
        if (result) {
            location.reload();
        } else {
            alert("Failed to revoke API key. Please try again.");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                toast("Link has been copied to your clipboard 👍");
            },
            (err) => {
                console.error("Could not copy text: ", err);
                toast("Failed to copy link to clipboard.");
            }
        );
    };

    return (
        <div className="flex flex-col gap-4 max-w-screen mx-auto">
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className="text-sm text-muted-foreground">
                Manage your API keys here. You can create new keys or revoke
                existing ones.
            </p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="max-w-fit" variant="outline">
                        Create API Key
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create API Key</DialogTitle>
                        <DialogDescription>
                            Create a new API key for your account. Make sure to
                            save it in a secure place.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="note" className="text-right">
                                Note
                            </Label>
                            <Input
                                id="note"
                                placeholder="What is this key for?"
                                className="col-span-3"
                                value={newKeyNote}
                                onChange={(e) => setNewKeyNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={createNewKey}>Create Key</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="max-w-screen overflow-x-hidden">
                <Table className="w-full overflow-x-scroll">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Note</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    {apiKeys && apiKeys.length > 0 ? (
                        apiKeys.map((key) => (
                            <TableBody key={key.key}>
                                <TableRow>
                                    <TableCell className="flex flex-row items-center gap-2">
                                        {key.key}{" "}
                                        <Copy
                                            onClick={() =>
                                                copyToClipboard(key.key)
                                            }
                                            className="h-4 w-4"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            key.createdAt
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {key.note || "No note"}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                deleteApiKey(key.key)
                                            }
                                        >
                                            Revoke
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))
                    ) : (
                        <p>No API keys found.</p>
                    )}
                </Table>
            </div>
            <APIDocs />
        </div>
    );
}
