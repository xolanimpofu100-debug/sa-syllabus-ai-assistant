import type { Subject, Grade } from '../types';

export async function sendMessageToAI(
  message: string,
  subject: Subject,
  grade: Grade
): Promise<string> {
  // Mock AI response - replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `I understand you're asking about ${subject} for Grade ${grade}. Here's a helpful explanation:\n\n${getMockResponse(message, subject)}`;
}

function getMockResponse(message: string, subject: Subject): string {
  const responses: Record<Subject, string> = {
    'Mathematics': 'Let me break down this math concept step by step. First, we need to understand the fundamental principles...',
    'Physical Sciences': 'This physics concept relates to Newton\'s laws. Let\'s explore the theory and apply it to real-world examples...',
    'Life Sciences': 'In biology, this process is crucial for understanding living organisms. Here\'s how it works...',
    'English': 'When analyzing this text, we should consider the literary devices, themes, and context...',
  };
  
  return responses[subject];
}
