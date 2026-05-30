import envvars from "./constants/envvars"
import app from "./app"
import { connectDB } from "./lib/db"

await connectDB()

app.listen(envvars.PORT, () => {
    console.log(`[Info]: Backend running at ${envvars.PORT}`)
})
