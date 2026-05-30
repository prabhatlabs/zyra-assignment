import { Router } from "express"
import { StudentController } from "../controllers"

const router = Router()

router.get("/", StudentController.getStudents)
router.get("/:id", StudentController.getStudentById)
router.post("/", StudentController.createStudent)
router.patch("/:id", StudentController.updateStudent)
router.delete("/:id", StudentController.deleteStudent)

export default router
