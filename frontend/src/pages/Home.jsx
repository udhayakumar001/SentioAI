import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Zap, Shield, History, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh]">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl text-center flex flex-col items-center relative"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-blue-300 mb-8 max-w-fit shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20">
                    <Sparkles size={14} className="text-blue-400" />
                    <span>SentioAI 2.0 is now live</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
                    Understand Text Like <br className="hidden md:block" />
                    <span className="text-gradient">Never Before</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
                    Experience the next generation of Natural Language Processing. Get instant sentiment mapping and high-quality, AI-driven summaries of complex texts.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
                    <Link to="/analyzer" className="glow-btn px-8 py-4 rounded-xl text-lg font-semibold w-full sm:w-auto flex items-center justify-center gap-2">
                        Start Analyzing <ChevronRight size={20} />
                    </Link>
                    <Link to="/about" className="glass-card px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto text-gray-200">
                        Learn More
                    </Link>
                </div>
            </motion.div>

            {/* Feature Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 w-full max-w-6xl"
            >
                {[
                    { icon: Brain, title: "Smart Analysis", desc: "Powered by advanced NLP models.", color: "text-blue-400" },
                    { icon: Zap, title: "Lightning Fast", desc: "Get real-time insights in seconds.", color: "text-amber-400" },
                    { icon: Shield, title: "Highly Secure", desc: "Your data is only stored for your history.", color: "text-emerald-400" },
                    { icon: History, title: "Track Everything", desc: "Review your past analyses anytime.", color: "text-violet-400" }
                ].map((feature, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="glass-card p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 group"
                    >
                        <div className={`p-3 rounded-xl bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md ${feature.color.replace('text', 'shadow')}/10`}>
                            <feature.icon className={`w-8 h-8 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
