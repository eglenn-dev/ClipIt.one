import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getApiKeys } from "@/models/api-key-model";
import APIPage from "./api-page";

interface ApiKey {
    key: string;
    createdAt: number;
    userId: string;
    note?: string;
}

export const metadata = {
    title: "API Keys | ClipIt.one",
};

export default async function Page() {
    const session = await getSession();
    if (!session) redirect("/login");
    const apiKeys: ApiKey[] | null = await getApiKeys(session.user.userId);

    return <APIPage apiKeys={apiKeys} />;
}
