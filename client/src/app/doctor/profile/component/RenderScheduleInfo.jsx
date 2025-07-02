import React from "react";
import { FiCalendar, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const RenderScheduleInfo = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FiCalendar className="text-blue-400" />
            Schedule Management
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
            <FiPlus size={16} />
            Add Availability
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 h-96 flex flex-col">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-700 rounded-md text-sm">Day</button>
              <button className="px-3 py-1 bg-gray-700 rounded-md text-sm">Week</button>
              <button className="px-3 py-1 bg-blue-600 rounded-md text-sm">Month</button>
            </div>
            <h3 className="text-lg font-medium text-white">June 2023</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-700">
                <FiChevronLeft className="text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700">
                <FiChevronRight className="text-gray-400" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-gray-400 text-sm font-medium py-2"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 flex-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-md p-1 min-h-12">
                {i < 30 && (
                  <>
                    <div className="text-right text-sm text-gray-400 pr-1">
                      {i + 1}
                    </div>
                    {i % 7 === 3 && (
                      <div className="bg-blue-900/50 text-blue-300 text-xs p-1 rounded mt-1">
                        3 appointments
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderScheduleInfo;
