import { Schema, model } from "mongoose"
import type { Student } from "@zyra-ass/shared"
import { nextId } from "../lib/counter"

const studentSchema = new Schema<Student>(
    {
        id: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        grade: { type: Number, required: true },
        gpa: { type: Number, required: true },
        counselorId: { type: String, required: true },
        enrollmentStatus: {
            type: String,
            required: true,
            enum: ["at_risk", "active"] as const,
        },
    },
    { timestamps: true },
)

studentSchema.pre("save", async function (next) {
    if (!this.id) {
        this.id = await nextId("stu")
    }
    next()
})

export const StudentModel = model<Student>("Student", studentSchema)
