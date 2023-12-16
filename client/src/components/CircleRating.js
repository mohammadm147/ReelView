import React from 'react';

const CircleRating = ({ rating }) => {
  // Calculate percentage
  const percentage = Math.round(((rating / 10) * 100) * 10) / 10;

  // Determine border color based on thresholds
  let borderColor = '#ccc'; // Default border color

  if (percentage >= 75) {
    borderColor = '#22c55e'; // Green
  } else if (percentage >= 50) {
    borderColor = '#eab308'; // Yellow
  } else if (percentage >= 25) {
    borderColor = '#ea580c'; // Orange
  } else if (percentage > 0) {
    borderColor = '#b91c1c'; // Red
  }

  return (
    <div className="relative w-16 h-16 transition">
      {/* Circle with black fill and colored border */}
      <div
        className="absolute inset-0 rounded-full bg-black border-4"
        style={{
          borderColor,
          clipPath: `polygon(50% 50%, 50% 0, 0 0, 0 50%, 100% 50%, 100% 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%, 0 50%)`,
          transform: `rotate(${90 + (percentage / 100) * 360}deg)`,
        }}
      ></div>

      {/* Center content (rating) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex text-lg font-semibold text-white">{percentage}<p className="text-xs font-normal">%</p></span>
      </div>
    </div>
  );
};

export default CircleRating;