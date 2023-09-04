import React from 'react';

type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="progressBar">
      <div
        className="progress"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ProgressBar;
