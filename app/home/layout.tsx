import HomeHeader from "@/components/home-header";
import SidePanel from "@/components/side-panel";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Dashboard | ClipIt.one",
};

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    if (!session) redirect("/login");
    return (
        <div className="flex min-h-screen flex-col">
            <HomeHeader />
            <div className="flex flex-1">
                <SidePanel />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
