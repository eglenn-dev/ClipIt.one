import admin from "firebase-admin";
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
const apiKeysRef = db.ref("apiKeys");

interface ApiKey {
    key: string;
    createdAt: number;
    userId: string;
    note?: string;
}

export async function createApiKey(userId: string, note?: string) {
    const newKey = apiKeysRef.push();
    const key = newKey.key;
    await newKey.set({
        key,
        createdAt: Date.now(),
        userId,
        note: note || "",
    });
    return key;
}

export async function getApiKey(key: string) {
    const snapshot = await apiKeysRef.orderByChild("key").equalTo(key).get();
    if (snapshot.exists()) {
        const apiKey = snapshot.val()[Object.keys(snapshot.val())[0]] as ApiKey;
        return apiKey;
    } else {
        return null;
    }
}

export async function getApiKeys(userId: string) {
    const snapshot = await apiKeysRef
        .orderByChild("userId")
        .equalTo(userId)
        .get();
    if (snapshot.exists()) {
        const apiKeys: ApiKey[] = [];
        const objectKeys = Object.keys(snapshot.val());
        for (const objectKey of objectKeys) {
            const apiKey = snapshot.val()[objectKey] as ApiKey;
            apiKeys.push(apiKey);
        }
        return apiKeys;
    } else {
        return null;
    }
}

export async function validateApiKey(key: string) {
    const apiKey = await getApiKey(key);
    if (apiKey) {
        return true;
    } else {
        return false;
    }
}

export async function getUserIdForKey(key: string) {
    const apiKey = await getApiKey(key);
    if (apiKey) {
        return apiKey.userId;
    }
    return null;
}

export async function deleteApiKey(key: string) {
    const apiKey = await getApiKey(key);
    if (apiKey) {
        await apiKeysRef.child(apiKey.key).remove();
        return true;
    } else {
        return false;
    }
}
