import { Toaster } from "@/components/ui/sonner"
import { type ReactNode } from "react"
import Navbar from "../navbar"

interface AppLayoutProps {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-dvh w-screen flex-col">
            <Navbar />
            <main className="flex-1 overflow-auto p-6 pt-4 max-w-7xl w-full mx-auto">
                {children}
            </main>

            <Toaster />
        </div>
    )
}
