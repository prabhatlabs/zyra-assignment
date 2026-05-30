import type { Task, TaskStatus } from "@zyra-ass/shared"
import { asyncHandler } from "../lib/asyncHandler"
import { TaskModel } from "../models/Task"

export const getTasks = asyncHandler<Task[]>(async (_req, _res, _next) => {
    const data = await TaskModel.aggregate<Task>([{ $match: {} }])
    return { status: 200, message: "Tasks fetched", data, error: null }
})

export const getTasksByStudent = asyncHandler<Task[]>(
    async (req, _res, _next) => {
        const data = await TaskModel.aggregate<Task>([
            { $match: { studentId: req.params.studentId } },
        ])
        return { status: 200, message: "Tasks fetched", data, error: null }
    },
)

export const getTaskById = asyncHandler<Task | null>(
    async (req, _res, _next) => {
        const data = await TaskModel.aggregate<Task>([
            { $match: { id: req.params.id } },
        ]).then((r) => r[0] ?? null)
        if (!data)
            return {
                status: 404,
                message: "Task not found",
                data: null,
                error: "Not found",
            }
        return { status: 200, message: "Task fetched", data, error: null }
    },
)

export const createTask = asyncHandler<Task>(async (req, _res, _next) => {
    const doc = await TaskModel.create(req.body)
    return {
        status: 201,
        message: "Task created",
        data: doc.toObject({ virtuals: true }),
        error: null,
    }
})

export const updateTask = asyncHandler<Task | null>(
    async (req, _res, _next) => {
        const data = await TaskModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true },
        )
        if (!data)
            return {
                status: 404,
                message: "Task not found",
                data: null,
                error: "Not found",
            }
        return { status: 200, message: "Task updated", data, error: null }
    },
)

export const updateTaskStatus = asyncHandler<Task | null>(
    async (req, _res, _next) => {
        const { status } = req.body as { status: TaskStatus }

        const validStatuses: TaskStatus[] = ["todo", "in_progress", "completed"]
        if (!validStatuses.includes(status))
            return {
                status: 400,
                message: "Invalid status",
                data: null,
                error: `Status must be one of: ${validStatuses.join(", ")}`,
            }

        const data = await TaskModel.findOneAndUpdate(
            { id: req.params.taskId },
            { status },
            { new: true },
        )
        if (!data)
            return {
                status: 404,
                message: "Task not found",
                data: null,
                error: "Not found",
            }

        return {
            status: 200,
            message: "Task status updated",
            data,
            error: null,
        }
    },
)

export const deleteTask = asyncHandler<null>(async (req, _res, _next) => {
    const data = await TaskModel.findOneAndDelete({ id: req.params.id })
    if (!data)
        return {
            status: 404,
            message: "Task not found",
            data: null,
            error: "Not found",
        }
    return { status: 200, message: "Task deleted", data: null, error: null }
})
