import React, { useState } from 'react';
import { Menu, X, MessageSquare, Video, BookOpen, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from './components/ChatInterface';
import VideoSuggestions from './components/VideoSuggestions';
import SubjectSelector from './components/SubjectSelector';
import InstallPrompt from './components/InstallPrompt';
import { useAppStore } from './store/appStore';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { currentSubject, currentGrade } = useAppStore();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#262626]/80 backdrop-blur-xl border-b border-[#2F2F2F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-xl hover:bg-[#2F2F2F] transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold">SA Syllabus AI</h1>
                <p className="text-xs text-[#A3A3A3]">
                  {currentSubject} • Grade {currentGrade}
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <SubjectSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-[#262626] z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button
                    onClick={toggleDrawer}
                    className="p-2 rounded-xl hover:bg-[#2F2F2F] transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <SubjectSelector />
                  
                  <div className="pt-6 border-t border-[#2F2F2F]">
                    <h3 className="text-sm font-semibold text-[#A3A3A3] mb-4">Features</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2F2F2F]/50">
                        <MessageSquare size={20} className="text-[#9E7FFF]" />
                        <span className="text-sm">AI Chat Assistant</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2F2F2F]/50">
                        <Video size={20} className="text-[#38bdf8]" />
                        <span className="text-sm">Video Explanations</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2F2F2F]/50">
                        <BookOpen size={20} className="text-[#f472b6]" />
                        <span className="text-sm">Multi-Subject Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-7rem)]">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>

          {/* Video Suggestions */}
          <div className="hidden lg:block">
            <VideoSuggestions />
          </div>
        </div>
      </main>

      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}

export default App;
