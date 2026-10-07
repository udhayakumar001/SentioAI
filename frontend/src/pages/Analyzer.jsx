import React, { useState } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, CheckCircle2, TrendingUp, TrendingDown, Minus, Sparkles, Copy } from 'lucide-react';

export default function Analyzer() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);

    const getWordCount = (str) => str.trim().split(/\s+/).filter(w => w.length > 0).length;
    const getCharCount = (str) => str.length;

    const handleAnalyze = async () => {
        if (getWordCount(text) < 3) {
            setError("Please enter at least 3 words for meaningful analysis.");
            return;
        }
        setError(null);
        setLoading(true);
        setResult(null);
        try {
            const response = await api.post('analyze/', { text });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (result?.summary) {
            navigator.clipboard.writeText(result.summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getSentimentIcon = (sentiment) => {
        if (sentiment === 'Positive') return <TrendingUp className="text-emerald-400 w-12 h-12" />;
        if (sentiment === 'Negative') return <TrendingDown className="text-rose-400 w-12 h-12" />;
        return <Minus className="text-gray-400 w-12 h-12" />;
    };

    const getSentimentColor = (sentiment) => {
        if (sentiment === 'Positive') return "text-emerald-400 shadow-emerald-500/20";
        if (sentiment === 'Negative') return "text-rose-400 shadow-rose-500/20";
        return "text-gray-300 shadow-gray-500/20";
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight"><span className="text-gradient">AI Text Analyzer</span></h1>
                <p className="text-gray-400 text-lg">Uncover the sentiments and core message hidden in your text.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-2 mb-8 relative rounded-2xl bg-white/[0.02]">
                <div className="p-4 bg-black/40 rounded-xl relative">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your article, review, or document here (recommended >30 words for summarization)..."
                        className="w-full h-64 bg-transparent border-none rounded-lg text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-0 resize-none text-lg leading-relaxed"
                        disabled={loading}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 pb-2 gap-4">
                    <div className="text-sm font-medium text-gray-500 flex gap-6">
                        <span className="flex items-center gap-1.5"><span className="text-blue-400">{getWordCount(text)}</span> Words</span>
                        <span className="flex items-center gap-1.5"><span className="text-violet-400">{getCharCount(text)}</span> Characters</span>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => { setText(''); setResult(null); setError(null); }}
                            className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition w-full sm:w-auto"
                            disabled={loading}
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || text.trim().length === 0}
                            className="glow-btn px-8 py-2.5 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 min-w-[160px] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Processing...</> : <><Sparkles className="w-5 h-5" /> Analyze</>}
                        </button>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence mode='wait'>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-4 rounded-xl flex items-center gap-3 mb-8 overflow-hidden"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="font-medium">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode='wait'>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="grid md:grid-cols-3 gap-6">

                            {/* Sentiment Card */}
                            <div className={`md:col-span-2 glass-card p-8 flex items-center gap-8 relative overflow-hidden group shadow-lg ${getSentimentColor(result.sentiment)}`}>
                                <div className="absolute right-0 top-0 -mt-10 -mr-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                                    {getSentimentIcon(result.sentiment)}
                                </div>

                                <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/5 shadow-inner">
                                    {getSentimentIcon(result.sentiment)}
                                </div>
                                <div>
                                    <h4 className="text-gray-400 font-medium mb-1 uppercase tracking-wider text-sm">Detected Sentiment</h4>
                                    <h3 className={`text-4xl font-extrabold tracking-tight ${getSentimentColor(result.sentiment).split(' ')[0]}`}>
                                        {result.sentiment}
                                    </h3>
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${result.confidence * 100}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className={`h-full ${result.sentiment === 'Positive' ? 'bg-emerald-500' : result.sentiment === 'Negative' ? 'bg-rose-500' : 'bg-gray-400'}`}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-300">{Math.round(result.confidence * 100)}% Confidence</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="glass-card p-8 flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <h4 className="text-gray-400 font-medium mb-4 uppercase tracking-wider text-sm">Text Metrics</h4>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                        <span className="text-gray-500">Words</span>
                                        <span className="text-2xl font-bold text-gray-200">{result.word_count}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-500">Characters</span>
                                        <span className="text-2xl font-bold text-gray-200">{result.character_count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="glass-card p-8 mt-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6 text-blue-400" /> Executive Summary
                                </h3>
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-2 text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition border border-white/5 group"
                                >
                                    {copied ? <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={16} /> Copied</span> : <span className="text-gray-300 group-hover:text-white flex items-center gap-1"><Copy size={16} /> Copy Text</span>}
                                </button>
                            </div>

                            <div className="bg-black/30 p-6 rounded-xl border border-white/5 shadow-inner">
                                <p className="text-gray-200 leading-loose text-lg font-light italic">
                                    "{result.summary}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
