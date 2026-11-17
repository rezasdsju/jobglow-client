'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import {
    BriefcaseBusiness,
    FileText,
    LayoutDashboard,
    PlusCircle,
    Search,
    Users,
} from "lucide-react"
import Link from "next/link"



const menuItemsByRole = {
    seeker: [
        { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { name: "Browse Jobs", url: "/browse-jobs", icon: Search },
        { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    ],
    recruiter: [
        { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { name: "Post a Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
        { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
    ],
    admin: [
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Users", url: "/dashboard/admin/users", icon: Users },
    ],
}


export function DashboardSideBar() {
    const { data: session } = authClient.useSession()
    const role = session?.user?.role || 'seeker'
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role].map((item) => (
                            <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton render={<Link href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}