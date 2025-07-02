import React from "react";
import {
  FiUsers,
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const RenderPatientInfo = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FiUsers className="text-blue-400" />
          Patient Records
        </h2>
      </div>
      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
            <FiPlus size={16} />
            New Patient
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-left">
                <th className="pb-3 pl-2">Patient</th>
                <th className="pb-3">Last Visit</th>
                <th className="pb-3">Next Appointment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-700 hover:bg-gray-750/50"
                >
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <FiUsers className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          Patient {i + 1}
                        </div>
                        <div className="text-sm text-gray-400">
                          ID: P00{i + 1}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-300">Jun {15 - i}, 2023</td>
                  <td className="py-4 text-gray-300">Jun {20 + i}, 2023</td>
                  <td className="py-4">
                    <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <button className="text-blue-400 hover:text-blue-300 p-1">
                      <FiEye />
                    </button>
                    <button className="text-gray-400 hover:text-white p-1 ml-2">
                      <FiEdit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <div>Showing 1 to 3 of 12 patients</div>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
              disabled
            >
              <FiChevronLeft />
            </button>
            <button className="w-8 h-8 bg-blue-600 text-white rounded-md">
              1
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-700">2</button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-700">3</button>
            <button className="p-2 rounded-md hover:bg-gray-700">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderPatientInfo;
