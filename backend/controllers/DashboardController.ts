import type { DashboardSummary } from "@zyra-ass/shared"
import { asyncHandler } from "../lib/asyncHandler"
import { StudentModel } from "../models/Student"
import { TaskModel } from "../models/Task"
import { MessageModel } from "../models/Message"

export const getDashboardSummary = asyncHandler<DashboardSummary>(
    async (_req, _res, _next) => {
        const [totalStudents, atRiskCount, pendingTasks, unreadMessages] =
            await Promise.all([
                StudentModel.countDocuments(),
                StudentModel.countDocuments({
                    enrollmentStatus: "at_risk",
                }),
                TaskModel.countDocuments({
                    status: { $ne: "completed" },
                }),
                MessageModel.countDocuments({ read: false }),
            ])

        return {
            status: 200,
            message: "Dashboard summary fetched",
            data: { totalStudents, atRiskCount, pendingTasks, unreadMessages },
            error: null,
        }
    },
)
