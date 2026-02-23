import React from 'react';
import { BookOpen, Beaker, Leaf, Book } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import type { Subject, Grade } from '../types';

const subjects: { name: Subject; icon: React.ReactNode; color: string }[] = [
  { name: 'Mathematics', icon: <BookOpen size={20} />, color: '#9E7FFF' },
  { name: 'Physical Sciences', icon: <Beaker size={20} />, color: '#38bdf8' },
  { name: 'Life Sciences', icon: <Leaf size={20} />, color: '#10b981' },
  { name: 'English', icon: <Book size={20} />, color: '#f472b6' },
];

const grades: Grade[] = [8, 9, 10, 11, 12];

export default function SubjectSelector() {
  const { currentSubject, currentGrade, setSubject, setGrade } = useAppStore();

  return (
    <div className="space-y-4">
      {/* Subject Selection */}
      <div>
        <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Subject</label>
        <div className="grid grid-cols-2 gap-2">
          {subjects.map((subject) => (
            <button
              key={subject.name}
              onClick={() => setSubject(subject.name)}
              className={`p-3 rounded-xl border transition-all ${
                currentSubject === subject.name
                  ? 'border-[#9E7FFF] bg-[#9E7FFF]/10'
                  : 'border-[#2F2F2F] hover:border-[#9E7FFF]/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div style={{ color: subject.color }}>{subject.icon}</div>
                <span className="text-sm font-medium">{subject.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grade Selection */}
      <div>
        <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Grade</label>
        <div className="flex gap-2">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => setGrade(grade)}
              className={`flex-1 py-2 rounded-xl border transition-all ${
                currentGrade === grade
                  ? 'border-[#9E7FFF] bg-[#9E7FFF]/10 text-white'
                  : 'border-[#2F2F2F] text-[#A3A3A3] hover:border-[#9E7FFF]/50 hover:text-white'
              }`}
            >
              <span className="text-sm font-medium">{grade}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
