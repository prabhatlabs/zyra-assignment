import { Schema, model } from "mongoose"

const counterSchema = new Schema({
    prefix: { type: String, required: true, unique: true },
    seq: { type: Number, required: true, default: 0 },
})

export const CounterModel = model("Counter", counterSchema)

export async function nextId(prefix: string): Promise<string> {
    const counter = await CounterModel.findOneAndUpdate(
        { prefix },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
    ).lean()
    return `${prefix}_${String(counter.seq).padStart(3, "0")}`
}
