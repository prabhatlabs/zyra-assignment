import mongoose from "mongoose"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import app from "../app"
import { connectDB } from "../lib/db"
import { messages, students, tasks } from "../mock_data"

beforeAll(async () => {
    await connectDB("zyra-ass-test", true)

    const db = mongoose.connection.db!

    await db.dropDatabase()
    await db.collection("students").insertMany(students)
    await db.collection("tasks").insertMany(tasks)
    await db.collection("messages").insertMany(messages)
}, 15000)

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
}, 15000)

describe("GET /api/v1/students/:id/action-center", () => {
    it("returns student with tasks and unread count", async () => {
        const res = await request(app).get(
            "/api/v1/students/stu_001/action-center",
        )

        expect(res.status).toBe(200)
        expect(res.body.data).toHaveProperty("student")
        expect(res.body.data.student.name).toBe("Maya Patel")
        expect(res.body.data.tasks).toHaveLength(5)
        expect(res.body.data.unreadMessagesCount).toBe(2)
    })

    it("returns 404 for unknown student", async () => {
        const res = await request(app).get(
            "/api/v1/students/unknown/action-center",
        )

        expect(res.status).toBe(404)
        expect(res.body.error).toBe("Not found")
    })
})

describe("PATCH /api/v1/tasks/:taskId/status", () => {
    it("updates task status", async () => {
        const res = await request(app)
            .patch("/api/v1/tasks/tsk_001/status")
            .send({ status: "in_progress" })

        expect(res.status).toBe(200)
        expect(res.body.data.status).toBe("in_progress")
    })

    it("returns 400 for invalid status", async () => {
        const res = await request(app)
            .patch("/api/v1/tasks/tsk_001/status")
            .send({ status: "invalid" })

        expect(res.status).toBe(400)
    })

    it("returns 404 for unknown task", async () => {
        const res = await request(app)
            .patch("/api/v1/tasks/unknown/status")
            .send({ status: "completed" })

        expect(res.status).toBe(404)
    })
})
