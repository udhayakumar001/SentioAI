import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import History from './pages/History';
import AnalysisDetails from './pages/AnalysisDetails';
import About from './pages/About';
import { Brain, LayoutDashboard, History as HistoryIcon, Info, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const getNavClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${isActive
      ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <Router>
      <div className="flex flex-col min-h-screen relative z-10">

        {/* Floating Navbar */}
        <header className="sticky top-6 z-50 px-4 sm:px-6 w-full max-w-5xl mx-auto">
          <nav className="glass-card flex items-center justify-between px-6 py-3">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-blue-500 to-violet-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Sentio<span className="text-blue-400">AI</span></span>
            </NavLink>

            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/analyzer" className={getNavClass}>
                <LayoutDashboard size={18} /> Analyzer
              </NavLink>
              <NavLink to="/history" className={getNavClass}>
                <HistoryIcon size={18} /> History
              </NavLink>
              <NavLink to="/about" className={getNavClass}>
                <Info size={18} /> About
              </NavLink>
            </div>

            <NavLink to="/analyzer" className="hidden md:flex glow-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-white items-center gap-2">
              <Sparkles size={16} /> Try AI Now
            </NavLink>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/history" element={<History />} />
            <Route path="/analyses/:id" element={<AnalysisDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-8 mt-12 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} SentioAI. Built for Sentiment & Summarization.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
