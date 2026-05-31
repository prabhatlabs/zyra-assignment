import { MessageFormDialog } from "@/components/message-form-dialog"
import { MessageList } from "@/components/message-list"
import { TaskCard } from "@/components/task-card"
import { TaskFormDialog } from "@/components/task-form-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useActionCenterStore } from "@/store/action-center-store"
import type { Priority } from "@zyra-ass/shared"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

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
    const [activeTab, setActiveTab] = useState<"tasks" | "messages">("tasks")

    useEffect(() => {
        if (!id) return
        fetchStudent(id)
        fetchTasks(id)
        fetchMessages(id)
    }, [id, fetchStudent, fetchTasks, fetchMessages])

    if (!id) return null

    const unreadCount = messages.filter((m) => !m.read).length
    const overdueCount = tasks.filter(
        (t) => t.dueDate && new Date(t.dueDate) < new Date(),
    ).length

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
        <div className="flex flex-col">
            <div className="sticky top-0 z-10 mb-8 flex items-center gap-3 bg-background">
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
                    <RefreshCw className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </Button>

                <div className="absolute w-full left-1/2 -translate-x-1/2 bg-background h-40 mask-b-from-60% -z-10 pointer-events-none"></div>
            </div>

            {error && !loading ? (
                <div className="flex flex-1 flex-col items-center gap-4 py-16">
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
                <div className="min-h-0 flex-1">
                    <div className="grid h-full min-h-0 gap-6 lg:grid-cols-[280px_1fr]">
                        <aside className="lg:sticky top-0 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
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
                                                Grade {student.grade} &middot;
                                                GPA: {student.gpa}
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
                                                Tasks
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-3xl font-semibold">
                                                {tasks.length}
                                                <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                    total
                                                </span>
                                            </p>
                                            {overdueCount > 0 && (
                                                <p className="mt-1 text-xs text-destructive">
                                                    {overdueCount} overdue
                                                </p>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mt-3 w-full"
                                                onClick={() => {
                                                    setActiveTab("tasks")
                                                }}
                                            >
                                                View Tasks
                                            </Button>
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
                                            {messages.length > 0 && (
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {messages.length} message{messages.length !== 1 && "s"}
                                                </p>
                                            )}
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

                        <section className="flex flex-col">
                            <div className="mb-4 flex items-center gap-1 border-b">
                                <button
                                    onClick={() => setActiveTab("tasks")}
                                    data-active={activeTab === "tasks"}
                                    className="px-3 py-2 text-sm font-medium text-muted-foreground data-[active=true]:border-b-2 data-[active=true]:border-primary data-[active=true]:text-foreground"
                                >
                                    Tasks ({tasks.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab("messages")}
                                    data-active={activeTab === "messages"}
                                    className="px-3 py-2 text-sm font-medium text-muted-foreground data-[active=true]:border-b-2 data-[active=true]:border-primary data-[active=true]:text-foreground"
                                >
                                    Messages ({messages.length})
                                </button>
                                <div className="ml-auto flex items-center gap-2">
                                    {activeTab === "tasks" && (
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
                                    )}
                                    {activeTab === "messages" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setMessageDialogOpen(true)
                                            }
                                        >
                                            Send Message
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div>
                                {loading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <Skeleton
                                                key={i}
                                                className="h-28 w-full rounded-xl"
                                            />
                                        ))}
                                    </div>
                                ) : activeTab === "tasks" ? (
                                    tasks.length === 0 ? (
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
                                                        handleDeleteTask(
                                                            task.id,
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    <MessageList
                                        messages={messages}
                                        loading={loading}
                                    />
                                )}
                            </div>
                        </section>
                    </div>
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
