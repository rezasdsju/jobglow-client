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
    Bookmark,
    BriefcaseBusiness,
    Building2,
    CalendarClock,
    ChartColumn,
    FileText,
    LayoutDashboard,
    PlusCircle,
    Search,
    Settings,
    UserCog,
    UserRound,
    Users,
} from "lucide-react"
import Link from "next/link"



const menuItemsByRole = {
    seeker: [
        { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { name: "Browse Jobs", url: "/browse-jobs", icon: Search },
        { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
        { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
        { name: "Interviews", url: "/dashboard/seeker/interviews", icon: CalendarClock },
        { name: "Profile", url: "/dashboard/seeker/profile", icon: UserRound },
        { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    recruiter: [
        { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { name: "Post a Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
        { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
        { name: "Candidates", url: "/dashboard/recruiter/candidates", icon: Users },
        { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
        { name: "Company Profile", url: "/dashboard/recruiter/company", icon: Building2 },
        { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
    ],
    admin: [
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Users", url: "/dashboard/admin/users", icon: Users },
        { name: "Recruiters", url: "/dashboard/admin/recruiters", icon: UserCog },
        { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
        { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
        { name: "Reports", url: "/dashboard/admin/reports", icon: ChartColumn },
        { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],
}


export function DashboardSideBar() {
    const { data: session, isPending } = authClient.useSession()
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