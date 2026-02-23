import type { VideoSuggestion } from '../types';

export async function searchYouTubeVideos(
  query: string,
  subject: string,
  grade: number
): Promise<VideoSuggestion[]> {
  // Mock video suggestions - replace with actual YouTube API call
  const mockVideos: VideoSuggestion[] = [
    {
      id: '1',
      title: `${subject} Grade ${grade} - ${query}`,
      channel: 'SA Education Hub',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12:34',
      url: 'https://youtube.com',
      relevance: 0.95,
    },
    {
      id: '2',
      title: `Complete Guide: ${query}`,
      channel: 'Learn with Teacher',
      thumbnail: 'https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '18:20',
      url: 'https://youtube.com',
      relevance: 0.88,
    },
    {
      id: '3',
      title: `${subject} Explained Simply`,
      channel: 'Maths & Science SA',
      thumbnail: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '15:45',
      url: 'https://youtube.com',
      relevance: 0.82,
    },
  ];
  
  return mockVideos;
}
