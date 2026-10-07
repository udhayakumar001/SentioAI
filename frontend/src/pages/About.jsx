import React from 'react';

export default function About() {
    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                About SentioAI
            </h1>

            <div className="glass-card p-8 space-y-6 text-gray-300 leading-relaxed">
                <p>
                    <strong>SentioAI</strong> is a comprehensive artificial intelligence platform designed to instantly analyze and summarize large volumes of text. Built as a portfolio project for a Full Stack Developer specializing in AI and NLP, it demonstrates the integration of modern web technologies with advanced machine learning models.
                </p>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-gray-800 pb-2">Tech Stack</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong>Frontend:</strong> React 18, Vite, Tailwind CSS, Framer Motion, Recharts.</li>
                    <li><strong>Backend:</strong> Python, Django, Django REST Framework.</li>
                    <li><strong>Database:</strong> MySQL (SQLite fallback for simple dev environments).</li>
                    <li><strong>AI/NLP:</strong> NLTK VADER (Sentiment Analysis), Hugging Face Transformers (Falconsai for Summarization).</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8 mb-4 border-b border-gray-800 pb-2">Architecture</h2>
                <p>
                    The application uses a decoupled architecture where the React frontend communicates via Axios with a robust Django REST API. The backend delegates complex natural language processing tasks to isolated service classes, ensuring high maintainability and adhering to solid software engineering principles.
                </p>
            </div>
        </div>
    );
}
