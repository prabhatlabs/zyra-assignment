import { Schema, model } from "mongoose"
import type { Student } from "@zyra-ass/shared"

const studentSchema = new Schema<Student>({
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
})

export const StudentModel = model<Student>("Student", studentSchema)
