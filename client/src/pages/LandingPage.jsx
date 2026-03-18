import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileSearch, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden selection:bg-blue-500/30">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileSearch className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            NexusAI
          </span>
        </div>
        <Button onClick={() => navigate('/app')} className="rounded-full px-6">
          Dashboard
        </Button>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-800 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-300">AI Screening Engine 2.0 Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight"
        >
          Screen thousands of resumes in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">milliseconds.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl"
        >
          Upload bulk resumes and let our advanced AI models instantly extract skills, rank candidates, and find the perfect match for your roles.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex sm:flex-row flex-col items-center gap-4"
        >
          <Button onClick={() => navigate('/app')} size="lg" className="rounded-full w-full sm:w-auto text-base group gap-2 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            Start Screening Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto text-base">
            View Documentation
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl w-full text-left"
        >
          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-blue-500/20">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-100">Zero Limits</h3>
            <p className="mt-2 text-gray-400">Drag and drop hundreds of PDFs in one go. Our parallel processing engine handles bulk uploads effortlessly.</p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
            <div className="bg-purple-500/10 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-purple-500/20">
              <FileSearch className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-100">Deep Extraction</h3>
            <p className="mt-2 text-gray-400">Context-aware NLP models pull out exact skills, experience timelines, and semantic relevancy instantly.</p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
            <div className="bg-cyan-500/10 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-100">Unbiased Ranking</h3>
            <p className="mt-2 text-gray-400">Standardized scoring ensures candidates are judged purely on merit, skills, and objective matching metrics.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
