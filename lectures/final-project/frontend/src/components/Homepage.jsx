import React from "react";

export default function Homepage({ username }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Your app goes here</h1>
        {username ? (
          <p className="mt-2 text-sm text-slate-500">Logged in as {username}</p>
        ) : null}
        <p className="mt-2 text-slate-600">
          You are logged in. Replace this placeholder with your own browse
          view, forms, CRUD workflow, and third-party components.
        </p>

        <div className="mt-6 rounded bg-slate-50 p-4 text-sm text-slate-700">
          <p>Suggested next steps:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Add endpoint functions in `api.js`</li>
            <li>Build a main browse view for your resource</li>
            <li>Add create/edit/delete actions</li>
            <li>Add a chart, map, or other alternate view</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
