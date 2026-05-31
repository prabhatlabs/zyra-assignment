import { useState } from "react"
import type { Task, TaskStatus } from "@zyra-ass/shared"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useActionCenterStore } from "@/store/action-center-store"

interface Props {
    task: Task
    onEdit?: () => void
    onDelete?: () => void
}

const priorityLabel: Record<string, string> = {
    urgent: "Urgent",
    high: "High",
    medium: "Medium",
    low: "Low",
}

const statusLabel: Record<TaskStatus, string> = {
    todo: "Todo",
    in_progress: "In Progress",
    completed: "Completed",
}

const statusCycle: TaskStatus[] = ["todo", "in_progress", "completed"]

export function TaskCard({ task, onEdit, onDelete }: Props) {
    const updateTaskStatus = useActionCenterStore((s) => s.updateTaskStatus)
    const [updating, setUpdating] = useState(false)

    const handleCycle = async () => {
        const idx = statusCycle.indexOf(task.status)
        const next = statusCycle[(idx + 1) % statusCycle.length]
        setUpdating(true)
        await updateTaskStatus(task.id, next)
        setUpdating(false)
    }

    return (
        <Card size="sm">
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="truncate">{task.title}</CardTitle>
                    <Badge
                        variant={
                            task.priority as
                                | "urgent"
                                | "high"
                                | "medium"
                                | "low"
                        }
                    >
                        {priorityLabel[task.priority]}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                {task.description && (
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        {task.description}
                    </p>
                )}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                        Due {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
                        {onEdit && (
                            <Button variant="ghost" size="xs" onClick={onEdit}>
                                Edit
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="ghost"
                                size="xs"
                                onClick={onDelete}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="xs"
                            disabled={updating}
                            onClick={handleCycle}
                        >
                            {statusLabel[task.status]}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
