import express from "express"
import routes from "./routes"
import { attachRequestId } from "./lib/requestId"
import { requestLogger } from "./lib/requestLogger"
import { globalErrorHandler } from "./lib/errorHandler"

const app = express()

app.use(express.json())
app.use(attachRequestId)
app.use(requestLogger)

app.get("/api/v1/health", (_req, res) => {
    res.json({ status: "ok" })
})

app.use("/api/v1", routes)
app.use(globalErrorHandler)

export default app
