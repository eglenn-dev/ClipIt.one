"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

interface LoadingPageProps {
    redirectUrl: string;
}

export default function LoadingPage({ redirectUrl }: LoadingPageProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            redirect(redirectUrl);
        }, 100);

        return () => clearTimeout(timer);
    }, [redirectUrl]);

    return (
        <div className="w-full h-screen overflow-hidden bg-white flex items-center justify-center">
            <div
                aria-label="Orange and tan hamster running in a metal wheel"
                role="img"
                className="wheel-and-hamster"
            >
                <div className="wheel"></div>
                <div className="hamster">
                    <div className="hamster__body">
                        <div className="hamster__head">
                            <div className="hamster__ear"></div>
                            <div className="hamster__eye"></div>
                            <div className="hamster__nose"></div>
                        </div>
                        <div className="hamster__limb hamster__limb--fr"></div>
                        <div className="hamster__limb hamster__limb--fl"></div>
                        <div className="hamster__limb hamster__limb--br"></div>
                        <div className="hamster__limb hamster__limb--bl"></div>
                        <div className="hamster__tail"></div>
                    </div>
                </div>
                <div className="spoke"></div>
            </div>
        </div>
    );
}
