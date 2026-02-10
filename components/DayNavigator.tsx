
import React, { useState, ChangeEvent } from 'react';

interface DayNavigatorProps {
  currentDay: number;
  onDayChange: (day: number) => void;
}

export const DayNavigator: React.FC<DayNavigatorProps> = ({ currentDay, onDayChange }) => {
  const [inputDay, setInputDay] = useState<string>(currentDay.toString());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputDay(e.target.value);
  };

  const handleGoToDay = () => {
    const dayNum = parseInt(inputDay, 10);
    if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 365) {
      onDayChange(dayNum);
    } else {
        // Reset input to current day if invalid
        setInputDay(currentDay.toString());
    }
  };
  
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToDay();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
      <button
        onClick={() => onDayChange(currentDay - 1)}
        disabled={currentDay <= 1}
        className="w-full sm:w-auto px-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-sm hover:bg-teal-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Previous Day
      </button>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-700">Day</span>
        <input 
            type="number" 
            min="1"
            max="365"
            value={inputDay}
            onChange={handleInputChange}
            onBlur={handleGoToDay}
            onKeyPress={handleInputKeyPress}
            className="w-20 text-center border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
        <span className="font-semibold text-slate-700">of 365</span>
      </div>

      <button
        onClick={() => onDayChange(currentDay + 1)}
        disabled={currentDay >= 365}
        className="w-full sm:w-auto px-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow-sm hover:bg-teal-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
      >
        Next Day
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
