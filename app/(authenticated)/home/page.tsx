import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getLinksForUser } from "@/models/links-model";
import { RedirectLink } from "@/lib/interfaces";
import { getClicks } from "@/models/analytics-model";
import Home from "./home";

export default async function HomePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const links = (await getLinksForUser(
        session.user.userId
    )) as RedirectLink[];
    for (const link of links) {
        link.clicks = await getClicks(link.slug);
    }

    return <Home links={links} />;
}
