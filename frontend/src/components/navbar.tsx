import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useDashboardStore } from "@/store/dashboard-store"
import { RefreshCw } from "lucide-react"

export default function Navbar() {
    const refreshing = useDashboardStore((s) => s.refreshing)
    const refresh = useDashboardStore((s) => s.refresh)

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-3 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="p-1">
                        <div className="size-5 shrink-0 rounded bg-primary" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight">
                        Zyra
                    </span>
                </div>
                <div className="ml-auto flex items-center gap-1">
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
            </div>
        </nav>
    )
}
