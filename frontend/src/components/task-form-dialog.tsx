import { useState, useEffect } from "react"
import { Dialog } from "radix-ui"
import { Button } from "@/components/ui/button"
import { useActionCenterStore } from "@/store/action-center-store"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    studentId: string
    editTask: {
        id: string
        title: string
        description: string
        priority: "urgent" | "high" | "medium" | "low"
        dueDate: string
    } | null
    onClose: () => void
}

export function TaskFormDialog({
    open,
    onOpenChange,
    studentId,
    editTask,
    onClose,
}: Props) {
    const createTask = useActionCenterStore((s) => s.createTask)
    const updateTask = useActionCenterStore((s) => s.updateTask)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState<
        "urgent" | "high" | "medium" | "low"
    >("medium")
    const [dueDate, setDueDate] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title)
            setDescription(editTask.description)
            setPriority(editTask.priority)
            setDueDate(editTask.dueDate)
        } else {
            setTitle("")
            setDescription("")
            setPriority("medium")
            setDueDate("")
        }
    }, [editTask, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !dueDate) return
        setSaving(true)

        if (editTask) {
            await updateTask(editTask.id, {
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate,
            })
        } else {
            await createTask({
                studentId,
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate,
            })
        }

        setSaving(false)
        onClose()
        onOpenChange(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
                <Dialog.Content
                    onInteractOutside={(e) => e.preventDefault()}
                    className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 shadow-lg"
                >
                    <div>
                        <Dialog.Title className="text-lg font-semibold">
                            {editTask ? "Edit Task" : "New Task"}
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                            {editTask
                                ? "Update the task details"
                                : "Create a new task for this student"}
                        </Dialog.Description>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                                placeholder="Task title"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                                placeholder="Optional description"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">
                                    Priority
                                </label>
                                <select
                                    value={priority}
                                    onChange={(e) =>
                                        setPriority(
                                            e.target.value as
                                                | "urgent"
                                                | "high"
                                                | "medium"
                                                | "low",
                                        )
                                    }
                                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                                >
                                    <option value="urgent">Urgent</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    onClose()
                                    onOpenChange(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving || !title.trim() || !dueDate}
                            >
                                {saving
                                    ? "Saving..."
                                    : editTask
                                      ? "Update"
                                      : "Create"}
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
