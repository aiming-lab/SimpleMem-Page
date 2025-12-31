import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  FileText,
  Github,
  Check,
  Database,
  Cpu,
  Layers,
  Brain,
  Search,
  Quote,
} from 'lucide-react';

import baselineVideo from './assets/mem0.mp4';
import simplememVideo from './assets/simplemem.mp4';

const SimpleMemProjectPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Refs for video elements
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  // BibTeX 内容
  const bibtexContent = `@article{simplemem2025,
  title={SimpleMem: Episodic Memory for Lifelong Agents via Atomic Encoding and Orthogonal Indexing},
  author={Author One and Author Two and Author Three and Author Four},
  journal={arXiv preprint arXiv:2504.xxxxx},
  year={2025}
}`;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(bibtexContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 同步控制两个视频播放
  const togglePlay = () => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;

    if (v1 && v2) {
      if (isPlaying) {
        v1.pause();
        v2.pause();
      } else {
        v1.play();
        v2.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 对比数据
  const comparisonData = {
    mem0: {
      title: 'Mem0 (Baseline)',
      metrics: { f1: '40.99%', cost: 'High (985 tokens)' },
    },
    simplemem: {
      title: 'SimpleMem (Ours)',
      metrics: { f1: '54.43%', cost: 'Low (550 tokens)' },
    },
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-teal-100 selection:text-teal-900">
      {/* 顶部导航：全宽，内容居中 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-semibold text-xl tracking-tight text-slate-900">
            SimpleMem
          </div>
          <div className="flex space-x-6 text-sm font-medium text-slate-500">
            <a href="#abstract" className="hover:text-teal-600 transition-colors">
              Abstract
            </a>
            <a href="#demo" className="hover:text-teal-600 transition-colors">
              Demo
            </a>
            <a href="#framework" className="hover:text-teal-600 transition-colors">
              Framework
            </a>
            <a href="#method" className="hover:text-teal-600 transition-colors">
              Method
            </a>
            <a href="#results" className="hover:text-teal-600 transition-colors">
              Results
            </a>
          </div>
        </div>
      </nav>

      {/* 中间“论文卡片”区域：flex + justify-center 强制居中 */}
      <main className="pt-24 pb-16 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            {/* 这一整块就是中间白色论文卡片 */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Hero Section */}
              <section className="pt-10 pb-10 px-6 md:px-10 border-b border-slate-100">
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    SimpleMem: Episodic Memory for Lifelong Agents via Atomic Encoding and Orthogonal Indexing
                  </h1>

                  <div className="flex flex-wrap justify-center gap-4 text-lg text-teal-700 mb-8">
                    <span>Author One*</span>
                    <span>Author Two*</span>
                    <span>Author Three</span>
                    <span>Author Four</span>
                  </div>

                  <p className="text-slate-500 mb-8 italic">
                    University of AI Research, Tech Institute
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <FileText size={18} />
                      <span>Paper</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Play size={18} />
                      <span>Interactive Demo</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                    <button
                      onClick={handleCopyBibtex}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-sm hover:shadow-md"
                    >
                      {copied ? (
                        <Check size={18} className="text-teal-600" />
                      ) : (
                        <Quote size={18} />
                      )}
                      <span>{copied ? 'Copied' : 'BibTeX'}</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Abstract */}
              <section
                id="abstract"
                className="py-10 px-6 md:px-10 border-b border-slate-100"
              >
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-4 text-slate-900">Abstract</h2>
                  <p className="text-slate-600 leading-relaxed text-justify">
                    To achieve reliable long-term interaction in complex environments, LLM agents require memory systems to efficiently manage and utilize historical experiences. Existing memory systems often maintain complete interaction histories through passive context extension, which retains massive amounts of redundant information, while agentic workflows that filter noise via iterative loop reasoning incur prohibitive token costs. To address this challenge, we introduce <strong>SimpleMem</strong>, an efficient memory framework grounded in the principle of semantic lossless compression. We propose a three-stage pipeline designed to maximize information density and token utilization: (1) <strong>Semantic Layered Atomization</strong>: We employ an entropy-based non-linear filter to distill raw, unstructured data streams, rejecting low-density noise and decomposing valid dialogue into independent atomic entries indexed across dense, sparse, and symbolic layers; (2) <strong>Recursive Memory Consolidation</strong>: Mimicking biological consolidation, SimpleMem asynchronously integrates fragmented atomic facts into logically synthesized "molecular representations", effectively compressing the semantic space over time; and (3) <strong>Adaptive Orthogonal Retrieval</strong>: By estimating query complexity, the system dynamically modulates retrieval depth and prunes irrelevant search branches to ensure precise, token-efficient context synthesis. Experiments on benchmarks demonstrate that our method surpasses baselines in performance, token consumption, and retrieval speed, achieving an F1 score of 43.24%. Notably, compared to full-context baselines, SimpleMem reduces inference token consumption by <strong>30×</strong>, demonstrating a superior balance between performance and token utilization.
                  </p>
                </div>
              </section>

              {/* Demo Section */}
              <section
                id="demo"
                className="py-10 px-6 md:px-10 border-b border-slate-100 bg-slate-50/60"
              >
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900">
                      Retrieval Performance Comparison
                    </h2>
                    <p className="text-slate-500 mt-2">
                      Comparison of memory retrieval accuracy on the LoCoMo dataset.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                    {/* Control Bar */}
                    <div className="bg-slate-100 px-6 py-4 flex items-center justify-between border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Demo Dataset: LoCoMo Set Sample 0
                        </span>
                      </div>
                      <button
                        onClick={togglePlay}
                        className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm active:scale-95 transform"
                      >
                        {isPlaying ? (
                          <Pause size={18} fill="currentColor" />
                        ) : (
                          <Play size={18} fill="currentColor" />
                        )}
                        {isPlaying ? 'Pause Comparison' : 'Play Comparison'}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      {/* Left Column: Mem0 */}
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-bold text-lg text-slate-800">
                            {comparisonData.mem0.title}
                          </h3>
                          <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-100">
                            Baseline
                          </span>
                        </div>

                        {/* Video 1 */}
                        <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden shadow-inner group">
                          <video
                            ref={videoRef1}
                            className="w-full h-full object-cover opacity-80"
                            playsInline
                            muted
                            onEnded={() => setIsPlaying(false)}
                            src={baselineVideo}
                          />
                          {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                                <Play size={24} className="text-white ml-1" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Pipeline Mem0 */}
                        <div className="mt-8">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                            Pipeline Execution
                          </h4>
                          <div className="relative p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-3 opacity-50">
                                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
                                  <FileText size={20} />
                                </div>
                                <div className="text-sm">Raw Input Stream</div>
                              </div>
                              <div className="h-4 w-0.5 bg-slate-300 mx-5" />
                              <div
                                className={`flex items-center gap-3 transition-all duration-500 ${
                                  isPlaying ? 'opacity-100 scale-105' : 'opacity-50'
                                }`}
                              >
                                <div className="w-10 h-10 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                                  <Layers size={20} />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-slate-800">
                                    Chunking &amp; Graph
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    Store raw fragments
                                  </div>
                                </div>
                              </div>
                              <div className="h-4 w-0.5 bg-slate-300 mx-5" />
                              <div
                                className={`flex items-center gap-3 transition-all duration-500 delay-700 ${
                                  isPlaying ? 'opacity-100 scale-105' : 'opacity-50'
                                }`}
                              >
                                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-500 animate-pulse">
                                  <Search size={20} />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-slate-800">
                                    Iterative Retrieval
                                  </div>
                                  <div className="text-xs text-red-500">
                                    High Latency / Noise
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: SimpleMem */}
                      <div className="p-6 bg-teal-50/40">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-bold text-lg text-teal-900">
                            {comparisonData.simplemem.title}
                          </h3>
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded border border-teal-200">
                            Ours
                          </span>
                        </div>

                        {/* Video 2 */}
                        <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden shadow-lg shadow-teal-100 group ring-4 ring-teal-50">
                          <video
                            ref={videoRef2}
                            className="w-full h-full object-cover opacity-90"
                            playsInline
                            muted
                            onEnded={() => setIsPlaying(false)}
                            src={simplememVideo}
                          />
                          {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
                              <div className="w-12 h-12 bg-teal-500/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30">
                                <Play size={24} className="text-white ml-1" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Pipeline SimpleMem */}
                        <div className="mt-8">
                          <h4 className="text-xs font-bold text-teal-800/60 uppercase tracking-wider mb-4">
                            Pipeline Execution
                          </h4>
                          <div className="relative p-4 bg-white rounded-xl border border-teal-100 shadow-sm">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-3 opacity-50">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                  <FileText size={20} />
                                </div>
                                <div className="text-sm">Raw Input Stream</div>
                              </div>
                              <div className="h-4 w-0.5 bg-slate-200 mx-5" />
                              <div
                                className={`flex items-center gap-3 transition-all duration-500 ${
                                  isPlaying ? 'opacity-100 scale-105' : 'opacity-50'
                                }`}
                              >
                                <div className="w-10 h-10 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-600">
                                  <Cpu size={20} />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-teal-900">
                                    Atomic Encoding
                                  </div>
                                  <div className="text-xs text-teal-600">
                                    Resolves &quot;he/she&quot; &amp; time
                                  </div>
                                </div>
                              </div>
                              <div className="h-4 w-0.5 bg-slate-200 mx-5" />
                              <div
                                className={`flex items-center gap-3 transition-all duration-500 delay-700 ${
                                  isPlaying ? 'opacity-100 scale-105' : 'opacity-50'
                                }`}
                              >
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-500">
                                  <Database size={20} />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-indigo-900">
                                    Orthogonal Indexing
                                  </div>
                                  <div className="text-xs text-indigo-600">
                                    O(1) Precise Lookup
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Metrics in Demo Card */}
                    <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200 bg-slate-50">
                      <div className="p-4 flex flex-col items-center justify-center">
                        <div className="text-xs font-bold text-slate-400 uppercase">
                          F1 Score (Whole Dataset)
                        </div>
                        <div className="text-2xl font-bold text-slate-400">
                          {comparisonData.mem0.metrics.f1}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col items-center justify-center bg-teal-50/50">
                        <div className="text-xs font-bold text-teal-600 uppercase">
                          F1 Score (Whole Dataset)
                        </div>
                        <div className="text-3xl font-bold text-teal-600">
                          {comparisonData.simplemem.metrics.f1}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Framework Overview Section */}
              <section
                id="framework"
                className="py-10 px-6 md:px-10 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/40"
              >
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                    The SimpleMem Architecture
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-justify mb-4">
                      SimpleMem addresses the fundamental challenge of context inflation in long-term LLM interactions through a principled framework grounded in <span className="font-semibold text-teal-700">semantic lossless compression</span>. Unlike existing systems that passively accumulate raw dialogue or rely on expensive iterative reasoning loops, our approach maximizes information density and token utilization through a three-stage pipeline designed to compress, evolve, and efficiently retrieve episodic memories.
                    </p>
                    <p className="text-slate-700 leading-relaxed text-justify mb-4">
                      Drawing inspiration from the Complementary Learning Systems (CLS) theory in cognitive neuroscience, SimpleMem recognizes that effective long-term memory requires more than simple storage—it demands active curation, consolidation, and adaptive access mechanisms. The architecture operates through three tightly integrated stages: <span className="font-semibold text-indigo-700">Semantic Layered Atomization</span> for compression, <span className="font-semibold text-purple-700">Recursive Memory Consolidation</span> for evolution, and <span className="font-semibold text-teal-700">Adaptive Orthogonal Retrieval</span> for utilization. Each stage addresses a specific pathology in existing memory systems while collectively ensuring that the memory substrate remains both semantically rich and computationally tractable.
                    </p>

                    {/* Architecture Diagram */}
                    <div className="my-8 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-teal-50 to-indigo-50 px-6 py-3 border-b border-slate-200">
                        <p className="text-sm font-semibold text-slate-700 text-center">
                          Figure 1: The SimpleMem Three-Stage Pipeline Architecture
                        </p>
                      </div>
                      <div className="p-6 bg-slate-50">
                        <img
                          src="https://via.placeholder.com/1200x500/e2e8f0/475569?text=SimpleMem+Architecture+Diagram+%28Replace+with+actual+figure%29"
                          alt="SimpleMem Architecture: Three-stage pipeline showing (1) Semantic Layered Atomization with entropy-based filtering, (2) Recursive Memory Consolidation clustering atoms into molecular representations, and (3) Adaptive Orthogonal Retrieval with complexity-aware pruning"
                          className="w-full h-auto rounded-lg shadow-sm"
                        />
                      </div>
                      <div className="px-6 py-4 bg-white border-t border-slate-200">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <strong>Figure 1:</strong> SimpleMem mitigates context inflation through three stages. (1) <span className="text-indigo-700 font-semibold">Entropic Atomization</span> compresses high-entropy interactions by removing redundancy and decomposing dialogue into atomic memory units. (2) <span className="text-purple-700 font-semibold">Recursive Consolidation</span> organizes these units into higher-order "molecular" Hyper-Nodes. (3) <span className="text-teal-700 font-semibold">Orthogonal Retrieval</span> adaptively prunes the memory space according to query complexity, maximizing information density.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Method Section - Stage 1 */}
              <section
                id="method"
                className="py-10 px-6 md:px-10 border-b border-slate-100"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Cpu size={22} className="text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Stage 1: Semantic Layered Atomization
                    </h2>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-justify mb-4">
                      The first bottleneck in long-term interaction is what we term <span className="font-semibold">"context inflation"</span>—the accumulation of raw, low-entropy dialogue that dilutes the signal-to-noise ratio of the memory system. Traditional approaches blindly index every conversational turn, resulting in massive redundancy from phatic exchanges, repetitive confirmations, and low-information exchanges. SimpleMem addresses this through an entropy-based gating mechanism that actively filters and restructures information at the source.
                    </p>

                    <div className="bg-slate-50 border-l-4 border-indigo-500 p-5 rounded-r-lg my-6">
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Entropic Filtering</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        We employ a non-linear gating function Φ<sub>gate</sub> to evaluate the information density of incoming dialogue windows. For each sliding window W<sub>t</sub>, the system computes a density score H(W<sub>t</sub>) that balances the emergence of new named entities against semantic divergence from recent history. This metric is formally defined as a weighted combination of entity novelty and semantic deviation, where α controls the relative importance of lexical versus distributional signals.
                      </p>
                      <p className="text-slate-600 text-sm font-mono bg-white p-3 rounded border border-slate-200">
                        H(W<sub>t</sub>) = α · |E<sub>new</sub>| / |W<sub>t</sub>| + (1-α) · (1 - cos(E(W<sub>t</sub>), E(H<sub>prev</sub>)))
                      </p>
                      <p className="text-slate-700 leading-relaxed text-justify mt-3">
                        Windows falling below a significance threshold τ<sub>redundant</sub>—typically containing phatic chit-chat or redundant confirmations—are immediately rejected, preventing low-value information from polluting the memory index.
                      </p>
                    </div>

                    <div className="bg-slate-50 border-l-4 border-indigo-500 p-5 rounded-r-lg my-6">
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">De-linearization Transformation</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        For windows that pass the entropy filter, SimpleMem applies a <span className="font-semibold">de-linearization transformation</span> 𝓕<sub>θ</sub> to resolve contextual dependencies. This process decomposes the continuous dialogue stream into discrete, self-contained atomic entries. The transformation functions as a composite of coreference resolution (Φ<sub>coref</sub>) and temporal anchoring (Φ<sub>time</sub>), ensuring each memory atom is interpretable in isolation.
                      </p>
                      <p className="text-slate-600 text-sm font-mono bg-white p-3 rounded border border-slate-200 mb-3">
                        m<sub>k</sub> = 𝓕<sub>θ</sub>(W<sub>t</sub>) = Φ<sub>time</sub> ∘ Φ<sub>coref</sub> ∘ Φ<sub>extract</sub>(W<sub>t</sub>)
                      </p>
                      <p className="text-slate-700 leading-relaxed text-justify">
                        Critically, the temporal anchoring step converts all relative temporal references (e.g., "next Friday", "yesterday") into absolute ISO-8601 timestamps. This ensures that each atomic entry remains semantically valid regardless of when it is retrieved, eliminating temporal ambiguity that plagues traditional memory systems.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-teal-50 border border-indigo-200 p-5 rounded-lg my-6">
                      <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-3">Tri-Layer Orthogonal Indexing</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        To support multi-granular access patterns, each atomic entry is projected into three orthogonal representational spaces. This hybrid structure recognizes that effective memory recall requires different "views" of the same information depending on query semantics.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Database size={16} className="text-teal-600" />
                            <h5 className="font-bold text-sm text-slate-800">Semantic Layer</h5>
                          </div>
                          <p className="text-xs text-slate-600">
                            Dense vector embeddings <strong>v<sub>k</sub> ∈ ℝ<sup>d</sup></strong> capture abstract meaning, enabling fuzzy semantic matching (e.g., "latte" matching "hot drink").
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Search size={16} className="text-indigo-600" />
                            <h5 className="font-bold text-sm text-slate-800">Lexical Layer</h5>
                          </div>
                          <p className="text-xs text-slate-600">
                            Sparse representations <strong>h<sub>k</sub> ∈ ℝ<sup>|V|</sup></strong> preserve exact keyword matches and proper nouns, ensuring critical entities aren't lost in vector space.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Layers size={16} className="text-purple-600" />
                            <h5 className="font-bold text-sm text-slate-800">Symbolic Layer</h5>
                          </div>
                          <p className="text-xs text-slate-600">
                            Structured metadata <strong>ℛ<sub>k</sub> = {'{'}(key, val){'}'}</strong> enables deterministic filtering by timestamps, entity types, and other symbolic constraints.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Method Section - Stage 2 */}
              <section
                className="py-10 px-6 md:px-10 border-b border-slate-100 bg-slate-50/40"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Brain size={22} className="text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Stage 2: Recursive Memory Consolidation
                    </h2>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-justify mb-4">
                      While atomization prevents redundant storage at the input stage, linear accumulation of discrete memory fragments over time still leads to index bloating and retrieval inefficiency. SimpleMem addresses this through an asynchronous background optimization process inspired by biological memory consolidation—the nocturnal process by which the hippocampus transfers and integrates episodic memories into cortical structures.
                    </p>

                    <div className="bg-white border-l-4 border-purple-500 p-5 rounded-r-lg my-6">
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Semantic Gravity Mechanism</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        The consolidation engine operates through a <span className="font-semibold">semantic gravity mechanism</span> that identifies and correlates related memory entries based on spatiotemporal affinity. We quantify the association strength ω<sub>ij</sub> between two memory atoms m<sub>i</sub> and m<sub>j</sub> as a weighted combination of their semantic similarity (measured via cosine distance in embedding space) and temporal proximity (modeled through exponential decay).
                      </p>
                      <p className="text-slate-600 text-sm font-mono bg-slate-50 p-3 rounded border border-slate-200 mb-3">
                        ω<sub>ij</sub> = β · cos(v<sub>i</sub>, v<sub>j</sub>) + (1-β) · e<sup>-λ|t<sub>i</sub> - t<sub>j</sub>|</sup>
                      </p>
                      <p className="text-slate-700 leading-relaxed text-justify">
                        This formulation captures the intuition that memories are related both by content similarity and temporal co-occurrence. The parameter β balances semantic versus temporal signals, while λ controls the rate of temporal decay, allowing the system to cluster recent co-occurring events while also connecting semantically similar memories across longer time spans.
                      </p>
                    </div>

                    <div className="bg-white border-l-4 border-purple-500 p-5 rounded-r-lg my-6">
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Inductive Synthesis of Molecular Representations</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        When a dense cluster of memory fragments 𝓒 forms—defined by pairwise connectivity exceeding threshold τ<sub>cluster</sub>—the system triggers an inductive synthesis step. This operation integrates fragmented, repetitive atomic facts into higher-order <span className="font-semibold text-purple-700">"molecular representations"</span> M<sub>mol</sub> that capture generalized insights rather than episodic details.
                      </p>
                      <p className="text-slate-600 text-sm font-mono bg-slate-50 p-3 rounded border border-slate-200 mb-3">
                        M<sub>mol</sub> = 𝓖<sub>syn</sub>({'{'}m<sub>i</sub> | m<sub>i</sub> ∈ 𝓒{'}'})
                      </p>
                      <p className="text-slate-700 leading-relaxed text-justify">
                        For example, rather than maintaining dozens of individual entries recording "User ordered latte at 9am on Monday", "User ordered latte at 9am on Tuesday", the consolidation process abstracts these into a single molecular insight: "User typically orders latte weekday mornings around 9am". The original atomic fragments are archived to a cold storage tier, effectively compressing the active memory index while preserving the ability to drill down into specific instances when needed.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 p-5 rounded-lg my-6">
                      <h4 className="text-sm font-bold text-purple-900 uppercase tracking-wide mb-3">Self-Evolving Memory Topology</h4>
                      <p className="text-slate-700 leading-relaxed text-justify">
                        Unlike static memory architectures that simply accumulate entries, SimpleMem's consolidation process creates a <span className="font-semibold">self-evolving memory topology</span>. As new atomic memories are added and consolidated over time, the system continuously refines its internal representations—compressing frequently recurring patterns into molecular abstractions while maintaining granular access to unique episodic details. This hierarchical organization ensures that retrieval complexity remains sublinear with respect to total interaction history, avoiding the quadratic scaling that plagues flat memory architectures.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Method Section - Stage 3 */}
              <section
                className="py-10 px-6 md:px-10 border-b border-slate-100"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                      <Search size={22} className="text-teal-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Stage 3: Adaptive Orthogonal Retrieval with Pruning
                    </h2>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-justify mb-4">
                      Having established an efficient, hierarchically organized memory substrate, the final challenge lies in accessing this information with optimal token economy. Standard retrieval approaches fetch a fixed number of context entries (typically top-k), which either provides insufficient information for complex queries or wastes tokens on simple lookups. SimpleMem introduces a <span className="font-semibold">complexity-aware pruning strategy</span> that dynamically optimizes the ratio of tokens consumed to insights gained.
                    </p>

                    <div className="bg-slate-50 border-l-4 border-teal-500 p-5 rounded-r-lg my-6">
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Hybrid Orthogonal Scoring</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        SimpleMem's retrieval mechanism leverages the tri-layer index established during atomization to compute a hybrid relevance score 𝓢(q, m<sub>k</sub>) for each memory entry. This scoring function aggregates complementary signals from the semantic, lexical, and symbolic layers through a principled fusion strategy.
                      </p>
                      <p className="text-slate-600 text-sm font-mono bg-white p-3 rounded border border-slate-200 mb-3">
                        𝓢(q, m<sub>k</sub>) = λ<sub>1</sub> cos(e<sub>q</sub>, v<sub>k</sub>) + λ<sub>2</sub> BM25(q<sub>lex</sub>, S<sub>k</sub>) + γ 𝟙(ℛ<sub>k</sub> ⊨ 𝓒<sub>meta</sub>)
                      </p>
                      <p className="text-slate-700 leading-relaxed text-justify">
                        The first term captures semantic similarity through dense embeddings, enabling conceptual matching. The second term employs sparse lexical matching (BM25) to ensure exact keyword and entity matches are not lost. The third term acts as a hard symbolic filter—the indicator function 𝟙(·) returns 1 only when the memory's metadata ℛ<sub>k</sub> satisfies query constraints 𝓒<sub>meta</sub> (e.g., timestamp ranges, entity type restrictions). This orthogonal combination ensures that queries can flexibly emphasize different retrieval modes depending on their structure.
                      </p>
                    </div>

                    <div className="bg-slate-50 border-l-4 border-teal-500 p-5 rounded-r-lg my-6">
                      <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Dynamic Depth Modulation</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        Rather than retrieving a fixed context window, SimpleMem employs a lightweight classifier to estimate query complexity C<sub>q</sub> ∈ [0, 1], distinguishing between simple fact lookups and complex reasoning requirements. The retrieval depth k<sub>dyn</sub> is then dynamically adjusted based on this complexity estimate.
                      </p>
                      <p className="text-slate-600 text-sm font-mono bg-white p-3 rounded border border-slate-200 mb-3">
                        k<sub>dyn</sub> = ⌊k<sub>base</sub> · (1 + δ · C<sub>q</sub>)⌋
                      </p>
                      <p className="text-slate-700 leading-relaxed text-justify">
                        For low-complexity queries (C<sub>q</sub> → 0), the system retrieves only top-k<sub>min</sub> molecular headers or metadata snippets, minimizing token consumption for straightforward lookups. Conversely, for high-complexity queries (C<sub>q</sub> → 1), the scope expands to top-k<sub>max</sub>, fetching associated atomic details and traversing semantic links to assemble comprehensive context. This adaptive mechanism ensures that token budgets are allocated proportionally to query difficulty.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 p-5 rounded-lg my-6">
                      <h4 className="text-sm font-bold text-teal-900 uppercase tracking-wide mb-3">Efficient Context Synthesis</h4>
                      <p className="text-slate-700 leading-relaxed text-justify mb-3">
                        The final synthesized context 𝓒<sub>final</sub> is constructed by concatenating the top-k<sub>dyn</sub> ranked memories, each annotated with its timestamp and relevance metadata. This contrasts sharply with iterative agentic approaches that repeatedly query and refine context through multi-turn reasoning loops.
                      </p>
                      <p className="text-slate-600 text-sm font-mono bg-white p-3 rounded border border-slate-200 mb-3">
                        𝓒<sub>final</sub> = ⨁<sub>m ∈ Top-k<sub>dyn</sub>(𝓢)</sub> [t<sub>m</sub>: Content(m)]
                      </p>
                      <p className="text-slate-700 leading-relaxed text-justify">
                        By performing a single-pass retrieval with orthogonal filtering and adaptive depth control, SimpleMem achieves comparable or superior accuracy to multi-round agentic systems while reducing token consumption by an order of magnitude. The combination of semantic, lexical, and symbolic pruning ensures that the retrieved context is both maximally relevant and minimally redundant.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Results Section */}
              <section id="results" className="py-10 px-6 md:px-10 bg-slate-50/60">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                    Quantitative Results
                  </h2>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        LoCoMo (GPT-4.1-mini): Time & F1/BLEU-1 (C1–C4)
                      </h3>
                      <p className="text-sm text-slate-500">
                        Per-sample timing (seconds) and GPT-4.1-mini F1 / BLEU-1 scores for the first four categories.
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4 font-semibold text-slate-900">Method</th>
                            <th className="px-6 py-4 font-semibold text-slate-900">Construction Time</th>
                            <th className="px-6 py-4 font-semibold text-slate-900">Retrieve Time</th>
                            <th className="px-6 py-4 font-semibold text-slate-900">Total Time</th>
                            <th className="px-6 py-4 font-semibold text-slate-900">C1</th>
                            <th className="px-6 py-4 font-semibold text-slate-900">C2</th>
                            <th className="px-6 py-4 font-semibold text-slate-900">C3</th>
                            <th className="px-6 py-4 font-semibold text-slate-900">C4</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="bg-teal-50/40">
                            <td className="px-6 py-4 font-bold text-teal-900">SimpleMem</td>
                            <td className="px-6 py-4 text-slate-700">92.6s</td>
                            <td className="px-6 py-4 text-slate-700">388.3s</td>
                            <td className="px-6 py-4 text-slate-700">480.9s</td>
                            <td className="px-6 py-4 text-slate-700">43.46 / 38.82</td>
                            <td className="px-6 py-4 text-slate-700">58.62 / 50.10</td>
                            <td className="px-6 py-4 text-slate-700">18.06 / 15.04</td>
                            <td className="px-6 py-4 text-slate-700">51.12 / 43.53</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium text-slate-700">A-mem</td>
                            <td className="px-6 py-4 text-slate-600">5140.5s</td>
                            <td className="px-6 py-4 text-slate-600">796.7s</td>
                            <td className="px-6 py-4 text-slate-600">5937.2s</td>
                            <td className="px-6 py-4 text-slate-600">25.06 / 17.32</td>
                            <td className="px-6 py-4 text-slate-600">51.01 / 44.75</td>
                            <td className="px-6 py-4 text-slate-600">13.22 / 14.75</td>
                            <td className="px-6 py-4 text-slate-600">41.02 / 36.99</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium text-slate-700">LightMem</td>
                            <td className="px-6 py-4 text-slate-600">97.8s</td>
                            <td className="px-6 py-4 text-slate-600">577.1s</td>
                            <td className="px-6 py-4 text-slate-600">675.9s</td>
                            <td className="px-6 py-4 text-slate-600">24.96 / 21.66</td>
                            <td className="px-6 py-4 text-slate-600">20.55 / 18.39</td>
                            <td className="px-6 py-4 text-slate-600">22.21 / 19.68</td>
                            <td className="px-6 py-4 text-slate-600">33.79 / 29.66</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium text-slate-700">mem0</td>
                            <td className="px-6 py-4 text-slate-600">1350.9s</td>
                            <td className="px-6 py-4 text-slate-600">583.4s</td>
                            <td className="px-6 py-4 text-slate-600">1934.3s</td>
                            <td className="px-6 py-4 text-slate-600">30.14 / 27.62</td>
                            <td className="px-6 py-4 text-slate-600">48.91 / 44.82</td>
                            <td className="px-6 py-4 text-slate-600">42.35 / 38.92</td>
                            <td className="px-6 py-4 text-slate-600">41.30 / 36.17</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* 底部 Footer：独立于卡片，依然居中 */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm">© 2025 SimpleMem Project. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleMemProjectPage;
