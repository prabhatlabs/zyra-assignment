import { Schema, model } from "mongoose"
import type { Message } from "@zyra-ass/shared"
import { nextId } from "../lib/counter"

const messageSchema = new Schema<Message>(
    {
        id: { type: String },
        studentId: { type: String, required: true, index: true },
        from: { type: String, required: true },
        subject: { type: String, required: true },
        preview: { type: String, required: true },
        read: { type: Boolean, required: true },
        receivedAt: { type: String, required: true },
    },
    { timestamps: true },
)

messageSchema.pre("save", async function (next) {
    if (!this.id) {
        this.id = await nextId("msg")
    }
    next()
})

export const MessageModel = model<Message>("Message", messageSchema)
