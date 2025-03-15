import React from 'react';

const EmptyState = () => {
  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-lg p-6 w-32 h-32 flex flex-col justify-between">
        <div className="w-20 h-4 bg-gray-200 rounded-md"></div>
        <div className="flex justify-between">
          <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex justify-between">
          <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      <div className="absolute -right-4 -top-4 bg-white rounded-full shadow-md flex items-center justify-center w-8 h-8 text-2xl font-semibold">
        0
      </div>
    </div>
  );
};

export default EmptyState;