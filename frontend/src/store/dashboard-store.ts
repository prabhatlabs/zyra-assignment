import { create } from "zustand"
import { toast } from "sonner"
import type { Student, DashboardSummary } from "@zyra-ass/shared"
import { fetcher, FetchError } from "@/lib/fetcher"

interface DashboardState {
    summary: DashboardSummary | null
    students: Student[]
    loading: boolean
    error: string | null
    refreshing: boolean

    fetch: () => Promise<void>
    refresh: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
    summary: null,
    students: [],
    loading: false,
    error: null,
    refreshing: false,

    fetch: async () => {
        set({ loading: true, error: null })
        try {
            const [summary, students] = await Promise.all([
                fetcher<DashboardSummary>("/dashboard/summary"),
                fetcher<Student[]>("/students"),
            ])
            set({ summary, students, loading: false })
        } catch (err) {
            const message =
                err instanceof FetchError
                    ? err.data?.error || err.message
                    : "Failed to load dashboard"
            set({ error: message, loading: false })
            toast.error(message)
        }
    },

    refresh: async () => {
        set({ refreshing: true, error: null })
        try {
            const [summary, students] = await Promise.all([
                fetcher<DashboardSummary>("/dashboard/summary"),
                fetcher<Student[]>("/students"),
            ])
            set({ summary, students, refreshing: false })
            toast.success("Dashboard refreshed")
        } catch (err) {
            const message =
                err instanceof FetchError
                    ? err.data?.error || err.message
                    : "Failed to refresh"
            set({ error: message, refreshing: false })
            toast.error(message)
        }
    },
}))
