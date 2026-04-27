import React, { useState } from "react";
import { createQuest, updateQuest } from "../api.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function QuestForm({ quest, categories, onDone, onCancel }) {
  const isEditing = Boolean(quest);

  // Initialize form state from existing quest, or sensible defaults
  const [title, setTitle] = useState(quest?.title || "");
  const [description, setDescription] = useState(quest?.description || "");
  const [scheduledAt, setScheduledAt] = useState(quest?.scheduled_at || "");
  const [durationMinutes, setDurationMinutes] = useState(
    quest?.duration_minutes || 30,
  );
  const [priority, setPriority] = useState(quest?.priority || "Medium");
  const [isCompleted, setIsCompleted] = useState(quest?.is_completed || false);
  const [categoryId, setCategoryId] = useState(quest?.category?.id || "");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Build payload 
    const payload = {
      title,
      description,
      scheduled_at: scheduledAt, // already an ISO string from DatePicker
      duration_minutes: Number(durationMinutes),
      priority,
      is_completed: isCompleted,
      category: categoryId ? Number(categoryId) : null,
    };

    try {
      if (isEditing) {
        await updateQuest(quest.id, payload);
      } else {
        await createQuest(payload);
      }
      onDone(); // tell parent to re-fetch + go back to list
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        {isEditing ? "Edit Quest" : "New Quest"}
      </h2>

      {error && (
        <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Scheduled at
            </label>
            <DatePicker
              selected={scheduledAt ? new Date(scheduledAt) : null}
              onChange={(date) =>
                setScheduledAt(date ? date.toISOString() : "")
              }
              showTimeSelect
              dateFormat="Pp"
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Duration (min)
            </label>
            <input
              type="number"
              min="1"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            >
              <option value="">— None —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            Completed
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            {isEditing ? "Save changes" : "Create quest"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-slate-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
