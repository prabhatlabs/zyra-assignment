import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/providers/theme-provider"
import type { ReactNode } from "react"

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </SidebarProvider>
        </ThemeProvider>
    )
}
