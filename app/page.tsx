"use client";
import { useEffect } from "react";
import { ArrowRight, Link2, BarChart2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage() {
    useEffect(() => {
        AOS.init({
            duration: 500,
            delay: 100,
            once: true,
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1
                                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    Shorten, Share, Track
                                </h1>
                                <p
                                    className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    Create shortened URLs in seconds. Track
                                    clicks, analyze traffic, and generate QR
                                    codes with our powerful platform.
                                </p>
                            </div>
                            <div
                                className="space-x-4"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <Link href="/home">
                                    <Button className="px-8 py-2 cursor-pointer">
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted"
                >
                    <div
                        className="container mx-auto px-4 md:px-6"
                        data-aos="fade-up"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Powerful Features
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to manage, track, and
                                    optimize your links
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <Link2 className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">
                                        Link Shortening
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Create short, memorable links that
                                        redirect to your long URLs.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <BarChart2 className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">
                                        Analytics
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Get real time insights into how people
                                        are using your links.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <QrCode className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">
                                        QR Codes
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Generate QR codes for your shortened
                                        links. Perfect for easy sharing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="faq"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted"
                    data-aos="fade-up"
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Frequently Asked Questions
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to know about our
                                    service
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:gap-12">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">
                                    How long do shortened links last?
                                </h3>
                                <p className="text-muted-foreground">
                                    Links last forever! We don&apos;t expire or
                                    delete any shortened links.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">
                                    Can I customize my shortened links?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, if the slug is available, you can
                                    customize your shortened links.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">
                                    What analytics do you provide?
                                </h3>
                                <p className="text-muted-foreground">
                                    Right now we track clicks, we are working on
                                    expanding our analytics features in the near
                                    future.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="w-full py-12 md:py-24 lg:py-32"
                    data-aos="fade-up"
                >
                    <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Ready to simplify your links?
                            </h2>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Join thousands of marketers, content creators,
                                and businesses who use ClipIt to manage and
                                track their links.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                            <Link href="/home">
                                <Button className="px-8">
                                    Get Started for Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <LandingFooter />
        </div>
    );
}
