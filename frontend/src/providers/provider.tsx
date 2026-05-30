import { AppLayout } from "@/components/layout/app-layout"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/providers/theme-provider"
import type { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <TooltipProvider>
                    <BrowserRouter>
                        <AppLayout>{children}</AppLayout>
                    </BrowserRouter>
                </TooltipProvider>
            </SidebarProvider>
        </ThemeProvider>
    )
}
