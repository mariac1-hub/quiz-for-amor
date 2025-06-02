
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/80 text-sm font-medium">
          Progresso
        </span>
        <span className="text-white/80 text-sm font-medium">
          {current} de {total}
        </span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-white to-pink-200 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full bg-white/30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
