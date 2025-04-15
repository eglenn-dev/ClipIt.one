import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CreateQrCode from "./create-qr";

export default async function CreateQrPage() {
    const session = await getSession();
    if (!session) redirect("/login");
    return <CreateQrCode />;
}
