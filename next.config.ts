import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/welcome",
                destination: "/",
            },
        ];
    },
};

export default nextConfig;
