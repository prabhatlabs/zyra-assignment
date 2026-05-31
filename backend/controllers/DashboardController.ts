import type { DashboardSummary } from "@zyra-ass/shared"
import mongoose from "mongoose"
import { asyncHandler } from "../lib/asyncHandler"
import { StudentModel } from "../models"

export const getDashboardSummary = asyncHandler<DashboardSummary>(
    async (_req, _res, _next) => {
        const db = mongoose.connection.db!

        const [result] = await StudentModel.aggregate([
            {
                $lookup: {
                    from: "students",
                    pipeline: [
                        {
                            $group: {
                                _id: null,
                                totalStudents: { $sum: 1 },
                                atRiskCount: {
                                    $sum: {
                                        $cond: [
                                            {
                                                $eq: [
                                                    "$enrollmentStatus",
                                                    "at_risk",
                                                ],
                                            },
                                            1,
                                            0,
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                    as: "studentsData",
                },
            },
            {
                $lookup: {
                    from: "tasks",
                    pipeline: [
                        {
                            $match: {
                                status: { $ne: "completed" },
                            },
                        },
                        { $count: "count" },
                    ],
                    as: "pendingLookup",
                },
            },
            {
                $lookup: {
                    from: "messages",
                    pipeline: [
                        { $match: { read: false } },
                        { $count: "count" },
                    ],
                    as: "unreadLookup",
                },
            },
            {
                $project: {
                    _id: 0,
                    totalStudents: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    "$studentsData.totalStudents",
                                    0,
                                ],
                            },
                            0,
                        ],
                    },
                    atRiskCount: {
                        $ifNull: [
                            { $arrayElemAt: ["$studentsData.atRiskCount", 0] },
                            0,
                        ],
                    },
                    pendingTasks: {
                        $ifNull: [
                            { $arrayElemAt: ["$pendingLookup.count", 0] },
                            0,
                        ],
                    },
                    unreadMessages: {
                        $ifNull: [
                            { $arrayElemAt: ["$unreadLookup.count", 0] },
                            0,
                        ],
                    },
                },
            },
        ])

        return {
            status: 200,
            message: "Dashboard summary fetched",
            data: {
                totalStudents: result?.totalStudents ?? 0,
                atRiskCount: result?.atRiskCount ?? 0,
                pendingTasks: result?.pendingTasks ?? 0,
                unreadMessages: result?.unreadMessages ?? 0,
            },
            error: null,
        }
    },
)
