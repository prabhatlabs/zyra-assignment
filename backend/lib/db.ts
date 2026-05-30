import mongoose from "mongoose"
import envvars from "../constants/envvars"

export async function connectDB() {
    await mongoose.connect(envvars.MONGODB_URI, { dbName: "zyra-ass" })
    console.log("[Info]: Connected to MongoDB")
}
