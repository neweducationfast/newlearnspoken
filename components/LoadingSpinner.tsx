
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md">
      <div className="w-12 h-12 border-4 border-t-4 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-semibold">Generating your lesson for the day...</p>
      <p className="mt-2 text-sm text-slate-500">This may take a few moments. Thank you for your patience!</p>
    </div>
  );
};
