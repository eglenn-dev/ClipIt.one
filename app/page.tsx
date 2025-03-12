import { ArrowRight, Link2, BarChart2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingHeader from "@/components/landing-header";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Shorten, Share, Track
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Create shortened URLs in seconds. Track
                                    clicks, analyze traffic, and generate QR
                                    codes with our powerful platform.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/home">
                                    <Button className="px-8">
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
                    <div className="container mx-auto px-4 md:px-6">
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
                                        redirect to your long URLs. Customize
                                        your links with branded domains.
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
                                        Track clicks, referrers, locations, and
                                        devices. Get insights into your audience
                                        and optimize your marketing.
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
                                        links. Perfect for print materials,
                                        business cards, and physical marketing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="pricing"
                    className="w-full py-12 md:py-24 lg:py-32"
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Simple Pricing
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Start for free, upgrade when you need more
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                                <div>
                                    <h3 className="text-xl font-bold">Free</h3>
                                    <div className="mt-4 text-4xl font-bold">
                                        $0
                                    </div>
                                    <p className="mt-2 text-muted-foreground">
                                        Perfect for personal use
                                    </p>
                                    <ul className="mt-6 space-y-2">
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Up to 10 links</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Basic analytics</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>QR code generation</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <Link href="/home">
                                        <Button className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm ring-2 ring-primary">
                                <div>
                                    <h3 className="text-xl font-bold">Pro</h3>
                                    <div className="mt-4 text-4xl font-bold">
                                        $9
                                    </div>
                                    <p className="mt-2 text-muted-foreground">
                                        Per month, billed annually
                                    </p>
                                    <ul className="mt-6 space-y-2">
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Up to 1,000 links</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Advanced analytics</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Custom QR codes</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Custom domains</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <Link href="/home">
                                        <Button className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Enterprise
                                    </h3>
                                    <div className="mt-4 text-4xl font-bold">
                                        Custom
                                    </div>
                                    <p className="mt-2 text-muted-foreground">
                                        For large organizations
                                    </p>
                                    <ul className="mt-6 space-y-2">
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Unlimited links</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Enterprise analytics</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Branded QR codes</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Multiple custom domains</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2 h-4 w-4 text-primary"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Dedicated support</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <Link href="/contact">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Contact Sales
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="faq"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted"
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
                                    Free links last for 30 days. Pro and
                                    Enterprise links never expire unless you
                                    delete them.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">
                                    Can I customize my shortened links?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, Pro and Enterprise plans allow you to
                                    create custom links with your own domain and
                                    custom slugs.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">
                                    What analytics do you provide?
                                </h3>
                                <p className="text-muted-foreground">
                                    We track clicks, geographic location,
                                    referrers, devices, and browsers. Pro and
                                    Enterprise plans offer more detailed
                                    analytics.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">
                                    Can I download my analytics data?
                                </h3>
                                <p className="text-muted-foreground">
                                    Yes, Pro and Enterprise plans allow you to
                                    export your analytics data in CSV or JSON
                                    format.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
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
                            <Link href="/contact">
                                <Button variant="outline" className="px-8">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t">
                <div className="container mx-auto flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
                    <div className="flex flex-col gap-2 md:gap-4 lg:flex-1">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <Link2 className="h-6 w-6" />
                            <span>ClipIt</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Simplify, share, and track your links with ease.
                        </p>
                    </div>
                    <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#features"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#pricing"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#faq"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/careers"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Terms
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/cookies"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Cookies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between md:py-6">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} ClipIt. All rights
                        reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M12 2H2v10h10V2zM22 2h-10v10h10V2zM12 12H2v10h10V12zM22 12h-10v10h10V12z"></path>
                            </svg>
                            <span className="sr-only">Slack</span>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
