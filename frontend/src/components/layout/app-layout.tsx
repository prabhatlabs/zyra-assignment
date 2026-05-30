import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { type ReactNode } from "react"

interface AppLayoutProps {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-dvh w-screen">
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
                        <div className="flex items-center gap-2 px-4 py-3">
                            <SidebarTrigger />
                            <span className="text-sm font-semibold">Zyra</span>
                        </div>
                    </nav>

                    <main className="flex-1 overflow-auto p-6 pt-4 w-full">
                        {children}
                    </main>

                    <Toaster />
                </div>
            </SidebarInset>
        </div>
    )
}
