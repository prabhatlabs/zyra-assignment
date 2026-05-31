import path from "path"
import cors from "cors"
import express from "express"
import routes from "./routes"
import { attachRequestId } from "./lib/requestId"
import { requestLogger } from "./lib/requestLogger"
import { globalErrorHandler } from "./lib/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())
app.use(attachRequestId)
app.use(requestLogger)

app.get("/api/v1/health", (_req, res) => {
    res.json({ status: "ok" })
})

app.use("/api/v1", routes)

const publicDir = path.resolve(import.meta.dir, "public")
app.use(express.static(publicDir))
app.get("*", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"))
})

app.use(globalErrorHandler)

export default app
