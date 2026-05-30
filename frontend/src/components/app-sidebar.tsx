import { useLocation, NavLink } from "react-router-dom"
import { LayoutDashboard, Users, RefreshCw } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useDashboardStore } from "@/store/dashboard-store"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"

const navItems: { to: string; icon: LucideIcon; label: string }[] = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/students", icon: Users, label: "Students" },
]

function NavItem({ to, icon: Icon, label }: { to: string; icon: LucideIcon; label: string }) {
    const location = useLocation()
    const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to)

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
                <NavLink to={to}>
                    <Icon className="size-4" />
                    <span>{label}</span>
                </NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export function AppSidebar() {
    const refreshing = useDashboardStore((s) => s.refreshing)
    const refresh = useDashboardStore((s) => s.refresh)

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-1">
                    <div className="size-2 shrink-0 rounded-full bg-primary" />
                    <span className="truncate text-sm font-semibold tracking-tight group-data-[state=collapsed]/sidebar:hidden">
                        Zyra
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map((item) => (
                            <NavItem key={item.to} {...item} />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={refresh}
                        disabled={refreshing}
                        aria-label="Refresh"
                    >
                        <RefreshCw
                            className={refreshing ? "animate-spin" : ""}
                        />
                    </Button>
                    <ThemeToggle />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
