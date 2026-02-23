import { create } from 'zustand';
import type { Subject, Grade, Message, VideoSuggestion } from '../types';

interface AppState {
  currentSubject: Subject;
  currentGrade: Grade;
  messages: Message[];
  isLoading: boolean;
  videoSuggestions: VideoSuggestion[];
  setSubject: (subject: Subject) => void;
  setGrade: (grade: Grade) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  setVideoSuggestions: (videos: VideoSuggestion[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSubject: 'Mathematics',
  currentGrade: 10,
  messages: [],
  isLoading: false,
  videoSuggestions: [],
  
  setSubject: (subject) => set({ currentSubject: subject }),
  setGrade: (grade) => set({ currentGrade: grade }),
  
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...message,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      },
    ],
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setVideoSuggestions: (videos) => set({ videoSuggestions: videos }),
}));
