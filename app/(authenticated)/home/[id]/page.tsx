import { getLink } from "@/models/links-model";
import { getClicks } from "@/models/analytics-model";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SlugPage from "./slug-page";

export default async function LinkDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await getSession();
    if (!session) redirect("/login");

    const { id: slug } = await params;
    const link = await getLink(slug);
    if (!link) redirect("/home");
    link.clicks = await getClicks(slug);

    return <SlugPage link={link} />;
}
