"use server";
import { createLink } from "@/models/links-model";
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
