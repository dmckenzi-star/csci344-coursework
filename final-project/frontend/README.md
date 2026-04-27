# Final Project Starter Client

This starter is intentionally small.

It gives you:

- a login screen
- token storage helpers
- one authenticated fetch helper
- a simple logged-in app shell
- logout behavior

It does **not** build your final project for you.

You still need to create:

- your main app views
- your CRUD screens
- your own form fields
- your own API endpoint functions
- your own third-party components such as charts or maps

## Run locally

1. Copy `.env.example` to `.env`
2. Set `VITE_API_BASE_URL` to your backend server
3. Install packages with `npm install`
4. Start the dev server with `npm run dev`

## Suggested next steps

1. Make sure login works with your backend
2. Add endpoint functions in `src/api.js`
3. Replace the placeholder logged-in shell in `src/App.jsx`
4. Build your main browse view
5. Add create/edit/delete behavior
6. Add one alternate view such as a chart or map

# CSCI 344 Final Project

A single-page web app for tracking personal quests (scheduled tasks) and the categories they belong to. Users can sign in, browse their quests in a list, create / edit / delete quests, and switch to a chart view that summarizes the data by category and by completion status.

Built for CSCI 344 — Advanced Web Technology, UNC Asheville (Spring 2026).

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, [recharts](https://recharts.org/) (bar + pie charts), [react-datepicker](https://reactdatepicker.com/) (date/time picker on the form)
- **Backend:** Node.js + Express via the course-provided [api-generator](https://github.com/csci344/api-generator), backed by SQLite
- **Auth:** JWT bearer token, stored in `localStorage`

## Structure

## Features

- Login screen with bearer-token auth
- Logged-in app shell with logout
- List view of all the user's quests
- Create / edit form with controlled inputs and a date/time picker
- Delete with confirmation
- Mode-switching state variable (`list` / `create` / `edit` / `chart`) controls which view renders
- Chart view with two recharts components: a bar chart of quests-per-category and a pie chart of completed-vs-open

## API resources

Two resources, both owner-scoped (each user only sees their own data):

- **Categories** — `name`, `color`, `description`
- **Quests** — `title`, `description`, `scheduled_at`, `duration_minutes`, `priority`, `is_completed`, `completed_at`, plus a `category` relation to Categories

Generated from `backend/api.config.yaml` via the api-generator's `validate` → `generate` → `seed` pipeline.

## Running it locally

You will need two terminals open at the same time — one for the backend, one for the frontend.

### 1. Clone the repo

```bash
git clone https://github.com/dmckenzi-star/csci344-coursework
cd csci344-coursework/final-project
```

### 2. Set up the backend

In **terminal 1**, from `csci344-coursework/final-project/`:

```bash
cd backend
npm install
npm run validate
npm run generate
npm run seed
npm run dev
```

The backend will start on `http://localhost:3100`. You can verify it's working by visiting `http://localhost:3100/api/docs` — that shows the auto-generated Swagger UI for the API.

The seed step creates two default users:

- `admin` / `password`
- `user` / `password`

The seeded sample categories and quests are owned by `admin`.

### 3. Set up the frontend

In **terminal 2**, from `csci344-coursework/final-project/`:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`. Open it in your browser and sign in with `admin` / `password`.

The frontend reads the backend URL from `frontend/.env` (`VITE_API_BASE_URL=http://localhost:3100`). If your backend is on a different port, edit that file before running `npm run dev`.

## Submission notes

- Built starting from the provided starter-client (login, token storage, auth gate, navbar, logout were already implemented; everything inside `Homepage.jsx`, `QuestForm.jsx`, `ChartView.jsx`, and the `api.js` endpoint functions is the project's own work).
- This app runs against a locally-hosted backend (the course's api-generator is set up to run on SQLite locally rather than as a deployed cloud service). The included demo video shows the app running end-to-end.
