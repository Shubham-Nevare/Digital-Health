import React from "react";
import { FiStar, FiUser } from "react-icons/fi";

const RenderReviewsInfo = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FiStar className="text-blue-400" />
          Patient Reviews
        </h2>
      </div>

      <div className="p-6">
        {/* Ratings Summary */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-white">4.8</div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Based on 24 reviews
              </div>
            </div>
          </div>

          {/* Star Distribution */}
          <div className="w-64">
            {[
              { star: "5★", width: "w-4/5", count: 20 },
              { star: "4★", width: "w-1/5", count: 4 },
              { star: "3★", width: "w-0", count: 0 },
            ].map(({ star, width, count }, index) => (
              <div className="flex items-center gap-2 mb-1" key={index}>
                <span className="text-sm text-gray-400 w-8">{star}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div className={`bg-yellow-400 h-2 rounded-full ${width}`}></div>
                </div>
                <span className="text-sm text-gray-400 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <FiUser className="text-gray-400" />
                  </div>
                  <div className="font-medium text-white">Patient {i + 1}</div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[1, 2, 3, 4].map((star) => (
                    <FiStar key={star} className="fill-current" />
                  ))}
                  <FiStar
                    className={
                      i === 0 ? "fill-current text-yellow-400" : "text-gray-600"
                    }
                  />
                </div>
              </div>
              <div className="text-gray-300 mb-2">Jun {10 + i}, 2023</div>
              <p className="text-gray-300">
                {i === 0
                  ? "Dr. Smith provided excellent care and was very thorough in explaining my treatment options."
                  : i === 1
                  ? "Professional and knowledgeable. The appointment started right on time."
                  : "Good experience overall, but the waiting time could be improved."}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <button className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default RenderReviewsInfo;
