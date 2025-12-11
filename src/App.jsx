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
                    While Large Language Models (LLMs) strive for lifelong interaction
                    capabilities, current memory architectures face a dilemma: they either
                    rely on passive context extension, which suffers from the
                    &quot;Lost-in-the-Middle&quot; phenomenon, or resort to computationally
                    exorbitant agentic loops. We propose <strong>SimpleMem</strong>, a
                    minimalist memory framework grounded in the Complementary Learning
                    Systems (CLS) theory. Unlike systems that store raw chaos (e.g.,
                    Mem0), SimpleMem operationalizes the memory process through a
                    streamlined pipeline: (1) Atomic Encoding, (2) Orthogonal Indexing,
                    and (3) Reconstructive Synthesis. Evaluating on the LoCoMo benchmark,
                    SimpleMem establishes a new state-of-the-art with an F1 score of
                    54.43%, outperforming heavy agentic baselines while reducing query
                    token costs by 30x.
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

              {/* Method Section */}
              <section
                id="method"
                className="py-10 px-6 md:px-10 border-b border-slate-100"
              >
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                    Core Methodology
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-4 text-teal-600">
                        <Brain size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Atomic Encoding</h3>
                      <p className="text-sm text-slate-600">
                        Transforms ambiguous dialogue (e.g., &quot;he said it yesterday&quot;)
                        into self-contained facts (&quot;User said [topic] on
                        2024-05-20&quot;).
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-4 text-teal-600">
                        <Database size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Orthogonal Indexing</h3>
                      <p className="text-sm text-slate-600">
                        Stores memories across complementary layers: Dense (Semantic), Sparse
                        (Lexical), and Symbolic (Metadata) for robust retrieval.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-4 text-teal-600">
                        <Layers size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Reconstructive Synthesis</h3>
                      <p className="text-sm text-slate-600">
                        Dynamically assembles relevant context through logical intersection
                        rather than expensive iterative searches.
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
