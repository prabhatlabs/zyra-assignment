import { Router } from "express"
import { MessageController } from "../controllers"

const router = Router()

router.get("/", MessageController.getMessages)
router.get("/:id", MessageController.getMessageById)
router.post("/", MessageController.createMessage)
router.patch("/:id", MessageController.updateMessage)
router.delete("/:id", MessageController.deleteMessage)

export default router
