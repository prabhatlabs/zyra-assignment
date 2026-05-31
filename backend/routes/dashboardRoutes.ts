import { Router } from "express"
import { DashboardController } from "../controllers"

const router = Router()

router.get("/summary", DashboardController.getDashboardSummary)

export default router
