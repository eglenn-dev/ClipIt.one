import { getLink } from "@/models/links-model";
import { logClick } from "@/models/analytics-model";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const link = await getLink(slug);
    if (!link) {
        redirect("/404");
    }
    const session = await getSession();
    if (!session) await logClick(link.slug);
    redirect(link.url);
}
