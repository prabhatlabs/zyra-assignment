import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { useActionCenterStore } from "@/store/action-center-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TaskCard } from "@/components/task-card"
import { MessageList } from "@/components/message-list"
import { TaskFormDialog } from "@/components/task-form-dialog"
import { MessageFormDialog } from "@/components/message-form-dialog"
import type { Priority } from "@zyra-ass/shared"

export function StudentDetailPage() {
    const { id } = useParams<{ id: string }>()
    const student = useActionCenterStore((s) => s.student)
    const tasks = useActionCenterStore((s) => s.tasks)
    const messages = useActionCenterStore((s) => s.messages)
    const loading = useActionCenterStore((s) => s.loading)
    const refreshing = useActionCenterStore((s) => s.refreshing)
    const error = useActionCenterStore((s) => s.error)
    const fetchStudent = useActionCenterStore((s) => s.fetchStudent)
    const fetchTasks = useActionCenterStore((s) => s.fetchTasks)
    const fetchMessages = useActionCenterStore((s) => s.fetchMessages)
    const refreshAll = useActionCenterStore((s) => s.refreshAll)
    const deleteTask = useActionCenterStore((s) => s.deleteTask)

    const [taskDialogOpen, setTaskDialogOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<{
        id: string
        title: string
        description: string
        priority: Priority
        dueDate: string
    } | null>(null)
    const [messageDialogOpen, setMessageDialogOpen] = useState(false)

    useEffect(() => {
        if (!id) return
        fetchStudent(id)
        fetchTasks(id)
        fetchMessages(id)
    }, [id, fetchStudent, fetchTasks, fetchMessages])

    if (!id) return null

    const unreadCount = messages.filter((m) => !m.read).length

    const handleEditTask = (task: {
        id: string
        title: string
        description: string
        priority: Priority
        dueDate: string
    }) => {
        setEditingTask(task)
        setTaskDialogOpen(true)
    }

    const handleDeleteTask = (taskId: string) => {
        deleteTask(taskId)
    }

    return (
        <div className="p-4 md:p-6">
            <div className="mb-4 flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/">
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    {loading ? (
                        <Skeleton className="h-6 w-40" />
                    ) : (
                        <h1 className="text-xl font-semibold tracking-tight">
                            {student?.name ?? "Student"}
                        </h1>
                    )}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refreshAll(id)}
                    disabled={refreshing}
                >
                    <RefreshCw
                        className={
                            refreshing ? "animate-spin" : ""
                        }
                    />
                    Refresh
                </Button>
            </div>

            {error && !loading ? (
                <div className="flex flex-col items-center gap-4 py-16">
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            fetchStudent(id)
                            fetchTasks(id)
                            fetchMessages(id)
                        }}
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    <aside className="space-y-4">
                        {loading ? (
                            <>
                                <Skeleton className="h-40 rounded-xl" />
                                <Skeleton className="h-24 rounded-xl" />
                            </>
                        ) : student ? (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {student.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-1.5 text-sm">
                                        <p className="text-muted-foreground">
                                            {student.email}
                                        </p>
                                        <p>
                                            Grade {student.grade} &middot; GPA:{" "}
                                            {student.gpa}
                                        </p>
                                        <Badge
                                            variant={
                                                student.enrollmentStatus ===
                                                "at_risk"
                                                    ? "destructive"
                                                    : "secondary"
                                            }
                                        >
                                            {student.enrollmentStatus ===
                                            "at_risk"
                                                ? "At Risk"
                                                : "Active"}
                                        </Badge>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-medium">
                                            Messages
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-semibold">
                                            {unreadCount}
                                            <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                unread
                                            </span>
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 w-full"
                                            onClick={() =>
                                                setMessageDialogOpen(true)
                                            }
                                        >
                                            Send Message
                                        </Button>
                                    </CardContent>
                                </Card>
                            </>
                        ) : null}
                    </aside>

                    <section className="space-y-6">
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-sm font-medium text-muted-foreground">
                                    {loading
                                        ? "Tasks"
                                        : `Tasks (${tasks.length})`}
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setEditingTask(null)
                                        setTaskDialogOpen(true)
                                    }}
                                >
                                    Add Task
                                </Button>
                            </div>

                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <Skeleton
                                            key={i}
                                            className="h-28 w-full rounded-xl"
                                        />
                                    ))}
                                </div>
                            ) : tasks.length === 0 ? (
                                <Card>
                                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                                        No tasks assigned yet
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="space-y-3">
                                    {tasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={() =>
                                                handleEditTask(task)
                                            }
                                            onDelete={() =>
                                                handleDeleteTask(task.id)
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-sm font-medium text-muted-foreground">
                                    {loading
                                        ? "Messages"
                                        : `Messages (${messages.length})`}
                                </h2>
                            </div>

                            <MessageList
                                messages={messages}
                                loading={loading}
                            />
                        </div>
                    </section>
                </div>
            )}

            {id && (
                <>
                    <TaskFormDialog
                        open={taskDialogOpen}
                        onOpenChange={setTaskDialogOpen}
                        studentId={id}
                        editTask={editingTask}
                        onClose={() => setEditingTask(null)}
                    />
                    <MessageFormDialog
                        open={messageDialogOpen}
                        onOpenChange={setMessageDialogOpen}
                        studentId={id}
                    />
                </>
            )}
        </div>
    )
}
