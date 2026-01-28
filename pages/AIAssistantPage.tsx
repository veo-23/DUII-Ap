
import React, { useState, useRef, useEffect } from 'react';
import { User, UserRole } from '../types';
import { askEducationalAssistant } from '../geminiService';

interface Message {
  role: 'USER' | 'AI';
  content: string;
}

interface AIAssistantPageProps {
  user: User;
}

const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'AI', content: `Assalamu Alaikum ${user.name.split(' ')[0]}! I am the official DUII AI Tutor. How can I assist you with your Islamic studies or institutional queries today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'USER', content: userMessage }]);
    setIsTyping(true);

    try {
      const context = `User is a ${user.role} at Darul Ulum Islamic Institute. Department: ${user.department || 'Islamic Studies'}.`;
      const aiResponse = await askEducationalAssistant(userMessage, context);
      
      setMessages(prev => [...prev, { role: 'AI', content: aiResponse || "Forgive me, I encountered a temporary issue. Please try your query again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'AI', content: "Our AI systems are currently undergoing maintenance. Please check back shortly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-duii-primary tracking-tight uppercase">AI Institutional Tutor</h1>
          <p className="text-duii-secondary text-xs font-bold uppercase tracking-widest mt-1">Darul Ulum Digital Services</p>
        </div>
        <div className="bg-duii-primary/5 px-4 py-2 rounded-xl border border-duii-secondary/10 flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-duii-primary uppercase tracking-widest">Active System</span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-duii-secondary/10 shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-duii-cream/20">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-3xl ${
                msg.role === 'USER' 
                  ? 'bg-duii-primary text-duii-secondary rounded-tr-none shadow-lg' 
                  : 'bg-white border border-duii-secondary/10 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-duii-secondary/10 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                <div className="w-1.5 h-1.5 bg-duii-secondary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-duii-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-duii-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 border-t border-duii-secondary/10 bg-white">
          <div className="flex space-x-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about curriculum, policies, or research..."
              className="flex-1 px-6 py-4 bg-duii-bg/10 border border-slate-200 rounded-2xl focus:border-duii-primary outline-none transition-all font-bold text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="px-8 py-4 bg-duii-primary text-duii-secondary rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-duii-primary/10 hover:bg-black disabled:bg-slate-300 disabled:shadow-none transition-all"
            >
              Consult
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Class schedule summaries', 'Attendance policies', 'Exam preparation'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="text-[9px] font-black uppercase tracking-widest text-duii-secondary px-3 py-1.5 bg-duii-bg/20 border border-duii-secondary/20 rounded-full hover:bg-duii-primary hover:text-white hover:border-duii-primary transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
