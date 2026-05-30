import mongoose from "mongoose"
import envvars from "../constants/envvars"

export async function connectDB(dbName?: string) {
    await mongoose.connect(envvars.MONGODB_URI, {
        dbName: dbName ?? "zyra-ass",
    })
    console.log(`[Info]: Connected to MongoDB — ${dbName ?? "zyra-ass"}`)
}
