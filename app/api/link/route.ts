"use server";
import { createLink, linkLimitReached } from "@/models/links-model";
import { validateApiKey, getUserIdForKey } from "@/models/api-key-model";

export async function GET() {
    return new Response("I am a teapot", { status: 418 });
}

export async function POST(request: Request) {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response("Authorization header is missing or invalid", {
            status: 401,
        });
    }

    const apiKey = authHeader.substring("Bearer ".length);
    const { url } = await request.json();

    if (!url) {
        return new Response("URL is required", { status: 400 });
    }

    const isValidKey = await validateApiKey(apiKey);
    if (!isValidKey) {
        return new Response("Invalid API key", { status: 401 });
    }

    const userId = await getUserIdForKey(apiKey);
    if (!userId) {
        return new Response("User ID not found", { status: 500 });
    }

    const isLimitReached = await linkLimitReached(userId);
    if (isLimitReached) {
        return new Response("Link limit reached", { status: 403 });
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return new Response("Invalid URL", { status: 400 });
    }
    if (url.length > 2000) {
        return new Response("URL is too long", { status: 400 });
    }
    if (url.includes(" ")) {
        return new Response("URL contains spaces", { status: 400 });
    }
    if (url.includes("javascript:")) {
        return new Response("URL contains javascript", { status: 400 });
    }
    if (url.includes("data:")) {
        return new Response("URL contains data", { status: 400 });
    }
    if (url.includes("mailto:")) {
        return new Response("URL contains mailto", { status: 400 });
    }
    if (url.includes("tel:")) {
        return new Response("URL contains tel", { status: 400 });
    }
    if (url.includes("file:")) {
        return new Response("URL contains file", { status: 400 });
    }

    try {
        const urlTest = new URL(url);
        const link = await createLink(urlTest.href, userId);
        const payload = {
            destinationUrl: urlTest.href,
            linkSlug: link,
            fullUrl: `https://clipit.one/${link}`,
            status: "success",
            message: "Link created successfully",
        };

        return new Response(JSON.stringify(payload), { status: 200 });
    } catch (error) {
        console.error("Error creating link:", error);
        return new Response("Invalid URL", { status: 400 });
    }
}
