import admin from "firebase-admin";
import { validateUserKey } from "./accounts-model";

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

interface Link {
    url: string;
    slug: string;
    userId: string;
    createdAt: number;
}

export async function createLink(url: string, userId: string, slug?: string) {
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
        throw new Error("Link not found");
    }
    return snapshot.val() as Link;
}
