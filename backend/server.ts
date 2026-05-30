import express from "express"
import envvars from "./constants/envvars"
import routes from "./routes"
import { connectDB } from "./lib/db"

const app = express()

app.use(express.json())

app.get("/api/v1/health", (_req, res) => {
    res.json({ status: "ok" })
})

app.use("/api/v1", routes)

await connectDB()

app.listen(envvars.PORT, () => {
    console.log(`[Info]: Backend running at ${envvars.PORT}`)
})
