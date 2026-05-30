import { useEffect } from "react"
import { Link } from "react-router-dom"
import { AlertTriangle, BookOpen, Mail, Users } from "lucide-react"
import { useDashboardStore } from "@/store/dashboard-store"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function DashboardPage() {
    const fetch = useDashboardStore((s) => s.fetch)
    const students = useDashboardStore((s) => s.students)
    const allTasks = useDashboardStore((s) => s.allTasks)
    const allMessages = useDashboardStore((s) => s.allMessages)
    const loading = useDashboardStore((s) => s.loading)
    const error = useDashboardStore((s) => s.error)

    useEffect(() => {
        fetch()
    }, [fetch])

    const atRiskCount = students.filter(
        (s) => s.enrollmentStatus === "at_risk",
    ).length
    const pendingTasks = allTasks.filter(
        (t) => t.status !== "completed",
    ).length
    const unreadMessages = allMessages.filter((m) => !m.read).length

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-semibold tracking-tight">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Overview of your students and action items
                </p>
            </div>

            {error && !loading ? (
                <div className="flex flex-col items-center gap-4 py-16">
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <Button variant="outline" onClick={fetch}>
                        Retry
                    </Button>
                </div>
            ) : (
                <>
                    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Users className="size-4" />
                                    Total Students
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-8 w-12" />
                                ) : (
                                    <p className="text-3xl font-semibold">
                                        {students.length}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <AlertTriangle className="size-4" />
                                    At Risk
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-8 w-12" />
                                ) : (
                                    <p className="text-3xl font-semibold text-destructive">
                                        {atRiskCount}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <BookOpen className="size-4" />
                                    Pending Tasks
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-8 w-12" />
                                ) : (
                                    <p className="text-3xl font-semibold">
                                        {pendingTasks}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Mail className="size-4" />
                                    Unread Messages
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-8 w-12" />
                                ) : (
                                    <p className="text-3xl font-semibold">
                                        {unreadMessages}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-medium text-muted-foreground">
                            {loading
                                ? "Students"
                                : `All Students (${students.length})`}
                        </h2>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {loading
                            ? [1, 2, 3].map((i) => (
                                  <Skeleton
                                      key={i}
                                      className="h-32 rounded-xl"
                                  />
                              ))
                            : students.map((student) => (
                                  <Link
                                      key={student.id}
                                      to={`/students/${student.id}`}
                                      className="block"
                                  >
                                      <Card className="transition-colors hover:bg-muted/50">
                                          <CardHeader>
                                              <div className="flex items-start justify-between gap-2">
                                                  <CardTitle className="truncate">
                                                      {student.name}
                                                  </CardTitle>
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
                                              </div>
                                          </CardHeader>
                                          <CardContent className="space-y-1 text-sm text-muted-foreground">
                                              <p>{student.email}</p>
                                              <p>
                                                  Grade {student.grade} &middot;{" "}
                                                  GPA: {student.gpa}
                                              </p>
                                          </CardContent>
                                      </Card>
                                  </Link>
                              ))}
                    </div>
                </>
            )}
        </div>
    )
}
