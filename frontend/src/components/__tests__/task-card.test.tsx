import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { Task } from "@zyra-ass/shared"
import { TaskCard } from "@/components/task-card"

const mockUpdateTaskStatus = vi.fn()

vi.mock("@/store/action-center-store", () => ({
    useActionCenterStore: (selector: (state: unknown) => unknown) =>
        selector({ updateTaskStatus: mockUpdateTaskStatus }),
}))

const baseTask: Task = {
    id: "tsk_001",
    studentId: "stu_001",
    title: "Submit FAFSA application",
    description: "Deadline is approaching.",
    status: "todo",
    priority: "urgent",
    dueDate: "2026-06-05",
    createdAt: "2026-05-13T14:00:00Z",
    updatedAt: "2026-05-13T14:00:00Z",
}

describe("TaskCard", () => {
    it("renders the task title", () => {
        render(<TaskCard task={baseTask} />)
        expect(screen.getByText("Submit FAFSA application")).toBeInTheDocument()
    })

    it("renders the priority badge with correct label", () => {
        render(<TaskCard task={baseTask} />)
        expect(screen.getByText("Urgent")).toBeInTheDocument()
    })

    it("renders the description", () => {
        render(<TaskCard task={baseTask} />)
        expect(screen.getByText("Deadline is approaching.")).toBeInTheDocument()
    })

    it("renders the due date", () => {
        render(<TaskCard task={baseTask} />)
        expect(screen.getByText(/Due/)).toBeInTheDocument()
        expect(screen.getByText(/6\/5\/2026/)).toBeInTheDocument()
    })

    it("shows Edit button when onEdit is provided", () => {
        render(<TaskCard task={baseTask} onEdit={() => {}} />)
        expect(screen.getByText("Edit")).toBeInTheDocument()
    })

    it("hides Edit button when onEdit is not provided", () => {
        render(<TaskCard task={baseTask} />)
        expect(screen.queryByText("Edit")).not.toBeInTheDocument()
    })

    it("shows Delete button when onDelete is provided", () => {
        render(<TaskCard task={baseTask} onDelete={() => {}} />)
        expect(screen.getByText("Delete")).toBeInTheDocument()
    })

    it("hides Delete button when onDelete is not provided", () => {
        render(<TaskCard task={baseTask} />)
        expect(screen.queryByText("Delete")).not.toBeInTheDocument()
    })

    it("shows the current status label on the status button", () => {
        render(<TaskCard task={baseTask} />)
        expect(screen.getByText("Todo")).toBeInTheDocument()
    })

    it("renders with a different status label", () => {
        const completed = { ...baseTask, status: "completed" as const }
        render(<TaskCard task={completed} />)
        expect(screen.getByText("Completed")).toBeInTheDocument()
    })

    it("renders low priority badge", () => {
        const low = { ...baseTask, priority: "low" as const }
        render(<TaskCard task={low} />)
        expect(screen.getByText("Low")).toBeInTheDocument()
    })

    it("does not render description when empty", () => {
        const noDesc = { ...baseTask, description: "" }
        render(<TaskCard task={noDesc} />)
        expect(screen.queryByText("Deadline is approaching.")).not.toBeInTheDocument()
    })
})
