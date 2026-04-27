import { getToken } from "./tokenStorage.js";

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL;
}

export async function sendRequest(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(getApiBaseUrl() + path, {
    method: options.method,
    body: options.body,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const errorBody = await response.json();
      message = errorBody.error || errorBody.message || message;
    } catch {
      // Keep the default message if the server does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}


// ---------- Quests ----------

export function getQuests() {
  return sendRequest("/api/quests");
}

export function getQuest(id) {
  return sendRequest(`/api/quests/${id}`);
}

export function createQuest(data) {
  return sendRequest("/api/quests", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateQuest(id, data) {
  return sendRequest(`/api/quests/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteQuest(id) {
  return sendRequest(`/api/quests/${id}`, {
    method: "DELETE",
  });
}

// ---------- Categories ----------

export function getCategories() {
  return sendRequest("/api/categories");
}

export function createCategory(data) {
  return sendRequest("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCategory(id, data) {
  return sendRequest(`/api/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteCategory(id) {
  return sendRequest(`/api/categories/${id}`, {
    method: "DELETE",
  });
}
