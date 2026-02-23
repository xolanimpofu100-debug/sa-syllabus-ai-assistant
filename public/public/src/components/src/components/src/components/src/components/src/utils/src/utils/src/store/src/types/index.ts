export type Subject = 'Mathematics' | 'Physical Sciences' | 'Life Sciences' | 'English';
export type Grade = 8 | 9 | 10 | 11 | 12;

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface VideoSuggestion {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  url: string;
  relevance: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
