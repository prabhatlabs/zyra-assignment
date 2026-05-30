import { Schema, model } from "mongoose"
import type { Task } from "@zyra-ass/shared"

const taskSchema = new Schema<Task>(
    {
        studentId: { type: String, required: true, index: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: ["todo", "in_progress", "completed"] as const,
        },
        priority: {
            type: String,
            required: true,
            enum: ["urgent", "high", "medium", "low"] as const,
        },
        dueDate: { type: String, required: true },
    },
    { timestamps: true },
)

export const TaskModel = model<Task>("Task", taskSchema)
