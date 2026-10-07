# SentioAI — Sentiment Analysis & Text Summarization Platform

![SentioAI Banner](https://via.placeholder.com/1200x400.png?text=SentioAI)

## Overview
SentioAI is a full-stack, production-style platform designed to provide instant sentiment classification and AI-driven summarization for raw text. This serves as a portfolio project showcasing proficiency in Full-Stack Python development paired with Natural Language Processing.

## Features
- **Instant Sentiment Analysis**: Classifies text as Positive, Negative, or Neutral with a confidence score.
- **AI Text Summarization**: Extracts the most important information using a lightweight Hugging Face Transformer.
- **History & Dashboard**: An interactive dashboard with analytics on all processed text.
- **Modern UI**: A responsive, premium dark-mode interface built with React and Tailwind CSS.
- **RESTful API**: A fully decoupled Django REST Framework backend.

## Architecture
```
React Frontend (Vite) → Axios → Django REST API → NLP Service Layer → SQLite/MySQL Database
```

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Python 3, Django, Django REST Framework
- **Database**: SQLite (default for easy setup) / MySQL (Production ready)
- **AI/NLP**: NLTK VADER (Sentiment), Hugging Face Transformers `Falconsai/text_summarization` (Summarization)

## Project Structure
```
backend/
├── analyzer/ (Django App & NLP Services)
├── backend/ (Django Config)
└── manage.py

frontend/
├── src/ (React Components & Pages)
├── package.json
└── vite.config.js
```

## Installation

### Backend Setup
1. Open terminal and navigate to `backend/`
2. Create virtual environment: `python -m venv venv`
3. Activate virtual environment:
   - Windows: `.\venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. Copy `.env.example` to `.env` for local development.
5. Install requirements: `pip install -r requirements.txt`
6. Migrate database: `python manage.py migrate`
7. Start server: `python manage.py runserver`

### Frontend Setup
1. Open a new terminal and navigate to `frontend/`
2. Install Node dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

## MySQL Configuration
If you want to use MySQL instead of SQLite:
1. Ensure MySQL is running on your machine.
2. Edit `backend/.env` and update the database credentials.
3. Set `DB_ENGINE=django.db.backends.mysql`.

## Environment Variables
Environment variables for the backend are handled through `.env`. Check `.env.example` in the `backend/` directory for configuration options.

## Free Demo Deployment

The repository includes starter deployment configuration for a personal, non-commercial demo:

- **Frontend:** Vercel Hobby. Set the project root to `frontend` and configure `VITE_API_BASE_URL` to the deployed API URL ending in `/api/`. `frontend/vercel.json` routes client-side React paths back to the app.
- **Backend:** Render Free using the root-level `render.yaml` Blueprint. It builds from `backend/`, collects static files, runs database migrations, and starts Django with Gunicorn. Render generates `SECRET_KEY`; provide a Neon PostgreSQL connection string as `DATABASE_URL` and the deployed Vercel origin as `CORS_ALLOWED_ORIGINS`.
- **Database:** Neon Free PostgreSQL. Use the pooled connection string from Neon for `DATABASE_URL`. Its compute scales to zero after inactivity, so the first request may be delayed.

Render Free services sleep after 15 minutes without traffic and have ephemeral local storage. Do not use SQLite for hosted history. Free database and web-service limits can change; check each provider's current terms before launch. The Hugging Face summarizer downloads and loads a PyTorch model, which may exceed Render Free's memory or respond slowly on a cold start. Confirm real analyzer requests work at runtime; if not, the summarizer will need a hosted inference service or a higher-memory backend.

Vercel Hobby is restricted to personal, non-commercial use. The Vercel project must be connected to a Git repository; the hosting providers also require you to authorize access to your accounts. Never commit production secrets or `.env` files.

## API Endpoints
- `GET /api/analyses/` - Retrieve all history records.
- `GET /api/analyses/<id>/` - Retrieve a single analysis record.
- `POST /api/analyze/` - Submit text for processing.
- `DELETE /api/analyses/<id>/` - Delete a record.

## Example API Request
```json
POST /api/analyze/
{
  "text": "I absolutely loved this product! It was incredibly easy to use and saved me a lot of time."
}
```

## Author
Developed by the Antigravity Agent.
