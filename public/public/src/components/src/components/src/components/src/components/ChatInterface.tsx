import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { sendMessageToAI } from '../utils/ai';
import { searchYouTubeVideos } from '../utils/youtube';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, currentSubject, currentGrade, addMessage, setLoading, setVideoSuggestions } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    addMessage({ role: 'user', content: userMessage });
    setLoading(true);

    try {
      // Get AI response
      const aiResponse = await sendMessageToAI(userMessage, currentSubject, currentGrade);
      addMessage({ role: 'assistant', content: aiResponse });

      // Get video suggestions
      const videos = await searchYouTubeVideos(userMessage, currentSubject, currentGrade);
      setVideoSuggestions(videos);
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#262626] rounded-2xl border border-[#2F2F2F] overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-[#2F2F2F] bg-[#262626]/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-semibold">AI Assistant</h2>
            <p className="text-sm text-[#A3A3A3]">Ask me anything about {currentSubject}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] flex items-center justify-center">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-[#A3A3A3]">
                Ask me any question about {currentSubject} for Grade {currentGrade}. I'm here to help you understand!
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] text-white'
                      : 'bg-[#2F2F2F] text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-[#2F2F2F] rounded-2xl px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#9E7FFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#f472b6] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#2F2F2F] bg-[#262626]/50 backdrop-blur-xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-[#2F2F2F] border border-[#2F2F2F] rounded-xl text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#9E7FFF] disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] rounded-xl font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
