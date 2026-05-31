import mongoose from "mongoose"
import envvars from "../constants/envvars"

export async function connectDB(dbName?: string, testMode: boolean = false) {
    await mongoose.connect(
        testMode ? envvars.MONGODB_URI_TEST : envvars.MONGODB_URI,
        {
            dbName: dbName ?? "zyra-ass",
        },
    )
    console.log(`[Info]: Connected to MongoDB — ${dbName ?? "zyra-ass"}`)
}
