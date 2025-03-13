"use server";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
    getLink,
    updateUrl,
    updateSlug,
    deleteLink,
} from "@/models/links-model";

export async function updateUrlAction(slug: string, url: string) {
    const session = await getSession();
    if (!session) return;
    const link = await getLink(slug);
    if (!link) return;
    if (link.userId !== session.user.userId) return;
    await updateUrl(slug, url);
}

export async function updateSlugAction(slug: string, newSlug: string) {
    const session = await getSession();
    if (!session) return;
    const link = await getLink(slug);
    if (!link) return;
    if (link.userId !== session.user.userId) return;
    console.log("updateSlugAction", slug, newSlug);
    await updateSlug(slug, newSlug);
}

export async function deleteLinkAction(slug: string) {
    const session = await getSession();
    if (!session) return;
    const link = await getLink(slug);
    if (!link) return;
    if (link.userId !== session.user.userId) return;
    await deleteLink(slug);
    redirect("/home");
}
