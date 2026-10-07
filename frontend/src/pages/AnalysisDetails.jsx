import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { Loader2, ArrowLeft, Trash2 } from 'lucide-react';

export default function AnalysisDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const fetchDetail = async () => {
        try {
            const res = await api.get(`analyses/${id}/`);
            setData(res.data);
        } catch (err) {
            setError("Failed to load details.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this analysis?")) {
            try {
                await api.delete(`analyses/${id}/`);
                navigate('/history');
            } catch (err) {
                alert("Failed to delete.");
            }
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin w-10 h-10 text-blue-500" /></div>;
    if (error) return <div className="text-rose-500 text-center mt-20">{error}</div>;
    if (!data) return null;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Link to="/history" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit transition">
                <ArrowLeft size={16} /> Back to History
            </Link>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Analysis Details</h1>
                <button onClick={handleDelete} className="text-rose-400 hover:text-rose-300 flex items-center gap-2 transition">
                    <Trash2 size={16} /> Delete
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 flex flex-col items-center">
                    <span className="text-gray-400 text-sm mb-1">Sentiment</span>
                    <span className={`text-xl font-bold ${data.sentiment === 'Positive' ? 'text-emerald-400' : data.sentiment === 'Negative' ? 'text-rose-400' : 'text-gray-300'}`}>
                        {data.sentiment}
                    </span>
                </div>
                <div className="glass-card p-6 flex flex-col items-center">
                    <span className="text-gray-400 text-sm mb-1">Confidence</span>
                    <span className="text-xl font-bold">{Math.round(data.confidence * 100)}%</span>
                </div>
                <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-gray-400 text-sm">Created At</span>
                    <span className="text-md font-medium text-gray-200">{new Date(data.created_at).toLocaleString()}</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-blue-400 mb-3">AI Summary</h2>
                    <p className="text-gray-200 leading-relaxed italic bg-blue-900/10 p-4 rounded-lg border border-blue-500/20">
                        "{data.summary}"
                    </p>
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-gray-300 mb-3">Original Text</h2>
                    <div className="text-gray-400 bg-black/30 p-4 rounded-lg whitespace-pre-wrap max-h-96 overflow-y-auto">
                        {data.original_text}
                    </div>
                    <div className="mt-4 text-xs text-gray-500 flex gap-4">
                        <span>Words: {data.word_count}</span>
                        <span>Characters: {data.character_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
