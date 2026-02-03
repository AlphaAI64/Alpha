
import React, { useState, useRef, useEffect } from 'react';
import { generateAIStream } from '../services/gemini';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "The future has arrived. I'm Alpha. Are you ready to move from AI curious to AI-native? Let's begin your AI Audit.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change or window opens
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen]);

  // Listen for global triggers from website buttons
  useEffect(() => {
    const handleOpenChat = (e: any) => {
      setIsOpen(true);
      if (e.detail) {
        handleSend(e.detail);
      }
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, [messages, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = (overrideInput || input).trim();
    if (!textToSend || isLoading) return;

    // Add user message to UI
    const userMessage: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      // Initialize an empty model message for streaming
      const modelMessage: ChatMessage = { role: 'model', text: '', timestamp: new Date() };
      setMessages(prev => [...prev, modelMessage]);

      let fullText = '';
      const stream = generateAIStream(textToSend, history);

      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'model') {
            lastMsg.text = fullText;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Streaming error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-110 hover:rotate-3 transition-all duration-500 group relative"
          aria-label="Open Alpha Assistant"
        >
          <div className="text-white font-black text-2xl tracking-tighter">α</div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#030303]"></div>
          <div className="absolute inset-0 rounded-[2rem] bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      )}

      {isOpen && (
        <div className="w-[440px] h-[640px] bg-[#0A0A0A] rounded-[2.5rem] flex flex-col shadow-2xl border border-white/10 overflow-hidden animate-in fade-in zoom-in duration-500">
          {/* Header */}
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-zinc-900/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-500/20">α</div>
              <div>
                <h4 className="text-white font-black text-sm tracking-widest uppercase">Lead Strategist</h4>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.3em]">Operational</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-[16px] leading-relaxed font-medium ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-900/20' 
                    : 'bg-zinc-900 text-zinc-300 rounded-tl-none border border-white/5'
                }`}>
                  {msg.text || (isLoading && i === messages.length - 1 ? "..." : "")}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-8 border-t border-white/10 bg-zinc-900/30">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What is your business objective?"
                disabled={isLoading}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 px-8 pr-16 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder-zinc-700 font-medium disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-3 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50 shadow-xl shadow-blue-900/40"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </form>
            <p className="mt-5 text-[9px] text-zinc-600 text-center font-black uppercase tracking-[0.5em]">Alpha AI OS Connection Secured</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
