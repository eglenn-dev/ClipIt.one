"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import QRCodeComponent from "@/components/qr-code";

export default function CreateQrCode() {
    const [url, setUrl] = useState<string>("https://clipit.one");
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (url) {
            if (url.startsWith("http://") || url.startsWith("https://")) {
                setError(null);
                return;
            }
            setError("URL must start with http:// or https://");
        }
    }, [url]);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Create a QR Code</CardTitle>
                    <CardDescription>
                        Create a QR code for your link that will never expire.{" "}
                        <strong>
                            Note that scans of this QR code are not tracked.
                        </strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <Input
                        type="url"
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                        placeholder="Enter your link here"
                    />
                    {!error && (
                        <div className="mt-4 flex items-center justify-center sm:block">
                            <QRCodeComponent
                                url={url || ""}
                                size={200}
                                urlCode={setQrCodeUrl}
                            />
                        </div>
                    )}
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                            const downloadLink = document.createElement("a");
                            downloadLink.href = qrCodeUrl || "";
                            downloadLink.download = `ClipIt_${url?.replace(
                                /[^a-zA-Z0-9]/g,
                                "_"
                            )}.png`;
                            downloadLink.click();
                        }}
                        disabled={!qrCodeUrl || error ? true : false}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download PNG
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
