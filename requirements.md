# Full Stack Software Engineer — Zyra Platform

We are looking for a Full Stack Software Engineer to build and ship product features on the Zyra platform. You will work across our React frontend and Node.js backend, integrate with MongoDB, and collaborate on flows, dashboards, and real-time counselor tooling.

## Responsibilities

- Build and maintain full-stack features in React (TypeScript) and Node.js (Express)
- Design and implement REST APIs backed by MongoDB, Elasticsearch
- Manage client state with Zustand and server state with TanStack React Query
- Build interactive workflow and diagram UIs with React Flow, Blocknote etc
- Implement accessible UI with our component stack (Radix UI, Tailwind, shadcn-style patterns)
- Write clear API contracts, READMEs, and architecture notes for features you own
- Collaborate via Git, code review, and iterative delivery

## Required Skills

- Strong TypeScript on both frontend and backend
- React (hooks, composition, performance basics)
- TanStack React Query (queries, mutations, caching, error/loading states)
- Zustand (or similar lightweight client state management)
- Node.js + Express (routing, middleware, validation), MongoDB
- Real-time updates via Server-Sent Events (SSE) or WebSockets

## Good to Have

- GCP (Cloud Run, Cloud Storage, or similar)
- Redis (caching, queues, session store, or rate limiting)
- AWS (Amplify auth, S3)
- Vitest or Jest for frontend/backend tests

## What We're Looking For

Pragmatic builders who ship complete features end-to-end — clean APIs, thoughtful UI states, and code that is easy for others to run and review.

---

> IF THIS DOESN'T SOUND LIKE YOU, PLEASE GO BACK AND PICK ANOTHER ROLE

---

# Software Engineer Task 1: Core Assessment

**Objective:** Build a mini feature, **Counselor Student Action Center**. This feature should help a counselor quickly understand a student's priorities, tasks, unread messages, and urgency level.

### Requirements

Build a small full-stack feature using:

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript

### Mock Data

You must use this exact mock data: [Mock Data](https://gist.githubusercontent.com/teleportu/0e16e5b184d8593dfee7c2e9dd1ca2b0/raw/81563c16bd270c810c4cd814d2891326e40d5f1b/mock-data.json)

Copy the data into your backend. Do not modify the IDs or structure.

### Backend APIs

Create the following endpoints:

- `GET /students/:id/action-center`
- `PATCH /tasks/:taskId/status`

### Frontend Requirements

The frontend page should include:

- Student profile summary
- Task list
- Unread messages count
- Urgency or priority badges
- Ability to update task status
- Loading, Error states

### Deliverables

Please submit a public GitHub repository that includes:

- Source code
- README with setup and run instructions
- Simple API contract
- Short architecture note explaining how you structured the project

### Submission

Submit your public GitHub repository link.

Public GitHub repo link for **Software Engineer Task 1**

---

# Software Engineer — Task 2: Bonus Assessment

**Objective:** Improve the quality, reliability, and performance of the feature as if preparing it for production.

### Requirements

- Add backend request logging
- Add error middleware with request IDs
- Add at least one meaningful integration test
- Add at least one frontend test

### Deliverables

Please submit a public GitHub repository link. This can be the same repository as Task 1, either in a separate folder or branch.

Your repository should include:

- README section explaining performance decisions and tradeoffs
- Test output screenshot or CI run log

### Submission

Submit your public GitHub repository link.

Public GitHub repo link for **Software Engineer Task 2**
