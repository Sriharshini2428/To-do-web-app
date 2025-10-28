import type { Task } from "@/types/task"

// Database key for localStorage
const DB_KEY = "todo_tasks_db"

// Initialize database with sample data if empty
export function initializeDatabase(): Task[] {
  if (typeof window === "undefined") return []

  const existing = localStorage.getItem(DB_KEY)
  if (existing) {
    try {
      return JSON.parse(existing)
    } catch {
      return []
    }
  }

  // Initialize with empty array
  const initialTasks: Task[] = []
  localStorage.setItem(DB_KEY, JSON.stringify(initialTasks))
  return initialTasks
}

// Get all tasks
export function getAllTasks(): Task[] {
  if (typeof window === "undefined") return []

  try {
    const data = localStorage.getItem(DB_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Get task by ID
export function getTaskById(id: string): Task | null {
  const tasks = getAllTasks()
  return tasks.find((t) => t.id === id) || null
}

// Create task
export function createTask(task: Omit<Task, "id" | "createdAt">): Task {
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  const tasks = getAllTasks()
  tasks.push(newTask)
  localStorage.setItem(DB_KEY, JSON.stringify(tasks))

  return newTask
}

// Update task
export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const tasks = getAllTasks()
  const index = tasks.findIndex((t) => t.id === id)

  if (index === -1) return null

  const updatedTask = { ...tasks[index], ...updates, id, createdAt: tasks[index].createdAt }
  tasks[index] = updatedTask
  localStorage.setItem(DB_KEY, JSON.stringify(tasks))

  return updatedTask
}

// Delete task
export function deleteTask(id: string): boolean {
  const tasks = getAllTasks()
  const index = tasks.findIndex((t) => t.id === id)

  if (index === -1) return false

  tasks.splice(index, 1)
  localStorage.setItem(DB_KEY, JSON.stringify(tasks))

  return true
}

// Clear all tasks
export function clearAllTasks(): void {
  localStorage.setItem(DB_KEY, JSON.stringify([]))
}
