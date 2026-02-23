import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50"
        >
          <div className="bg-[#262626] border border-[#2F2F2F] rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] flex items-center justify-center flex-shrink-0">
                <Download size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Install App</h3>
                <p className="text-sm text-[#A3A3A3] mb-3">
                  Install SA Syllabus AI on your home screen for quick access
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="px-4 py-2 bg-gradient-to-br from-[#9E7FFF] to-[#38bdf8] rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Install
                  </button>
                  <button
                    onClick={() => setShowPrompt(false)}
                    className="px-4 py-2 bg-[#2F2F2F] rounded-xl text-sm font-medium hover:bg-[#363636] transition-colors"
                  >
                    Not now
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowPrompt(false)}
                className="p-1 hover:bg-[#2F2F2F] rounded-lg transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
