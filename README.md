# AI-Powered Student Helpdesk Chatbot

A full-stack student support web app built with React, Vite, Node.js, Express, and optional MongoDB + AI API integration.

## Features
- Responsive student-helpdesk interface
- Chat interface with quick prompts
- Backend API (`POST /api/chat`)
- Useful built-in FAQ responses when no AI key is configured
- Optional AI responses using an OpenAI-compatible chat completions endpoint
- Optional MongoDB conversation logging
- Health-check endpoint (`GET /api/health`)

## Requirements
- Node.js 18+ and npm
- VS Code (recommended)
- Optional: MongoDB connection string
- Optional: AI API key and compatible API base URL

## 1. Install dependencies
Open a terminal in this project folder and run:

```bash
npm install
npm run install:all
```

## 2. Configure the backend
Copy `server/.env.example` to `server/.env`.

Windows PowerShell:
```powershell
Copy-Item server/.env.example server/.env
```

macOS/Linux:
```bash
cp server/.env.example server/.env
```

The project works without API credentials using built-in FAQ responses. To enable AI, fill in:
- `AI_API_KEY`
- `AI_BASE_URL` (provider's OpenAI-compatible base URL)
- `AI_MODEL` (model name supported by your provider)

Never put secret API keys in React/client files or commit `.env` to GitHub.

To save chat history in MongoDB, set `MONGODB_URI`. Without it, chat still works but is not persisted.

## 3. Run the app
From the project root:

```bash
npm run dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

The backend runs on `http://localhost:5000`.

## 4. Test the API
```bash
curl http://localhost:5000/api/health
```

Example chat request:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"How can I prepare for exams?\"}"
```

## Project structure
```text
student-helpdesk-chatbot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   └── package.json
├── server/                 # Express backend
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── package.json
└── README.md
```

## Presentation flow
1. Introduce the problem: students need quick, accessible academic support.
2. Show the dashboard and quick question buttons.
3. Ask a question in the chat and show the response.
4. Explain React frontend → Express API → AI provider / FAQ fallback.
5. Explain optional MongoDB conversation storage and future improvements.

## Important notes
- This is a student project starter, not an official college service.
- The built-in FAQ responses are sample guidance; students should verify dates, fees, policies, and official announcements with their institution.
- Add authentication, moderation, rate limiting, and privacy controls before deploying for real students.
