import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/store/theme-store"

export function ThemeToggle() {
    const theme = useThemeStore((s) => s.theme)
    const toggle = useThemeStore((s) => s.toggle)

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
        >
            {theme === "light" ? <Moon /> : <Sun />}
        </Button>
    )
}
