import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, Cpu, Network, Zap, Copy, Check, ChevronRight, Sparkles, Shield, Database, Layout } from 'lucide-react';
import Background3D from './Background3D';
import './index.css';

function App() {
  // ─── 3D Tilt Effect for Terminal ───
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // ─── Mouse Follower Orb ───
  const orbX = useMotionValue(-1000);
  const orbY = useMotionValue(-1000);
  const springOrbX = useSpring(orbX, { stiffness: 50, damping: 20 });
  const springOrbY = useSpring(orbY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      orbX.set(e.clientX - 150);
      orbY.set(e.clientY - 150);
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);

  // ─── Copy Handlers ───
  const [copiedNpm, setCopiedNpm] = React.useState(false);
  const copyNpmCommand = () => {
    navigator.clipboard.writeText('npm install -g @gokulvenkatareddy/cortex');
    setCopiedNpm(true);
    setTimeout(() => setCopiedNpm(false), 2000);
  };

  const [copiedCurl, setCopiedCurl] = React.useState(false);
  const copyCurlCommand = () => {
    navigator.clipboard.writeText('curl -fsSL https://raw.githubusercontent.com/gokul77898/Cortex/main/install.sh | bash');
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  // ─── Footer Text Animation ───
  const creatorText = "GOKUL VENKATAREDDY".split("");

  return (
    <>
      {/* 3D WebGL Background */}
      <Background3D />

      {/* Dynamic Ambient Light following mouse */}
      <motion.div 
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[-1]"
        style={{
          x: springOrbX,
          y: springOrbY,
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, rgba(138, 43, 226, 0.1) 50%, transparent 80%)',
          filter: 'blur(40px)'
        }}
      />
      <div className="ambient-glow" />

      {/* Navigation */}
      <nav className="navbar">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="nav-logo"
        >
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#8a2be2] p-[1px]"
          >
            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
              <Cpu size={20} className="text-[#00f0ff]" />
            </div>
          </motion.div>
          <span className="font-black text-white text-xl">CORTEX</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="nav-links"
        >
          <a href="#features" className="nav-link hover:text-[#00f0ff]">Features</a>
          <a href="#docs" className="nav-link hover:text-[#8a2be2]">Docs</a>
          <a href="https://github.com/gokul77898/Cortex" target="_blank" className="nav-link hover:text-[#ff007f]">GitHub</a>
        </motion.div>
      </nav>

      <main className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 mb-8 backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <Sparkles size={16} className="text-[#00f0ff] animate-pulse" />
              <span className="text-sm font-bold tracking-widest text-white">CORTEX v0.1.7 IS NOW LIVE GLOBALLY</span>
            </motion.div>
            
            <h1 className="hero-title relative">
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-white"
              >
                THE AUTONOMOUS
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="gradient-text block"
              >
                AGI TERMINAL
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hero-subtitle"
            >
              Instantly summon any LLM natively in your CLI. Powered by 200+ models from NVIDIA NIM, OpenAI, Gemini, and Groq. Zero configuration required.
            </motion.p>
          </motion.div>

          {/* 3D Terminal Window */}
          <motion.div 
            className="terminal-container cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring", bounce: 0.3 }}
          >
            <motion.div 
              className="terminal-glass" 
              style={{ transform: "translateZ(80px)" }}
              whileHover={{ boxShadow: "0 30px 60px -12px rgba(0, 240, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
            >
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className="mx-auto text-sm text-gray-400 flex items-center gap-2 font-mono">
                  <Terminal size={14} /> gokul@macbook ~ cortex
                </div>
              </div>
              
              <div className="terminal-content">
                <div className="code-line">
                  <span className="prompt-icon">❯</span>
                  <span className="code-text">npm install -g <span className="code-highlight">@gokulvenkatareddy/cortex</span></span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  className="code-line"
                >
                  <span className="text-green-400">✔</span>
                  <span className="text-gray-400">Added 299 packages in 3s</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="code-line"
                >
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="prompt-icon"
                  >❯</motion.span>
                  <span className="code-text">cortex</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 3, type: "spring", bounce: 0.5 }}
                  className="mt-4 p-4 rounded-xl bg-black/60 border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-[shimmer_2s_infinite]"></div>
                  <div className="text-[#00f0ff] font-bold mb-2 tracking-widest">╔════════════════════════════════════════════╗</div>
                  <div className="text-[#00f0ff] font-bold mb-2 tracking-widest">║  CORTEX — Choose your AI provider          ║</div>
                  <div className="text-[#00f0ff] font-bold mb-4 tracking-widest">╚════════════════════════════════════════════╝</div>
                  <motion.div whileHover={{ x: 10, color: "#fff" }} className="text-gray-300 ml-4 mb-2 cursor-pointer transition-colors">1. 🟢 NVIDIA NIM (DeepSeek, Mistral, Llama)</motion.div>
                  <motion.div whileHover={{ x: 10, color: "#fff" }} className="text-gray-300 ml-4 mb-2 cursor-pointer transition-colors">2. ⚡ OpenAI     (GPT-4o, o3, o4-mini)</motion.div>
                  <motion.div whileHover={{ x: 10, color: "#fff" }} className="text-gray-300 ml-4 mb-2 cursor-pointer transition-colors">3. ✨ Gemini     (2.0 Flash, 1.5 Pro)</motion.div>
                  <motion.div whileHover={{ x: 10, color: "#fff" }} className="text-gray-300 ml-4 mb-2 cursor-pointer transition-colors">4. 🏠 Ollama     (Local, 100% Private)</motion.div>
                  <div className="mt-4 text-[#8a2be2] font-bold">Enter number [1-7]: <motion.span animate={{ opacity: [1,0] }} transition={{ repeat: Infinity }}>|</motion.span></div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Ultra Animated Quick Install Bar ─── */}
        <section id="install" className="flex flex-col items-center gap-6 -mt-10 relative z-20 pb-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,240,255,0.4)" }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="flex items-center gap-4 bg-[#0a0a0f]/80 backdrop-blur-3xl p-3 pl-8 rounded-full border border-[#00f0ff]/50 shadow-[0_0_20px_rgba(0,240,255,0.2)] w-full max-w-4xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="font-mono text-[#00f0ff] font-bold text-xl">$</span>
            <code className="font-mono text-xl text-white pr-4 flex-1 overflow-x-auto whitespace-nowrap">npm install -g @gokulvenkatareddy/cortex</code>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,240,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={copyNpmCommand}
              className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 relative z-10"
            >
              {copiedNpm ? <Check size={24} className="text-green-400" /> : <Copy size={24} className="text-white" />}
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(138,43,226,0.4)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="flex items-center gap-4 bg-[#0a0a0f]/80 backdrop-blur-3xl p-3 pl-8 rounded-full border border-[#8a2be2]/50 shadow-[0_0_20px_rgba(138,43,226,0.2)] w-full max-w-4xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8a2be2]/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="font-mono text-[#8a2be2] font-bold text-xl">$</span>
            <code className="font-mono text-xl text-white pr-4 flex-1 overflow-x-auto whitespace-nowrap">curl -fsSL https://raw.githubusercontent.com/gokul77898/Cortex/main/install.sh | bash</code>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(138,43,226,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={copyCurlCommand}
              className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 relative z-10"
            >
              {copiedCurl ? <Check size={24} className="text-green-400" /> : <Copy size={24} className="text-white" />}
            </motion.button>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="feature-grid">
          {[
            { icon: <Network />, title: "162+ Swarm Agents", color: "#00f0ff", desc: "Deploy specialized AI agents for Frontend, Backend, DevOps, DB Architecture, and more in a parallelized multi-agent swarm." },
            { icon: <Zap />, title: "Any LLM Provider", color: "#8a2be2", desc: "Seamlessly switch between NVIDIA NIM, OpenAI, Gemini, Groq, HuggingFace, or run completely private local models with Ollama." },
            { icon: <Cpu />, title: "Zero Config Setup", color: "#ff007f", desc: "Interactive setup wizard handles all your API keys locally in ~/.cortex/.env. You never touch configuration files manually." },
            { icon: <Database />, title: "Autonomous RAG", color: "#00f0ff", desc: "Built-in semantic codebase indexing. Ask questions and get answers grounded in your specific repository context and history." },
            { icon: <Shield />, title: "Secure Isolation", color: "#8a2be2", desc: "Actions execute in isolated Docker-style sandbox environments ensuring absolute safety while making filesystem changes." },
            { icon: <Layout />, title: "Web UI & Desktop", color: "#ff007f", desc: "Interact entirely via the CLI, or launch the beautiful real-time Web UI to monitor and control agent workflows graphically." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.05, y: -10, boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 40px ${feature.color}33` }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
              className="glass-card group"
              style={{ borderTop: `1px solid ${feature.color}55` }}
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="icon-wrapper"
                style={{ color: feature.color, borderColor: `${feature.color}55`, boxShadow: `0 0 20px ${feature.color}33` }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-white font-bold tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 mt-2 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* ─── Ultra Animated Creator Footer ─── */}
        <footer className="py-24 mt-10 border-t border-white/5 relative z-20 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/5 to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            className="text-gray-500 font-bold tracking-[0.3em] mb-4 text-sm"
          >
            DESIGNED & ENGINEERED BY
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black flex gap-2 cursor-pointer group perspective-1000">
            {creatorText.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.05, type: "spring", bounce: 0.6 }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.2, 
                  color: i % 2 === 0 ? "#00f0ff" : "#8a2be2",
                  textShadow: "0 0 20px rgba(255,255,255,0.5)"
                }}
                className={`inline-block ${letter === " " ? "w-4 md:w-8" : ""} text-white transition-colors duration-300`}
              >
                {letter}
              </motion.span>
            ))}
          </h2>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
            className="h-[2px] mt-8 bg-gradient-to-r from-transparent via-[#ff007f] to-transparent"
          />
        </footer>
      </main>
    </>
  );
}

export default App;
