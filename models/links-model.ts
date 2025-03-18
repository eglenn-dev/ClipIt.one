import admin from "firebase-admin";
import { validateUserKey } from "./accounts-model";
import { deleteClicks } from "./analytics-model";
import { RedirectLink } from "@/lib/interfaces";

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountString) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
}

const serviceAccount = JSON.parse(serviceAccountString);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
        ),
        databaseURL: "https://clipit-one-default-rtdb.firebaseio.com/",
    });
}

const db = admin.database();
const linksRef = db.ref("links");

export async function createLink(
    url: string,
    userId: string,
    slug?: string,
    loadingScreen?: boolean
) {
    if (!(await validateUserKey(userId))) {
        throw new Error("Invalid user key");
    }
    if (!slug) {
        slug = await generateUniqueSlug();
    } else if (!(await checkUniqueSlug(slug))) {
        throw new Error("Slug is not unique");
    }
    const newLink = linksRef.push();
    await newLink.set({
        url,
        slug,
        userId,
        createdAt: Date.now(),
        loadingScreen,
    });
    return slug;
}

export async function checkUniqueSlug(slug: string) {
    const snapshot = await linksRef.orderByChild("slug").equalTo(slug).get();
    return !snapshot.exists();
}

export async function generateUniqueSlug() {
    let slug = Math.random().toString(36).substring(2, 8);
    while (!(await checkUniqueSlug(slug))) {
        slug = Math.random().toString(36).substring(2, 8);
    }
    return slug;
}

export async function getLink(slug: string) {
    const snapshot = await linksRef.orderByChild("slug").equalTo(slug).get();
    if (!snapshot.exists()) {
        return null;
    }
    return Object.values(snapshot.val())[0] as RedirectLink;
}

export async function getKeyBySlug(slug: string) {
    const snapshot = await linksRef.orderByChild("slug").equalTo(slug).get();
    if (!snapshot.exists()) {
        return null;
    }
    return Object.keys(snapshot.val())[0];
}

export async function getKeysByUserId(userId: string) {
    const snapshot = await linksRef
        .orderByChild("userId")
        .equalTo(userId)
        .get();
    if (!snapshot.exists()) {
        return [];
    }
    return Object.keys(snapshot.val());
}

export async function getLinksForUser(userId: string) {
    const keys = await getKeysByUserId(userId);
    if (!keys.length) return [];
    const links: RedirectLink[] = [];
    for (const key of keys) {
        const snapshot = await linksRef.child(key).get();
        links.push(snapshot.val() as RedirectLink);
    }
    return links.sort((a, b) => b.createdAt - a.createdAt);
}

export async function updateUrl(slug: string, url: string) {
    const key = await getKeyBySlug(slug);
    if (!key) {
        throw new Error("Link not found");
    }
    await linksRef.child(key).update({ url });
}

export async function updateSlug(slug: string, newSlug: string) {
    if (!(await checkUniqueSlug(newSlug))) {
        throw new Error("Slug is not unique");
    }
    const key = await getKeyBySlug(slug);
    if (!key) {
        throw new Error("Link not found");
    }
    await linksRef.child(key).update({ slug: newSlug });
}

export async function deleteLink(slug: string) {
    const key = await getKeyBySlug(slug);
    if (!key) {
        throw new Error("Link not found");
    }
    await deleteClicks(slug);
    await linksRef.child(key).remove();
}

export async function updateLoadingScreen(
    slug: string,
    loadingScreen: boolean
) {
    const key = await getKeyBySlug(slug);
    if (!key) throw new Error("Link not found");
    await linksRef.child(key).update({ loadingScreen });
}

export async function linkLimitReached(userId: string) {
    const links = await getLinksForUser(userId);
    return links.length >= 40;
}
