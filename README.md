# CareerAI 🧭

An AI-powered Resume Analyzer, Job Matcher, and **Deadline-Aware Career GPS** built with React + Vite.

## Features

- 📄 **Resume Analyzer** — ATS score, skill extraction, strengths & weaknesses
- 🎯 **Job Matcher** — Match % against any job description, matched vs missing skills
- 🧭 **Career GPS** — Set an application deadline and get a personalized day-by-day preparation plan
- 💼 **Job Listings** — Browse tech companies and apply
- 🤖 **AI Chatbot** — Real-time career advice from an in-app AI assistant

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Gemini API / OpenAI API (with smart local NLP fallback)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables (optional)

Create `frontend/.env`:
```
VITE_GEMINI_API_KEY=your_gemini_key_here
# or
VITE_OPENAI_API_KEY=your_openai_key_here
```

Without an API key the app uses a built-in local NLP engine for demo purposes.
