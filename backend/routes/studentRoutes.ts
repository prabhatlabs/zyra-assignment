import { Router } from "express"
import {
    MessageController,
    StudentController,
    TaskController,
} from "../controllers"

const router = Router()

router.get("/", StudentController.getStudents)
router.get("/:id", StudentController.getStudentById)
router.get("/:id/action-center", StudentController.getActionCenter)
router.get("/:studentId/tasks", TaskController.getTasksByStudent)
router.get(
    "/:studentId/messages",
    MessageController.getMessagesByStudent,
)
router.post("/", StudentController.createStudent)
router.patch("/:id", StudentController.updateStudent)
router.delete("/:id", StudentController.deleteStudent)

export default router
