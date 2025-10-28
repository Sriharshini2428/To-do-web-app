"use client"

import { useState } from "react"
import TaskItem from "./task-item"
import type { Task } from "@/types/task"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}

export default function TaskList({ tasks, onToggleComplete, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onToggleComplete={() => onToggleComplete(task.id)}
          onUpdateTask={(updates) => {
            onUpdateTask(task.id, updates)
            setEditingId(null)
          }}
          onDeleteTask={() => onDeleteTask(task.id)}
          onEditStart={() => setEditingId(task.id)}
          onEditCancel={() => setEditingId(null)}
        />
      ))}
    </div>
  )
}
