import { asyncHandler } from "../lib/asyncHandler"
import { StudentModel } from "../models/Student"
import type { ApiResponse, Student } from "@zyra-ass/shared"

export const getStudents = asyncHandler<Student[]>(
    async (_req, _res, _next) => {
        const data = await StudentModel.aggregate<Student>([{ $match: {} }])
        return { status: 200, message: "Students fetched", data, error: null }
    },
)

export const getStudentById = asyncHandler<Student | null>(
    async (req, _res, _next) => {
        const data = await StudentModel.aggregate<Student>([
            { $match: { _id: req.params.id } },
        ]).then((r) => r[0] ?? null)
        if (!data)
            return {
                status: 404,
                message: "Student not found",
                data: null,
                error: "Not found",
            }
        return { status: 200, message: "Student fetched", data, error: null }
    },
)

export const createStudent = asyncHandler<Student>(async (req, _res, _next) => {
    const doc = await StudentModel.create(req.body)
    return {
        status: 201,
        message: "Student created",
        data: doc.toObject(),
        error: null,
    }
})

export const updateStudent = asyncHandler<Student | null>(
    async (req, _res, _next) => {
        const data = await StudentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        if (!data)
            return {
                status: 404,
                message: "Student not found",
                data: null,
                error: "Not found",
            }
        return { status: 200, message: "Student updated", data, error: null }
    },
)

export const deleteStudent = asyncHandler<null>(async (req, _res, _next) => {
    const data = await StudentModel.findByIdAndDelete(req.params.id)
    if (!data)
        return {
            status: 404,
            message: "Student not found",
            data: null,
            error: "Not found",
        }
    return { status: 200, message: "Student deleted", data: null, error: null }
})
