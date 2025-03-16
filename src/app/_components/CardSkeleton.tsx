import React from "react";

export default function CardSkeleton() {
  return (
    <div className="bg-card border  rounded-xl shadow px-6 py-4  animate-pulse">
      <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="mt-4 h-3 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="mt-2 h-3 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
}

