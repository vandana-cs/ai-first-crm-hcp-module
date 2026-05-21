```md
# AI CRM SaaS - Doctor Interaction Assistant

## 🚀 Project Overview
This is a full-stack AI-powered CRM SaaS application for managing doctor-patient interactions using FastAPI backend and React frontend with Groq LLM integration.

---

## 🏗️ Tech Stack

### Frontend:
- React (Vite)
- Tailwind CSS
- Axios / Fetch API

### Backend:
- FastAPI
- SQLite Database
- Groq AI (LLM)

### Deployment:
- Backend: Render
- Frontend: Vercel
- Version Control: GitHub

---

## ⚙️ Features

- Doctor interaction logging
- AI-generated responses using LLM
- Interaction history tracking
- Delete interactions
- SaaS-style dashboard UI
- API integration between frontend & backend

```md id="klb6bp"
## 🤖 LangGraph AI Agent

The application uses a LangGraph-based AI workflow agent to manage HCP interactions intelligently.

### LangGraph Agent Responsibilities
- Process conversational interaction logs
- Summarize doctor interactions
- Extract important medical entities
- Suggest follow-up actions
- Maintain interaction workflow state

---

## 🛠️ LangGraph Tools

### 1. Log Interaction Tool
Captures doctor interaction data, summarizes notes using Groq LLM, and stores interaction history.

### 2. Edit Interaction Tool
Allows updating or correcting previously logged interaction records.

### 3. Fetch Interaction History Tool
Retrieves historical doctor interactions for context-aware engagement.

### 4. AI Follow-up Suggestion Tool
Generates next-best-action recommendations for field representatives.

### 5. Doctor Insight Tool
Analyzes interaction trends and generates HCP engagement insights.

---

## 🧠 LLM Model Used
- Groq gemma2-9b-it
- llama3-8b-8192
```

---

## 🔗 API Endpoints

### Backend Base URL:
```

https://ai-crm-backend-1zaq.onrender.com

````

### Endpoints:
- POST `/chat`
- GET `/interactions`
- DELETE `/interactions/{id}`
- POST `/login`
- POST `/register`

---

## 💻 How to Run Locally

### Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
````

### Frontend:

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment Links

* Frontend (Vercel): https://ai-first-crm-hcp-module-hv5n.vercel.app/
* Backend (Render): https://ai-crm-backend-1zaq.onrender.com

---

## 👨‍💻 Author

Vandana C S

---

## 📌 Status

Project completed and deployed successfully.

```
```
