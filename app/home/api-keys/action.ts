"use server";
import { getSession } from "@/lib/session";
import { getApiKey, createApiKey, deleteApiKey } from "@/models/api-key-model";

export async function createApiKeyAction(note: string) {
    const session = await getSession();
    if (!session) return null;
    const userId = session.user.userId;
    return await createApiKey(userId, note);
}

export async function deleteApiKeyAction(key: string) {
    const session = await getSession();
    if (!session) return null;
    const userId = session.user.userId;
    const apiKey = await getApiKey(key);
    if (!apiKey) return null;
    if (apiKey.userId !== userId) return null;
    console.log("Deleting API key:", key);
    return await deleteApiKey(key);
}
