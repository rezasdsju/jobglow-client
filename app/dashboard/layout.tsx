

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSideBar } from "../components/DashboardSideBar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;



