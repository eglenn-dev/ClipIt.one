import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            disallow: "/",
            allow: ["/welcome", "/login", "/signup", "/about"],
        },
        sitemap: "https://clipit.one/sitemap.xml",
    };
}
