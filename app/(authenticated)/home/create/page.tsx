import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CreatePage from "./create";

export default async function CreateLinkPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return <CreatePage />;
}
