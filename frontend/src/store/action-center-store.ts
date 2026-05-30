import { create } from "zustand"
import { toast } from "sonner"
import type {
    Student,
    Task,
    TaskStatus,
    Message,
} from "@zyra-ass/shared"
import { fetcher, FetchError } from "@/lib/fetcher"

interface ActionCenterState {
    student: Student | null
    tasks: Task[]
    messages: Message[]
    loading: boolean
    error: string | null
    refreshing: boolean

    fetchStudent: (id: string) => Promise<void>
    fetchTasks: (studentId: string) => Promise<void>
    fetchMessages: (studentId: string) => Promise<void>
    refreshAll: (studentId: string) => Promise<void>

    updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>
    createTask: (data: {
        studentId: string
        title: string
        description: string
        priority: "urgent" | "high" | "medium" | "low"
        dueDate: string
    }) => Promise<void>
    updateTask: (taskId: string, data: Partial<Task>) => Promise<void>
    deleteTask: (taskId: string) => Promise<void>

    markMessageRead: (messageId: string) => Promise<void>
    createMessage: (data: {
        studentId: string
        from: string
        subject: string
        preview: string
    }) => Promise<void>
}

export const useActionCenterStore = create<ActionCenterState>(
    (set, get) => ({
        student: null,
        tasks: [],
        messages: [],
        loading: false,
        error: null,
        refreshing: false,

        fetchStudent: async (id) => {
            set({ loading: true, error: null })
            try {
                const student = await fetcher<Student>(
                    `/students/${id}`,
                )
                set({ student, loading: false })
            } catch (err) {
                const message =
                    err instanceof FetchError
                        ? err.data?.error || err.message
                        : "Student not found"
                set({ error: message, loading: false })
            }
        },

        fetchTasks: async (studentId) => {
            try {
                const tasks = await fetcher<Task[]>(
                    `/students/${studentId}/tasks`,
                )
                set({ tasks })
            } catch {
                // silently fail, tasks stay empty
            }
        },

        fetchMessages: async (studentId) => {
            try {
                const messages = await fetcher<Message[]>(
                    `/students/${studentId}/messages`,
                )
                set({ messages })
            } catch {
                // silently fail, messages stay empty
            }
        },

        refreshAll: async (studentId) => {
            set({ refreshing: true, error: null })
            try {
                const [student, tasks, messages] = await Promise.all([
                    fetcher<Student>(`/students/${studentId}`),
                    fetcher<Task[]>(`/students/${studentId}/tasks`),
                    fetcher<Message[]>(
                        `/students/${studentId}/messages`,
                    ),
                ])
                set({
                    student,
                    tasks,
                    messages,
                    refreshing: false,
                })
                toast.success("Refreshed")
            } catch (err) {
                const message =
                    err instanceof FetchError
                        ? err.data?.error || err.message
                        : "Failed to refresh"
                set({ error: message, refreshing: false })
                toast.error(message)
            }
        },

        updateTaskStatus: async (taskId, status) => {
            const prev = get().tasks
            set({
                tasks: prev.map((t) =>
                    t.id === taskId ? { ...t, status } : t,
                ),
            })
            try {
                await fetcher(`/tasks/${taskId}/status`, {
                    method: "PATCH",
                    body: JSON.stringify({ status }),
                })
                toast.success("Task status updated")
            } catch (err) {
                set({ tasks: prev })
                const message =
                    err instanceof FetchError
                        ? err.message
                        : "Failed to update task"
                toast.error(message)
            }
        },

        createTask: async (data) => {
            const prev = get().tasks
            try {
                const task = await fetcher<Task>("/tasks", {
                    method: "POST",
                    body: JSON.stringify({
                        ...data,
                        status: "todo",
                    }),
                })
                set({ tasks: [...prev, task] })
                toast.success("Task created")
            } catch (err) {
                const message =
                    err instanceof FetchError
                        ? err.message
                        : "Failed to create task"
                toast.error(message)
            }
        },

        updateTask: async (taskId, data) => {
            const prev = get().tasks
            set({
                tasks: prev.map((t) =>
                    t.id === taskId ? { ...t, ...data } : t,
                ),
            })
            try {
                await fetcher(`/tasks/${taskId}`, {
                    method: "PATCH",
                    body: JSON.stringify(data),
                })
                toast.success("Task updated")
            } catch (err) {
                set({ tasks: prev })
                const message =
                    err instanceof FetchError
                        ? err.message
                        : "Failed to update task"
                toast.error(message)
            }
        },

        deleteTask: async (taskId) => {
            const prev = get().tasks
            set({ tasks: prev.filter((t) => t.id !== taskId) })
            try {
                await fetcher(`/tasks/${taskId}`, {
                    method: "DELETE",
                })
                toast.success("Task deleted")
            } catch (err) {
                set({ tasks: prev })
                const message =
                    err instanceof FetchError
                        ? err.message
                        : "Failed to delete task"
                toast.error(message)
            }
        },

        markMessageRead: async (messageId) => {
            const prev = get().messages
            set({
                messages: prev.map((m) =>
                    m.id === messageId ? { ...m, read: true } : m,
                ),
            })
            try {
                await fetcher(`/messages/${messageId}`, {
                    method: "PATCH",
                    body: JSON.stringify({ read: true }),
                })
            } catch (err) {
                set({ messages: prev })
                const message =
                    err instanceof FetchError
                        ? err.message
                        : "Failed to mark as read"
                toast.error(message)
            }
        },

        createMessage: async (data) => {
            const prev = get().messages
            try {
                const message = await fetcher<Message>("/messages", {
                    method: "POST",
                    body: JSON.stringify({
                        ...data,
                        read: false,
                        receivedAt: new Date().toISOString(),
                    }),
                })
                set({ messages: [...prev, message] })
                toast.success("Message sent")
            } catch (err) {
                const message =
                    err instanceof FetchError
                        ? err.message
                        : "Failed to send message"
                toast.error(message)
            }
        },
    }),
)
