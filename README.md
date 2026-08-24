# Bright Ideas

A full-stack MERN social app where users share ideas and vote for the ones they like. Built as a group project.

## Features

- User registration and login with JWT authentication (passwords hashed with bcrypt)
- Post ideas to a shared feed
- Like/unlike ideas and see who liked each one
- View all ideas posted by a specific user

## Tech Stack

| Layer    | Technology                                        |
| -------- | ------------------------------------------------- |
| Frontend | React 18 (Vite), React Router, React Bootstrap    |
| Backend  | Node.js, Express                                  |
| Database | MongoDB with Mongoose                             |
| Auth     | JSON Web Tokens, bcrypt, HTTP-only cookies        |

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or Atlas)

### Backend

```bash
cd server
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The client runs on the Vite dev server and talks to the Express API.

## Environment Variables

The server expects a `server/.env` file (see `server/.env.example`):

| Variable      | Description                          |
| ------------- | ------------------------------------ |
| `MONGODB_URI` | MongoDB connection string            |
| `SECRET_KEY`  | Secret used to sign JWTs             |
