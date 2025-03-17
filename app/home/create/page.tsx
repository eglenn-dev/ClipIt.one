import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { linkLimitReached } from "@/models/links-model";
import CreatePage from "./create";

export const metadata = {
    title: "Create Link | ClipIt.one",
};

export default async function CreateLinkPage() {
    const session = await getSession();
    if (!session) redirect("/login");
    const limitReached = await linkLimitReached(session.user.userId);
    return <CreatePage limitReached={limitReached} />;
}
