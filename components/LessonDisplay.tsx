
import React, { useState } from 'react';
import { ILesson, IVocabularyItem, IVerb } from '../types';

const TABS = ['Vocabulary', 'Verbs', 'Spoken Practice', 'Daily Task'];

const VocabularySection: React.FC<{ items: IVocabularyItem[] }> = ({ items }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-md transition-colors duration-200 hover:bg-teal-50">
                <div className="flex items-start">
                    <span className="text-sm font-bold text-teal-600 mr-3">{index + 1}.</span>
                    <div>
                        <p className="font-semibold text-slate-800">{item.englishWord} - <span className="font-normal text-slate-600">{item.hindiMeaning}</span></p>
                        <p className="text-sm text-slate-500 mt-1">
                            <span className="font-medium">EN:</span> {item.englishSentence}<br/>
                            <span className="font-medium">HI:</span> {item.hindiSentence}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const VerbsSection: React.FC<{ items: IVerb[] }> = ({ items }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                <tr>
                    <th scope="col" className="px-4 py-3">#</th>
                    <th scope="col" className="px-4 py-3">Verb (Meaning)</th>
                    <th scope="col" className="px-4 py-3 text-center">V1</th>
                    <th scope="col" className="px-4 py-3 text-center">V2</th>
                    <th scope="col" className="px-4 py-3 text-center">V3</th>
                    <th scope="col" className="px-4 py-3">Example</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-teal-50">
                        <td className="px-4 py-4 font-medium text-slate-900">{index + 1}</td>
                        <td className="px-4 py-4 font-medium text-slate-900">
                            {item.verb}<br/><span className="font-normal text-slate-500">({item.hindiMeaning})</span>
                        </td>
                        <td className="px-4 py-4 text-center">{item.v1}</td>
                        <td className="px-4 py-4 text-center">{item.v2}</td>
                        <td className="px-4 py-4 text-center">{item.v3}</td>
                        <td className="px-4 py-4">
                            {item.example.englishSentence}<br/><span className="text-slate-500">{item.example.hindiSentence}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SpokenPracticeSection: React.FC<{ practice: ILesson['spokenPractice'] }> = ({ practice }) => (
     <div className="space-y-4">
        <h4 className="font-semibold text-lg text-slate-800">{practice.title}</h4>
        <div>
            <p className="font-medium text-slate-700">English:</p>
            <p className="pl-4 border-l-4 border-teal-200 bg-slate-50 p-3 rounded-r-md">{practice.englishParagraph}</p>
        </div>
        <div>
            <p className="font-medium text-slate-700">Hindi:</p>
            <p className="pl-4 border-l-4 border-slate-200 bg-slate-50 p-3 rounded-r-md">{practice.hindiParagraph}</p>
        </div>
    </div>
);

const DailyTaskSection: React.FC<{ task: string }> = ({ task }) => (
    <div className="flex items-start space-x-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        <p className="text-lg italic text-teal-800 leading-relaxed">{task}</p>
    </div>
);


export const LessonDisplay: React.FC<{ lesson: ILesson }> = ({ lesson }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="space-y-6 animate-fade-in">
        <header className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-800">Day {lesson.day}: {lesson.theme}</h2>
            <p className="text-slate-500 mt-2">Here is your lesson for today. Focus and practice!</p>
        </header>

        <div>
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                ? 'border-teal-500 text-teal-600 font-bold'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                        >
                        {tab}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="mt-6 bg-white p-4 md:p-6 rounded-b-lg rounded-tr-lg shadow-lg">
                 {activeTab === 'Vocabulary' && <VocabularySection items={lesson.vocabulary} />}
                 {activeTab === 'Verbs' && <VerbsSection items={lesson.verbs} />}
                 {activeTab === 'Spoken Practice' && <SpokenPracticeSection practice={lesson.spokenPractice} />}
                 {activeTab === 'Daily Task' && <DailyTaskSection task={lesson.dailyTask} />}
            </div>
        </div>
    </div>
  );
};

// Add a simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }
`;
document.head.appendChild(style);
