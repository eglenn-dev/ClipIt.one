"use client";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface QRCodeProps {
    url: string;
    size?: number;
    urlCode?: (url: string) => void;
}

export default function QRCodeComponent({
    url,
    size = 50,
    urlCode,
}: QRCodeProps) {
    const [qrCodeUrl, setQrCodeUrl] = useState("");

    useEffect(() => {
        QRCode.toDataURL(
            url,
            { width: size, color: { dark: "#000000", light: "#ffffff" } },
            (err: Error | null | undefined, url: string) => {
                if (err) {
                    console.log("Error generating QR code", err);
                    return;
                }
                setQrCodeUrl(url);
            }
        );
        if (urlCode) urlCode(qrCodeUrl);
    }, [url, size, qrCodeUrl, urlCode]);

    if (!qrCodeUrl) return <Skeleton className={`w-full h-full`} />;
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qrCodeUrl} alt="QR code for link" />
    );
}
