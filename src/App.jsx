import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  FileText,
  Github,
  Check,
  Zap,
  Brain,
  Target,
  ArrowRight,
  Quote,
  Sparkles,
} from 'lucide-react';

import comparisonVideo from './assets/simplemem-new.mp4';
import logoIcon from '/Fig_icon.png';
import frameworkDiagram from '/Fig_framework.png';
import tradeoffChart from '/Fig_tradeoff.png';
import uncLogo from './assets/1_unc_logo.png';
import ucbLogo from './assets/2_ucb_logo.png';
import ucscLogo from './assets/3_ucsc_logo.png';

const SimpleMem = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef(null);

  const bibtexContent = `@article{simplemem2025,
  title={SimpleMem: Efficient Lifelong Memory for LLM Agents},
  author={Liu, Jiaqi and Su, Yaofeng and Xia, Peng and Han, Siwei and Zheng, Zeyu and Xie, Cihang and Ding, Mingyu and Yao, Huaxiu},
  journal={arXiv preprint arXiv:2601.02553},
  year={2025}
}`;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(bibtexContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <Brain size={24} className="text-slate-950" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              SimpleMem
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#features" className="hover:text-teal-400 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#demo" className="hover:text-teal-400 transition-colors text-sm font-medium">
              Demo
            </a>
            <a href="#performance" className="hover:text-teal-400 transition-colors text-sm font-medium">
              Performance
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Logo Icon */}
            {/* <div className="mb-12 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
                <img
                  src={logoIcon}
                  alt="SimpleMem Logo"
                  className="relative w-full max-w-xl h-auto"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(20, 184, 166, 0.3))' }}
                />
              </div>
            </div> */}

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-8">
              <Sparkles size={16} className="text-teal-400" />
              <span className="text-sm text-teal-400 font-medium">
                30× More Efficient Than Traditional Methods
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Efficient Lifelong Memory
              <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                for LLM Agents
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              SimpleMem transforms how AI agents remember. Through semantic compression and adaptive retrieval,
              achieve <span className="text-teal-400 font-semibold">43.24% F1 score</span> while using <span className="text-cyan-400 font-semibold">98% fewer tokens</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="https://arxiv.org/abs/2601.02553"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all font-semibold"
              >
                <FileText size={20} />
                <span>Read Paper</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://github.com/aiming-lab/SimpleMem"
                className="flex items-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-teal-500/50 transition-all font-semibold"
              >
                <Github size={20} />
                <span>View Code</span>
              </a>

              <button
                onClick={handleCopyBibtex}
                className="flex items-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-teal-500/50 transition-all font-semibold"
              >
                {copied ? (
                  <>
                    <Check size={20} className="text-teal-400" />
                    <span className="text-teal-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Quote size={20} />
                    <span>Cite</span>
                  </>
                )}
              </button>
            </div>

            {/* Author info */}
            <div className="text-slate-500">
              <p className="mb-4 text-xl">
                <span className="text-slate-300">Jiaqi Liu*</span>, <span className="text-slate-300">Yaofeng Su*</span>, Peng Xia, Siwei Han, Zeyu Zheng, Cihang Xie, Mingyu Ding, Huaxiu Yao
              </p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <img src={uncLogo} alt="UNC-Chapel Hill" className="h-10 w-auto" />
                  <span className="text-lg text-slate-400">UNC-Chapel Hill</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={ucbLogo} alt="UC Berkeley" className="h-10 w-auto" />
                  <span className="text-lg text-slate-400">UC Berkeley</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={ucscLogo} alt="UC Santa Cruz" className="h-10 w-auto" />
                  <span className="text-lg text-slate-400">UC Santa Cruz</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-teal-500/50 transition-all">
              <div className="text-5xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                30×
              </div>
              <div className="text-slate-300 font-semibold mb-2">Token Reduction</div>
              <div className="text-sm text-slate-500">
                531 tokens vs 16,910 for full context
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
              <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
              +26.4%
              </div>
              <div className="text-slate-300 font-semibold mb-2">Average F1 Score</div>
              <div className="text-sm text-slate-500">
                improvement over Mem0
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                50.2 %
              </div>
              <div className="text-slate-300 font-semibold mb-2">Faster Retrieval</div>
              <div className="text-sm text-slate-500">
                388.3s vs 583.4s for Mem0
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Three-Stage Pipeline
            </h2>
            <p className="text-xl text-slate-400">
              Semantic lossless compression for maximum efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Stage 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-teal-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Zap size={32} className="text-white" />
                </div>
                <div className="text-sm text-teal-400 font-bold mb-2">STAGE 1</div>
                <h3 className="text-2xl font-bold mb-4">Semantic Compression</h3>
                <p className="text-slate-400 mb-6">
                  Entropy-based filtering transforms raw dialogue into atomic facts with resolved coreferences and absolute timestamps.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    <span>De-linearization</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    <span>Temporal normalization</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    <span>Noise filtering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Brain size={32} className="text-white" />
                </div>
                <div className="text-sm text-cyan-400 font-bold mb-2">STAGE 2</div>
                <h3 className="text-2xl font-bold mb-4">Structured Indexing</h3>
                <p className="text-slate-400 mb-6">
                  Multi-view indexing across semantic, lexical, and symbolic layers enables precise multi-granular retrieval.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Dense embeddings</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Sparse keywords</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Symbolic metadata</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Target size={32} className="text-white" />
                </div>
                <div className="text-sm text-blue-400 font-bold mb-2">STAGE 3</div>
                <h3 className="text-2xl font-bold mb-4">Adaptive Retrieval</h3>
                <p className="text-slate-400 mb-6">
                  Complexity-aware pruning dynamically adjusts retrieval depth based on query complexity for optimal efficiency.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span>Query complexity estimation</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span>Dynamic depth modulation</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span>Hybrid scoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Framework Diagram */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black mb-3">
                Architecture Overview
              </h3>
              <p className="text-lg text-slate-400">
                A three-stage pipeline for efficient lifelong memory through semantic lossless compression
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                <img
                  src={frameworkDiagram}
                  alt="SimpleMem Framework Architecture"
                  className="w-full h-auto rounded-2xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(20, 184, 166, 0.2))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              See SimpleMem in Action
            </h2>
            <p className="text-xl text-slate-400">
              Side-by-side comparison with baseline approach
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden">
            {/* Control Bar */}
            <div className="bg-slate-900/50 px-8 py-6 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm text-slate-400 font-mono">LoCoMo Dataset Sample</span>
              </div>
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all font-semibold"
              >
                {isPlaying ? (
                  <>
                    <Pause size={18} fill="currentColor" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={18} fill="currentColor" />
                    <span>Play Comparison</span>
                  </>
                )}
              </button>
            </div>

            {/* Video Section */}
            <div className="p-8">
              <div
                className="relative aspect-[3800/1080] bg-slate-900 rounded-xl overflow-hidden group mb-8 ring-2 ring-teal-500/30 cursor-pointer"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  onEnded={() => setIsPlaying(false)}
                  src={comparisonVideo}
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all pointer-events-none">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/50">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Comparison Stats */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Baseline */}
                <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Mem0</h3>
                      <div className="text-sm text-slate-500">Baseline Approach</div>
                    </div>
                    <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                      <span className="text-xs font-bold text-red-400">34.20% F1</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400">Token Cost</span>
                      <span className="font-semibold text-red-400">985 tokens</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400">Retrieval Time</span>
                      <span className="font-semibold text-red-400">583.4s</span>
                    </div>
                  </div>
                </div>

                {/* SimpleMem */}
                <div className="p-6 bg-gradient-to-br from-teal-950/20 to-cyan-950/20 rounded-xl border border-teal-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                        SimpleMem
                      </h3>
                      <div className="text-sm text-teal-400">Our Approach</div>
                    </div>
                    <div className="px-3 py-1 bg-teal-500/20 border border-teal-500/50 rounded-full">
                      <span className="text-xs font-bold text-teal-400">43.24% F1</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-teal-950/30 rounded-lg border border-teal-500/20">
                      <span className="text-slate-400">Token Cost</span>
                      <span className="font-semibold text-teal-400">531 tokens</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-teal-950/30 rounded-lg border border-teal-500/20">
                      <span className="text-slate-400">Retrieval Time</span>
                      <span className="font-semibold text-teal-400">388.3s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Performance vs Efficiency
            </h2>
            <p className="text-xl text-slate-400">
              SimpleMem achieves superior F1 score with minimal token cost
            </p>
          </div>

          {/* Tradeoff Chart */}
          <div className="mb-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                <img
                  src={tradeoffChart}
                  alt="Performance vs Efficiency Trade-off"
                  className="w-full h-auto rounded-2xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(20, 184, 166, 0.2))' }}
                />
                <div className="mt-6 text-center">
                  <p className="text-slate-400 italic">
                    SimpleMem achieves superior F1 score (43.24%) with minimal token cost (~550), occupying the ideal top-left position
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benchmark Table */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black mb-3">
              Benchmark Results
            </h3>
            <p className="text-lg text-slate-400">
              LoCoMo Dataset • GPT-4.1-mini
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-8 py-5 text-sm font-semibold text-slate-400">Method</th>
                    <th className="text-center px-6 py-5 text-sm font-semibold text-slate-400">MultiHop F1</th>
                    <th className="text-center px-6 py-5 text-sm font-semibold text-slate-400">Temporal F1</th>
                    <th className="text-center px-6 py-5 text-sm font-semibold text-slate-400">SingleHop F1</th>
                    <th className="text-center px-6 py-5 text-sm font-semibold text-slate-400">Average F1</th>
                    <th className="text-center px-6 py-5 text-sm font-semibold text-slate-400">Token Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-5 font-medium">A-Mem</td>
                    <td className="text-center px-6 py-5 text-slate-400">25.06%</td>
                    <td className="text-center px-6 py-5 text-slate-400">51.01%</td>
                    <td className="text-center px-6 py-5 text-slate-400">41.02%</td>
                    <td className="text-center px-6 py-5 text-slate-400">32.58%</td>
                    <td className="text-center px-6 py-5 text-slate-400">2,520</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-5 font-medium">LightMem</td>
                    <td className="text-center px-6 py-5 text-slate-400">24.96%</td>
                    <td className="text-center px-6 py-5 text-slate-400">20.55%</td>
                    <td className="text-center px-6 py-5 text-slate-400">33.79%</td>
                    <td className="text-center px-6 py-5 text-slate-400">24.63%</td>
                    <td className="text-center px-6 py-5 text-slate-400">612</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-5 font-medium">Mem0</td>
                    <td className="text-center px-6 py-5 text-slate-400">30.14%</td>
                    <td className="text-center px-6 py-5 text-slate-400">48.91%</td>
                    <td className="text-center px-6 py-5 text-slate-400">41.30%</td>
                    <td className="text-center px-6 py-5 text-slate-400">34.20%</td>
                    <td className="text-center px-6 py-5 text-slate-400">973</td>
                  </tr>
                  <tr className="bg-gradient-to-r from-teal-950/30 to-cyan-950/30 border-t-2 border-teal-500/50">
                    <td className="px-8 py-5 font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      SimpleMem
                    </td>
                    <td className="text-center px-6 py-5 font-bold text-teal-400">43.46%</td>
                    <td className="text-center px-6 py-5 font-bold text-teal-400">58.62%</td>
                    <td className="text-center px-6 py-5 font-bold text-teal-400">51.12%</td>
                    <td className="text-center px-6 py-5 font-bold text-teal-400">43.24%</td>
                    <td className="text-center px-6 py-5 font-bold text-teal-400">531</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-teal-400 mb-2">+26.4%</div>
              <div className="text-sm text-slate-400">vs Mem0</div>
            </div>
            <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-cyan-400 mb-2">+75.6%</div>
              <div className="text-sm text-slate-400">vs LightMem</div>
            </div>
            <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">45%</div>
              <div className="text-sm text-slate-400">Token Savings</div>
            </div>
            <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">33%</div>
              <div className="text-sm text-slate-400">Faster Retrieval</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Explore the code, read the paper, or integrate SimpleMem into your AI agents today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/aiming-lab/SimpleMem"
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all font-semibold"
                >
                  <Github size={20} />
                  <span>Star on GitHub</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://arxiv.org/abs/2601.02553"
                  className="flex items-center gap-2 px-8 py-4 bg-slate-700/50 border border-slate-600 rounded-xl hover:bg-slate-700 hover:border-teal-500/50 transition-all font-semibold"
                >
                  <FileText size={20} />
                  <span>Read the Paper</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Brain size={18} className="text-slate-950" />
              </div>
              <span className="font-bold text-lg">SimpleMem</span>
            </div>
            <div className="text-sm text-slate-500">
              © 2025 SimpleMem Project. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/aiming-lab/SimpleMem" className="text-slate-400 hover:text-teal-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://arxiv.org/abs/2601.02553" className="text-slate-400 hover:text-teal-400 transition-colors">
                <FileText size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleMem;
