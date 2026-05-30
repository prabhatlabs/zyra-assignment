import { Router } from "express"
import { TaskController, MessageController } from "../controllers"
import studentRoutes from "./studentRoutes"
import taskRoutes from "./taskRoutes"
import messageRoutes from "./messageRoutes"

const router = Router()

router.use("/students", studentRoutes)
router.use("/students/:studentId/tasks", TaskController.getTasksByStudent)
router.use(
    "/students/:studentId/messages",
    MessageController.getMessagesByStudent,
)
router.use("/tasks", taskRoutes)
router.use("/messages", messageRoutes)

export default router
