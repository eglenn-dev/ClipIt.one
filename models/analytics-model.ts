import admin from "firebase-admin";
import { getKeyBySlug, getKeysByUserId } from "./links-model";

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
const analyticsRef = db.ref("analytics");

export async function logClick(slug: string) {
    const key = await getKeyBySlug(slug);
    if (!key) return;
    const newClick = analyticsRef.child(key).push();
    await newClick.set({
        timestamp: Date.now(),
    });
    return;
}

export async function getClicks(slug: string) {
    const key = await getKeyBySlug(slug);
    if (!key) return 0;
    const snapshot = await analyticsRef.child(key).get();
    return snapshot.numChildren();
}

export async function getClicksForUser(userId: string) {
    const keys = await getKeysByUserId(userId);
    if (!keys.length) return 0;
    let clicks = 0;
    for (const key of keys) {
        const snapshot = await analyticsRef.child(key).get();
        clicks += snapshot.numChildren();
    }
    return clicks;
}

export async function getClicksBySlugForUser(userId: string) {
    const keys = await getKeysByUserId(userId);

    if (!keys.length) return {};
    const clicks: { [key: string]: number } = {};
    for (const key of keys) {
        const snapshot = await analyticsRef.child(key).get();
        clicks[key] = snapshot.numChildren();
    }
    return clicks as { [key: string]: number };
}
