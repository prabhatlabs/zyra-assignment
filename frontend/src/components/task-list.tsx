import type { Task } from "@zyra-ass/shared"
import { TaskCard } from "@/components/task-card"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    tasks: Task[]
    loading: boolean
}

export function TaskList({ tasks, loading }: Props) {
    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-28 w-full rounded-xl" />
                ))}
            </div>
        )
    }

    if (tasks.length === 0) {
        return (
            <p className="text-sm text-muted-foreground text-center py-8">
                No tasks assigned
            </p>
        )
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}
