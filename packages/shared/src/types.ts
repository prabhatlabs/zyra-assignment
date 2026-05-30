export type EnrollmentStatus = "at_risk" | "active"

export type Priority = "urgent" | "high" | "medium" | "low"

export type TaskStatus = "todo" | "in_progress" | "completed"

export interface Student {
    id: string
    name: string
    email: string
    grade: number
    gpa: number
    counselorId: string
    enrollmentStatus: EnrollmentStatus
}

export interface Task {
    id: string
    studentId: string
    title: string
    description: string
    status: TaskStatus
    priority: Priority
    dueDate: string
    createdAt: string
    updatedAt: string
}

export interface ActionCenterResponse {
    student: Student
    tasks: Task[]
    unreadMessagesCount: number
}

export interface ApiResponse<T = unknown> {
    status: number
    message: string
    data: T | null
    error: string | null
}

export interface Message {
    id: string
    studentId: string
    from: string
    subject: string
    preview: string
    read: boolean
    receivedAt: string
}
