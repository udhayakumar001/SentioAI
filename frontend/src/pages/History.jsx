import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Loader2, Calendar, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('analyses/');
            setHistory(res.data);
        } catch (err) {
            setError("Failed to load history.");
        } finally {
            setLoading(false);
        }
    };

    const sentimentData = [
        { name: 'Positive', value: history.filter(h => h.sentiment === 'Positive').length, color: '#34d399' },
        { name: 'Neutral', value: history.filter(h => h.sentiment === 'Neutral').length, color: '#9ca3af' },
        { name: 'Negative', value: history.filter(h => h.sentiment === 'Negative').length, color: '#fb7185' },
    ].filter(d => d.value > 0);

    if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin w-10 h-10 text-blue-500" /></div>;
    if (error) return <div className="text-rose-500 text-center mt-20">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard & History</h1>

            <div className="grid md:grid-cols-4 gap-6 mb-10">
                <div className="glass-card p-6 flex flex-col items-center">
                    <span className="text-gray-400">Total Analyses</span>
                    <span className="text-4xl font-bold mt-2">{history.length}</span>
                </div>
                <div className="md:col-span-3 glass-card p-4 h-48 flex items-center justify-center">
                    {history.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <span className="text-gray-500">No data for chart</span>
                    )}
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 border-b border-gray-800 pb-2">Recent Analyses</h2>
            {history.length === 0 ? (
                <div className="text-center text-gray-500 py-10 glass-card">
                    No analyses found. <Link to="/analyzer" className="text-blue-400 hover:underline">Create one!</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.map(item => (
                        <Link to={`/analyses/${item.id}`} key={item.id} className="glass-card p-5 hover:bg-white/10 transition group">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${item.sentiment === 'Positive' ? 'bg-emerald-500/20 text-emerald-300' : item.sentiment === 'Negative' ? 'bg-rose-500/20 text-rose-300' : 'bg-gray-500/20 text-gray-300'}`}>
                                    {item.sentiment}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar size={12} /> {new Date(item.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-1">
                                {item.summary}
                            </p>
                            <div className="text-xs text-gray-500 flex items-center gap-4">
                                <span className="flex items-center gap-1"><FileText size={12} /> {item.word_count} words</span>
                                <span>{item.confidence * 100}% Conf</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
