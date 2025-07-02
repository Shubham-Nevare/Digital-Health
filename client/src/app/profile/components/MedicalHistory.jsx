"use client";

import { useState } from "react";

const MedicalHistory = ({
  medicalHistory,
  setMedicalHistory,
  newAllergy,
  setNewAllergy,
  newCondition,
  setNewCondition,
  newMedication,
  setNewMedication,
  addAllergy,
  removeAllergy,
  addCondition,
  removeCondition,
  addMedication,
  removeMedication,
  saveMedicalHistory,
  isEditingMedical,
  setIsEditingMedical
}) => {
  return (
    <div className="bg-gray-950 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-400">
          Medical History
        </h2>
        <button
          onClick={() => setIsEditingMedical(!isEditingMedical)}
          className="text-blue-400 hover:text-blue-300"
        >
          {isEditingMedical ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditingMedical ? (
        <div className="space-y-6">
          {/* Allergies */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Allergies</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add allergy..."
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addAllergy}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {medicalHistory.allergies.map((allergy, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-900 rounded-lg p-3"
                >
                  <span className="text-white">{allergy}</span>
                  <button
                    onClick={() => removeAllergy(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Chronic Conditions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Chronic Conditions
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="Add condition..."
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addCondition}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {medicalHistory.chronicConditions.map((condition, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-900 rounded-lg p-3"
                >
                  <span className="text-white">{condition}</span>
                  <button
                    onClick={() => removeCondition(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Current Medications
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  placeholder="Add medication..."
                  className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addMedication}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {medicalHistory.medications.map((medication, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-900 rounded-lg p-3"
                >
                  <span className="text-white">{medication}</span>
                  <button
                    onClick={() => removeMedication(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditingMedical(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveMedicalHistory}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Allergies Display */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Allergies</h3>
            {medicalHistory.allergies.length > 0 ? (
              <div className="space-y-2">
                {medicalHistory.allergies.map((allergy, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-lg p-3"
                  >
                    <span className="text-white">{allergy}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No allergies recorded</p>
            )}
          </div>

          {/* Chronic Conditions Display */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">
              Chronic Conditions
            </h3>
            {medicalHistory.chronicConditions.length > 0 ? (
              <div className="space-y-2">
                {medicalHistory.chronicConditions.map((condition, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-lg p-3"
                  >
                    <span className="text-white">{condition}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No chronic conditions recorded</p>
            )}
          </div>

          {/* Current Medications Display */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">
              Current Medications
            </h3>
            {medicalHistory.medications.length > 0 ? (
              <div className="space-y-2">
                {medicalHistory.medications.map((medication, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-lg p-3"
                  >
                    <span className="text-white">{medication}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No medications recorded</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory; 