import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";

export const metadata = {
    title: "About | ClipIt.one",
    description:
        "Learn more about ClipIt.one and our mission to simplify link management.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    About ClipIt.one
                                </h1>
                                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    We&apos;re on a mission to make link
                                    management simple and powerful for everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter">
                                    Our Story
                                </h2>
                                <p className="text-muted-foreground md:text-xl/relaxed">
                                    ClipIt was founded in 2025 with a simple
                                    idea: make link management accessible to
                                    everyone. What started as a side project
                                    quickly grew into a powerful platform used
                                    by thousands of marketers, content creators,
                                    and businesses worldwide.
                                </p>
                                <p className="text-muted-foreground md:text-xl/relaxed">
                                    We noticed that existing link shortening
                                    services were either too basic or too
                                    complex and expensive. We set out to create
                                    a solution that strikes the perfect balance
                                    between simplicity and power.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter">
                                    Our Mission
                                </h2>
                                <p className="text-muted-foreground md:text-xl/relaxed">
                                    Our mission is to empower individuals and
                                    businesses to get more out of their links.
                                    We believe that link management should be
                                    simple, insightful, and accessible to
                                    everyone.
                                </p>
                                <p className="text-muted-foreground md:text-xl/relaxed">
                                    We&apos;re committed to building tools that
                                    help you understand your audience, optimize
                                    your content, and make data-driven
                                    decisions. Whether you&apos;re a solo
                                    creator or a large enterprise, ClipIt is
                                    designed to grow with you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter">
                                    Our Values
                                </h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            1
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">
                                                Simplicity
                                            </h3>
                                            <p className="text-muted-foreground">
                                                We believe in making complex
                                                things simple. Our products are
                                                intuitive and easy to use,
                                                without sacrificing power or
                                                flexibility.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            2
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">
                                                Transparency
                                            </h3>
                                            <p className="text-muted-foreground">
                                                We&apos;re open and honest about
                                                our products and practices. What
                                                you see is what you get.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            3
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">
                                                Innovation
                                            </h3>
                                            <p className="text-muted-foreground">
                                                We&apos;re constantly exploring
                                                new ways to improve our products
                                                and provide more value to our
                                                users.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter">
                                    Our Technology
                                </h2>
                                <p className="text-muted-foreground md:text-xl/relaxed">
                                    ClipIt is built on modern, scalable
                                    technology that ensures reliability, speed,
                                    and security.
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-center gap-2">
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
                                            className="h-5 w-5 text-primary"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>
                                            Next.js for a fast, modern frontend
                                            experience
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
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
                                            className="h-5 w-5 text-primary"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>
                                            Google Firebase for high-performance
                                            data storage
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
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
                                            className="h-5 w-5 text-primary"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>
                                            Global CDN for lightning-fast
                                            redirects
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
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
                                            className="h-5 w-5 text-primary"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>
                                            Real-time analytics processing
                                        </span>
                                    </li>
                                </ul>
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
                            <Link href="/dashboard">
                                <Button className="px-8">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
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
