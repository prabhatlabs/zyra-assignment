import { Schema, model } from "mongoose"
import type { Task } from "@zyra-ass/shared"
import { nextId } from "../lib/counter"

const taskSchema = new Schema<Task>(
    {
        id: { type: String },
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

taskSchema.pre("save", async function (next) {
    if (!this.id) {
        this.id = await nextId("tsk")
    }
    next()
})

export const TaskModel = model<Task>("Task", taskSchema)
