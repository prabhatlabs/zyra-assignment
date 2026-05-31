import { Router } from "express"
import { TaskController, MessageController } from "../controllers"
import studentRoutes from "./studentRoutes"
import taskRoutes from "./taskRoutes"
import messageRoutes from "./messageRoutes"
import dashboardRoutes from "./dashboardRoutes"

const router = Router()

router.use("/dashboard", dashboardRoutes)
router.use("/students", studentRoutes)
router.use("/tasks", taskRoutes)
router.use("/messages", messageRoutes)

export default router
