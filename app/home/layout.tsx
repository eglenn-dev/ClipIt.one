import HomeHeader from "@/components/home-header";
import SidePanel from "@/components/side-panel";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
