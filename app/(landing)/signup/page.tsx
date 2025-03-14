import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Signup from "./signup";

export const metadata = {
    title: "Sign Up | ClipIt.one",
    description: "Create an account on ClipIt.one to start shortening URLs",
};

export default async function LoginPage() {
    const session = await getSession();
    if (session) redirect("/home");

    return <Signup />;
}
