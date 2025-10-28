"use client"

import { useState } from "react"
import type { Task } from "@/types/task"
import { formatDate, formatTime } from "@/lib/date-utils"

interface TaskItemProps {
  task: Task
  isEditing: boolean
  onToggleComplete: () => void
  onUpdateTask: (updates: Partial<Task>) => void
  onDeleteTask: () => void
  onEditStart: () => void
  onEditCancel: () => void
}

export default function TaskItem({
  task,
  isEditing,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onEditStart,
  onEditCancel,
}: TaskItemProps) {
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [editDate, setEditDate] = useState(task.date || "")
  const [editTime, setEditTime] = useState(task.time || "")

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert("Task title cannot be empty")
      return
    }
    onUpdateTask({
      title: editTitle.trim(),
      description: editDescription.trim(),
      date: editDate || undefined,
      time: editTime || undefined,
    })
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            placeholder="Description"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              onClick={onEditCancel}
              className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-900 font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-slate-200 p-4 transition-all ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggleComplete}
          className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-slate-900 break-words ${
              task.completed ? "line-through text-slate-500" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && <p className="text-slate-600 text-sm mt-1 break-words">{task.description}</p>}
          {(task.date || task.time) && (
            <div className="flex gap-4 mt-2 text-sm text-slate-500">
              {task.date && <span>{formatDate(task.date)}</span>}
              {task.time && <span>{formatTime(task.time)}</span>}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onEditStart}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            ✎
          </button>
          <button
            onClick={onDeleteTask}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
