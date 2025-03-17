import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getLinksForUser, linkLimitReached } from "@/models/links-model";
import { RedirectLink } from "@/lib/interfaces";
import { getClicks } from "@/models/analytics-model";
import { Suspense } from "react";
import HomePageSkeleton from "./home-skeleton";
import Home from "./home";

export default async function HomePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    return (
        <Suspense fallback={<HomePageSkeleton />}>
            {HomePageWrapper(session.user.userId)}
        </Suspense>
    );
}

async function HomePageWrapper(userId: string) {
    const links = (await getLinksForUser(userId)) as RedirectLink[];
    for (const link of links) {
        link.clicks = await getClicks(link.slug);
    }
    const limitReached = await linkLimitReached(userId);
    return <Home links={links} limitReached={limitReached} />;
}
