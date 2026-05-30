import { Schema, model } from "mongoose"
import type { Message } from "@zyra-ass/shared"

const messageSchema = new Schema<Message>(
    {
        studentId: { type: String, required: true, index: true },
        from: { type: String, required: true },
        subject: { type: String, required: true },
        preview: { type: String, required: true },
        read: { type: Boolean, required: true },
        receivedAt: { type: String, required: true },
    },
    { timestamps: true },
)

export const MessageModel = model<Message>("Message", messageSchema)
