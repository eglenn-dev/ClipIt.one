"use server";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createLink, checkUniqueSlug } from "@/models/links-model";

export async function createLinkAction(url: string, slug?: string) {
    const session = await getSession();
    if (!session) redirect("/login");
    const generatedSlug = await createLink(url, session.user.userId, slug);
    return redirect(`/home/${generatedSlug}`);
}

export async function checkSlugAvailabilityAction(slug: string) {
    const session = await getSession();
    if (!session) return;
    return await checkUniqueSlug(slug);
}
