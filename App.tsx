import React, { useState, useEffect } from 'react';
import { SERVICES, PROCESS_STEPS } from './constants';
import Button from './components/ui/Button';

const CALENDLY_URL = 'https://calendly.com/alphamarketingai/30min';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuditLoading, setIsAuditLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * High-Performance Audit Trigger.
   * Redirects the user directly to the booking page in the same window.
   */
  const triggerAudit = () => {
    setIsAuditLoading(true);
    
    // Simulate top loading bar for immediate speed perception
    const bar = document.getElementById('loading-bar');
    if (bar) {
      bar.style.width = '70%';
      setTimeout(() => { if (bar) bar.style.width = '100%'; }, 200);
      setTimeout(() => { if (bar) bar.style.width = '0%'; }, 600);
    }

    // Direct redirect is the fastest interaction path and avoids popup blockers
    setTimeout(() => {
      window.location.href = CALENDLY_URL;
      setIsAuditLoading(false);
    }, 150);
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900 bg-white">
      {/* Navigation */}
      <header>
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'py-8 bg-transparent'}`} aria-label="Main Navigation">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-white font-black text-lg" aria-hidden="true">α</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">ALPHA AI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-[12px] font-black uppercase tracking-widest text-slate-400">
              <a href="#philosophy" onClick={(e) => handleNavClick(e, 'philosophy')} className="hover:text-blue-600 transition-colors">Philosophy</a>
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-blue-600 transition-colors">What We Do</a>
              <a href="#process" onClick={(e) => handleNavClick(e, 'process')} className="hover:text-blue-600 transition-colors">The Audit</a>
              <Button variant="primary" size="sm" onClick={triggerAudit} className="rounded-full">Book AI Audit</Button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 px-6 overflow-hidden">
          <div className="bg-subtle-mesh" aria-hidden="true"></div>
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white text-slate-900 text-[12px] font-bold uppercase tracking-[0.15em] mb-10 border border-slate-200 shadow-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)] animate-pulse" aria-hidden="true"></span>
              It’s time to move from AI curious to AI-native.
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-[0.85] text-slate-900 tracking-tighter">
              Scale Smart. <br />
              <span className="text-blue-600">Cut Costs.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-500 font-medium mb-16 max-w-3xl mx-auto leading-relaxed">
              We build the <span className="text-slate-900 font-bold underline decoration-blue-500/30 underline-offset-8">AI operating systems</span> for your next decade of growth. No hype, just engineering that works.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" onClick={triggerAudit} className="rounded-full px-12 h-20 text-xl shadow-2xl active:scale-95 transition-transform">Start Your AI Audit</Button>
            </div>
          </div>
        </section>

        {/* The Alpha Philosophy Section */}
        <section id="philosophy" className="py-32 px-6 bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Our Philosophy</h2>
              <div className="space-y-10 text-xl md:text-2xl lg:text-3xl text-slate-700 leading-snug font-medium">
                <p>
                  At Alpha AI, we believe the conversation around artificial intelligence has been dominated by <span className="text-slate-900 font-bold">hype, fear, and empty promises.</span> Too many businesses have been left with pretty slides and failed prototypes, but no real progress.
                </p>
                <p>
                  The challenges ahead are real: slowing productivity, tighter competition, and rising expectations. The margin for inefficiency is gone. Every company now faces a choice — <span className="text-blue-600 font-bold underline underline-offset-8">speed up or fall behind.</span>
                </p>
                <p>
                  AI is the path forward. It provides the infrastructure for a new level of performance. Used well, AI does not replace people. It fundamentally redefines how they create value and <span className="text-slate-900 font-bold italic">sharpens how organizations think, decide, and execute.</span>
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-200">
              <div>
                <h3 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest">Our Mission</h3>
                <p className="text-slate-500 font-medium leading-relaxed">To help forward-thinking businesses turn AI from an abstract idea into a real competitive advantage. We don’t just implement AI. We build AI operating systems for the next decade of growth.</p>
              </div>
              <div>
                <h3 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest">Our Method</h3>
                <p className="text-slate-500 font-medium leading-relaxed">We design the automations, copilots, and systems that reshape how your teams operate. We don't just implement; we ensure your people become fluent in the tools that define their work.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Scale smart. <br /><span className="text-blue-600">Cut costs.</span></h2>
                <p className="text-xl text-slate-500 font-medium">We identify the waste and build the systems to eliminate it.</p>
              </div>
              <Button variant="outline" size="lg" onClick={triggerAudit} className="rounded-full border-slate-200 active:scale-95 transition-transform">View Roadmap</Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((s) => (
                <article key={s.id} className="glass-card p-12 rounded-[2.5rem]">
                  <div className="text-5xl mb-8" aria-hidden="true">{s.icon}</div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Step by Step Process */}
        <section id="process" className="py-32 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">The Path Forward.</h2>
              <p className="text-slate-500 text-xl font-medium italic">The future belongs to those willing to step off the sidelines.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-12">
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className="relative group">
                  <div className="text-6xl font-black text-slate-200 group-hover:text-blue-100 transition-colors mb-6" aria-hidden="true">{step.number}</div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-60 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-12 tracking-tighter leading-[0.9]">
              Step into the <br /><span className="text-blue-600">action.</span>
            </h2>
            <p className="text-slate-500 text-xl md:text-3xl mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
              Scale smart and cut costs with an AI audit. The future has arrived—be among those who own it.
            </p>
            <Button size="lg" onClick={triggerAudit} className="rounded-full h-24 px-16 text-2xl shadow-blue-500/20 active:scale-95 transition-transform">Book Your AI Audit</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-black text-lg" aria-hidden="true">α</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">ALPHA AI</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <Button onClick={triggerAudit} variant="outline" size="sm" className="rounded-full text-[10px] active:scale-95 transition-transform">Launch Audit</Button>
            <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.6em]">© 2025 ALPHA AI. NO BULLSHIT ENGINEERING.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;