"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "./action";
import LandingHeader from "@/components/landing-header";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <LandingHeader />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold">
                            Sign in to your account
                        </h2>
                    </div>
                    {error && (
                        <div className="text-center text-red-500">{error}</div>
                    )}
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (loading) return;
                            if (email === "" || password === "") {
                                setError("Please fill in all fields");
                                return;
                            }
                            setLoading(true);
                            const formData = new FormData();
                            formData.append("email", email);
                            formData.append("password", password);
                            loginAction(formData)
                                .then(() => {
                                    setLoading(false);
                                    setError("");
                                })
                                .catch((error) => {
                                    setLoading(false);
                                    setError(error.message);
                                });
                        }}
                    >
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <Label htmlFor="email-address">
                                    Email address
                                </Label>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Sign in"}
                            </Button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Not a member?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
