import express from "express"
import routes from "./routes"

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" })
})

app.use("/api", routes)

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`)
})
