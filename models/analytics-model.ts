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

interface LinkClickDate {
    date: string;
    clicks: number;
}

interface LinkAnalytics {
    [key: string]: {
        timestamp: string;
    };
}

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

export async function deleteClicks(slug: string) {
    const key = await getKeyBySlug(slug);
    if (!key) return;
    await analyticsRef.child(key).remove();
    return;
}

export async function getLastClickTime(slug: string) {
    const key = await getKeyBySlug(slug);
    if (!key) return undefined;
    const snapshot = await analyticsRef.child(key).get();
    if (!snapshot.exists()) return 0;
    const clicks = Object.values(snapshot.val()) as { timestamp: number }[];
    return clicks[clicks.length - 1].timestamp;
}

export async function getLastClickedSlugKey(userId: string) {
    const keys = await getKeysByUserId(userId);
    if (!keys.length) return undefined;
    let lastClickedSlugKey: string | undefined = undefined;
    let lastClickedTime: number | undefined = undefined;
    for (const key of keys) {
        const snapshot = await analyticsRef.child(key).get();
        if (!snapshot.exists()) continue;
        const clicks = Object.values(snapshot.val()) as { timestamp: number }[];
        const lastClickTime = clicks[clicks.length - 1].timestamp;
        if (!lastClickedTime || lastClickTime > lastClickedTime) {
            lastClickedTime = lastClickTime;
            lastClickedSlugKey = key;
        }
    }
    return lastClickedSlugKey;
}

export async function getClicksWithDates(slug: string) {
    const key = await getKeyBySlug(slug);
    if (!key) return [{ date: "00/00/0000", clicks: 0 }] as LinkClickDate[];
    const snapshot = await analyticsRef.child(key).get();
    if (!snapshot.exists())
        return [{ date: "00/00/0000", clicks: 0 }] as LinkClickDate[];

    const clicks: LinkAnalytics = snapshot.val() || {};
    const clickValues = Object.values(clicks);

    if (clickValues.length === 0) {
        const today = new Date();
        const formattedToday = today.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
        });
        return [{ date: formattedToday, clicks: 0 }];
    }

    const dateMap: { [key: string]: number } = {};

    let minTimestamp = Infinity;
    clickValues.forEach((click) => {
        const timestamp = new Date(click.timestamp).getTime();
        if (timestamp < minTimestamp) {
            minTimestamp = timestamp;
        }
    });

    const startDate = new Date(minTimestamp);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const formattedDate = currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
        });
        dateMap[formattedDate] = 0;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    for (const click of clickValues) {
        const date = new Date(click.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
        });
        dateMap[date]++;
    }

    const clicksWithDates: LinkClickDate[] = Object.entries(dateMap).map(
        ([date, clicks]) => ({
            date,
            clicks,
        })
    );

    clicksWithDates.sort((a, b) => {
        const year = new Date().getFullYear();
        return (
            new Date(`${a.date} ${year}`).getTime() -
            new Date(`${b.date} ${year}`).getTime()
        );
    });

    return clicksWithDates;
}
