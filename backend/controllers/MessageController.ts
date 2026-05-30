import { asyncHandler } from "../lib/asyncHandler"
import { MessageModel } from "../models/Message"
import type { ApiResponse, Message } from "@zyra-ass/shared"

export const getMessages = asyncHandler<Message[]>(
  async (_req, _res, _next) => {
    const data = await MessageModel.aggregate<Message>([{ $match: {} }])
    return { status: 200, message: "Messages fetched", data, error: null }
  },
)

export const getMessagesByStudent = asyncHandler<Message[]>(
  async (req, _res, _next) => {
    const data = await MessageModel.aggregate<Message>([
      { $match: { studentId: req.params.studentId } },
    ])
    return { status: 200, message: "Messages fetched", data, error: null }
  },
)

export const getMessageById = asyncHandler<Message | null>(
  async (req, _res, _next) => {
    const data = await MessageModel.aggregate<Message>([
      { $match: { _id: req.params.id } },
    ]).then((r) => r[0] ?? null)
    if (!data) return { status: 404, message: "Message not found", data: null, error: "Not found" }
    return { status: 200, message: "Message fetched", data, error: null }
  },
)

export const createMessage = asyncHandler<Message>(
  async (req, _res, _next) => {
    const doc = await MessageModel.create(req.body)
    return { status: 201, message: "Message created", data: doc.toObject(), error: null }
  },
)

export const updateMessage = asyncHandler<Message | null>(
  async (req, _res, _next) => {
    const data = await MessageModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!data) return { status: 404, message: "Message not found", data: null, error: "Not found" }
    return { status: 200, message: "Message updated", data, error: null }
  },
)

export const deleteMessage = asyncHandler<null>(
  async (req, _res, _next) => {
    const data = await MessageModel.findByIdAndDelete(req.params.id)
    if (!data) return { status: 404, message: "Message not found", data: null, error: "Not found" }
    return { status: 200, message: "Message deleted", data: null, error: null }
  },
)
