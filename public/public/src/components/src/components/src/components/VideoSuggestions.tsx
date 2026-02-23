import React from 'react';
import { Video, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';

export default function VideoSuggestions() {
  const { videoSuggestions } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-[#262626] rounded-2xl border border-[#2F2F2F] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#2F2F2F] bg-[#262626]/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#f472b6] flex items-center justify-center">
            <Video size={20} />
          </div>
          <div>
            <h2 className="font-semibold">Video Explanations</h2>
            <p className="text-sm text-[#A3A3A3]">Watch to learn more</p>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {videoSuggestions.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#f472b6] flex items-center justify-center opacity-50">
                <Video size={32} />
              </div>
              <p className="text-[#A3A3A3] text-sm">
                Video suggestions will appear here when you ask a question
              </p>
            </div>
          </div>
        ) : (
          videoSuggestions.map((video, index) => (
            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block group"
            >
              <div className="bg-[#2F2F2F] rounded-xl overflow-hidden hover:bg-[#363636] transition-colors">
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs font-medium flex items-center gap-1">
                    <Clock size={12} />
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-[#9E7FFF] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] mb-2">{video.channel}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                      <span className="text-xs text-[#A3A3A3]">
                        {Math.round(video.relevance * 100)}% relevant
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-[#A3A3A3] group-hover:text-[#9E7FFF] transition-colors" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </div>
  );
}
