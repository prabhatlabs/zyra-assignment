import { create } from "zustand"
import { toast } from "sonner"
import type { Student, Task, Message } from "@zyra-ass/shared"
import { fetcher, FetchError } from "@/lib/fetcher"

interface DashboardState {
    students: Student[]
    allTasks: Task[]
    allMessages: Message[]
    loading: boolean
    error: string | null
    refreshing: boolean

    fetch: () => Promise<void>
    refresh: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
    students: [],
    allTasks: [],
    allMessages: [],
    loading: false,
    error: null,
    refreshing: false,

    fetch: async () => {
        set({ loading: true, error: null })
        try {
            const [students, allTasks, allMessages] = await Promise.all([
                fetcher<Student[]>("/students"),
                fetcher<Task[]>("/tasks"),
                fetcher<Message[]>("/messages"),
            ])
            set({ students, allTasks, allMessages, loading: false })
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
            const [students, allTasks, allMessages] = await Promise.all([
                fetcher<Student[]>("/students"),
                fetcher<Task[]>("/tasks"),
                fetcher<Message[]>("/messages"),
            ])
            set({ students, allTasks, allMessages, refreshing: false })
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
