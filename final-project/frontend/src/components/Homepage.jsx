import React, { useState, useEffect } from "react";
import { getQuests, getCategories, deleteQuest } from "../api.js";
import QuestForm from "./QuestForm.jsx";
import ChartView from "./ChartView.jsx";

export default function Homepage({ username }) {
  const [mode, setMode] = useState("list");
  const [quests, setQuests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingQuest, setEditingQuest] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const questsData = await getQuests();
      const categoriesData = await getCategories();
      setQuests(questsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this quest?")) return;
    try {
      await deleteQuest(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function openCreateForm() {
    setEditingQuest(null);
    setMode("create");
  }

  function openEditForm(quest) {
    setEditingQuest(quest);
    setMode("edit");
  }

  async function handleFormDone() {
    await loadData();
    setMode("list");
    setEditingQuest(null);
  }

  function handleFormCancel() {
    setMode("list");
    setEditingQuest(null);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Quests</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("list")}
            className={`rounded px-3 py-1 text-sm ${
              mode === "list"
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-300"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setMode("chart")}
            className={`rounded px-3 py-1 text-sm ${
              mode === "chart"
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-300"
            }`}
          >
            Chart
          </button>
          <button
            onClick={openCreateForm}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
          >
            + New Quest
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {mode === "list" && (
        <ul className="space-y-3">
          {quests.length === 0 && (
            <li className="text-slate-500">No quests yet.</li>
          )}
          {quests.map((quest) => (
            <li
              key={quest.id}
              className="rounded border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold">{quest.title}</h2>
                  <p className="text-sm text-slate-600">{quest.description}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {quest.scheduled_at} · {quest.duration_minutes} min
                    {quest.category ? ` · ${quest.category.name}` : ""}
                    {quest.priority ? ` · ${quest.priority}` : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs ${
                      quest.is_completed
                        ? "bg-green-100 text-green-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {quest.is_completed ? "Done" : "Open"}
                  </span>
                  <button
                    onClick={() => openEditForm(quest)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quest.id)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(mode === "create" || mode === "edit") && (
        <QuestForm
          quest={editingQuest}
          categories={categories}
          onDone={handleFormDone}
          onCancel={handleFormCancel}
        />
      )}

      {mode === "chart" && (
        <ChartView quests={quests} categories={categories} />
      )}
    </main>
  );
}
