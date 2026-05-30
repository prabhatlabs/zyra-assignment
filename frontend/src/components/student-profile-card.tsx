import type { Student } from "@zyra-ass/shared"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    student: Student | null
    loading: boolean
}

export function StudentProfileCard({ student, loading }: Props) {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                </CardContent>
            </Card>
        )
    }

    if (!student) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>{student.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
                <p className="text-muted-foreground">{student.email}</p>
                <p>
                    Grade {student.grade} &middot; GPA: {student.gpa}
                </p>
                <Badge
                    variant={
                        student.enrollmentStatus === "at_risk"
                            ? "destructive"
                            : "secondary"
                    }
                >
                    {student.enrollmentStatus === "at_risk"
                        ? "At Risk"
                        : "Active"}
                </Badge>
            </CardContent>
        </Card>
    )
}
