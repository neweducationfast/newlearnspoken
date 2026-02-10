
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { DayNavigator } from './components/DayNavigator';
import { LessonDisplay } from './components/LessonDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ILesson } from './types';
import { generateLessonForDay } from './services/geminiService';

const App: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [lesson, setLesson] = useState<ILesson | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchLesson = useCallback(async (day: number) => {
    setIsLoading(true);
    setError(null);
    setLesson(null);

    // History: Check local storage first
    try {
      const cachedLesson = localStorage.getItem(`english-lesson-day-${day}`);
      if (cachedLesson) {
        setLesson(JSON.parse(cachedLesson));
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
      // If parsing fails, clear the invalid entry
      localStorage.removeItem(`english-lesson-day-${day}`);
    }

    // If not in cache, fetch from API
    try {
      const lessonData = await generateLessonForDay(day);
      setLesson(lessonData);
      // Save to local storage on success
      try {
        localStorage.setItem(`english-lesson-day-${day}`, JSON.stringify(lessonData));
      } catch (e) {
        console.error("Failed to write to localStorage", e);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate the lesson. The model may be unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLesson(currentDay);
  }, [currentDay, fetchLesson]);

  const handleDayChange = (day: number) => {
    if (day >= 1 && day <= 365) {
      setCurrentDay(day);
    }
  };

  const welcomeMessage = useMemo(() => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Welcome to Your 365-Day English Journey!</h2>
      <p className="text-slate-600 mb-6">
        This is your personal English learning assistant. A new lesson is being generated for you for Day 1. 
        Get ready to learn new words, verbs, and practice your spoken English every day!
      </p>
    </div>
  ), []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <DayNavigator 
          currentDay={currentDay}
          onDayChange={handleDayChange}
        />
        <div className="mt-6">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {lesson && !isLoading && <LessonDisplay lesson={lesson} />}
          {!lesson && !isLoading && !error && currentDay === 1 && welcomeMessage}
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} 365-Day English Journey. Learn something new every day!</p>
      </footer>
    </div>
  );
};

export default App;
