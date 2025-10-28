import type { Task } from "@/types/task"

// API client for task operations
export const taskApi = {
  // Fetch all tasks
  async getAllTasks(): Promise<Task[]> {
    const response = await fetch("/api/tasks")
    if (!response.ok) throw new Error("Failed to fetch tasks")
    const data = await response.json()
    return data.tasks
  },

  // Fetch single task
  async getTask(id: string): Promise<Task> {
    const response = await fetch(`/api/tasks/${id}`)
    if (!response.ok) throw new Error("Failed to fetch task")
    return response.json()
  },

  // Create task
  async createTask(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
    if (!response.ok) throw new Error("Failed to create task")
    return response.json()
  },

  // Update task
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error("Failed to update task")
    return response.json()
  },

  // Delete task
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete task")
  },
}
