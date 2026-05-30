import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useDashboardStore } from "@/store/dashboard-store"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function StudentsPage() {
    const fetch = useDashboardStore((s) => s.fetch)
    const students = useDashboardStore((s) => s.students)
    const loading = useDashboardStore((s) => s.loading)
    const error = useDashboardStore((s) => s.error)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch()
    }, [fetch])

    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()),
    )

    return (
        <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">
                        Students
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        View and manage all students
                    </p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-8 rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                    />
                </div>
            </div>

            {error && !loading ? (
                <div className="flex flex-col items-center gap-4 py-16">
                    <p className="text-sm text-muted-foreground">{error}</p>
                    <Button variant="outline" onClick={fetch}>
                        Retry
                    </Button>
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {loading
                        ? [1, 2, 3, 4, 5, 6].map((i) => (
                              <Skeleton
                                  key={i}
                                  className="h-32 rounded-xl"
                              />
                          ))
                        : filtered.map((student) => (
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
            )}

            {!loading && filtered.length === 0 && (
                <p className="py-16 text-center text-sm text-muted-foreground">
                    {search
                        ? "No students match your search"
                        : "No students found"}
                </p>
            )}
        </div>
    )
}
