import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Login from "./login";

export const metadata = {
    title: "Login | ClipIt.one",
    description: "Sign in to your ClipIt.one account to start shortening URLs",
};

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return <Login />;
}
