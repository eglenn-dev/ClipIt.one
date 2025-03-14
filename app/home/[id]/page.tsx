import { getLink } from "@/models/links-model";
import { getClicks } from "@/models/analytics-model";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SlugPage from "./slug-page";
import SlugSkeleton from "./slug-skeleton";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await getSession();
    if (!session) redirect("/login");

    return (
        <Suspense fallback={<SlugSkeleton />}>
            {SlugPageWrapper(params, session.user.userId)}
        </Suspense>
    );
}

async function SlugPageWrapper(
    params: Promise<{ id: string }>,
    userId: string
) {
    const { id: slug } = await params;
    const link = await getLink(slug);
    if (!link) redirect("/404");
    if (link.userId !== userId) redirect("/404");
    link.clicks = await getClicks(slug);

    return <SlugPage link={link} />;
}
