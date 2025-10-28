import { type NextRequest, NextResponse } from "next/server"
import { getAllTasks, createTask } from "@/lib/db"

// GET /api/tasks - Retrieve all tasks
export async function GET() {
  try {
    const tasks = getAllTasks()
    return NextResponse.json({ tasks }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, date, time } = body

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const newTask = createTask({
      title,
      description: description || "",
      completed: false,
      date: date || undefined,
      time: time || undefined,
    })

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
