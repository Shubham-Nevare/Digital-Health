"use client";

import { useState } from "react";
import Image from "next/image";

const PersonalInfo = ({
  user,
  formData,
  setFormData,
  profileImage,
  setProfileImage,
  isUploading,
  setIsUploading,
  fileInputRef,
  handleImageUpload,
  handleSubmit,
  addEmergencyContact,
  removeEmergencyContact,
  updateEmergencyContact,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-gray-950 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-400">
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-400 hover:text-blue-300"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Blood Type
              </label>
              <select
                value={formData.bloodType}
                onChange={(e) =>
                  setFormData({ ...formData, bloodType: e.target.value })
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Height (cm)
              </label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                placeholder="170"
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Weight (kg)
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                placeholder="70"
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={3}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Emergency Contacts */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">
                Emergency Contacts
              </h3>
              <button
                type="button"
                onClick={addEmergencyContact}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                + Add Contact
              </button>
            </div>
            <div className="space-y-4">
              {formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-medium">
                      Contact {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeEmergencyContact(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) =>
                        updateEmergencyContact(index, "name", e.target.value)
                      }
                      placeholder="Full Name"
                      className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={contact.relationship}
                      onChange={(e) =>
                        updateEmergencyContact(
                          index,
                          "relationship",
                          e.target.value
                        )
                      }
                      placeholder="Relationship"
                      className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) =>
                        updateEmergencyContact(index, "phone", e.target.value)
                      }
                      placeholder="Phone Number"
                      className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Information */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Insurance Information
            </h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    value={formData.insuranceInfo.provider}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insuranceInfo: {
                          ...formData.insuranceInfo,
                          provider: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Policy Number
                  </label>
                  <input
                    type="text"
                    value={formData.insuranceInfo.policyNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insuranceInfo: {
                          ...formData.insuranceInfo,
                          policyNumber: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Group Number
                  </label>
                  <input
                    type="text"
                    value={formData.insuranceInfo.groupNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insuranceInfo: {
                          ...formData.insuranceInfo,
                          groupNumber: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.insuranceInfo.expiryDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        insuranceInfo: {
                          ...formData.insuranceInfo,
                          expiryDate: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400">Full Name</h4>
              <p className="mt-1 text-white">{formData.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Email</h4>
              <p className="mt-1 text-white">{formData.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">
                Phone Number
              </h4>
              <p className="mt-1 text-white">{formData.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">
                Date of Birth
              </h4>
              <p className="mt-1 text-white">
                {formData.dateOfBirth
                  ? new Date(formData.dateOfBirth).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Gender</h4>
              <p className="mt-1 text-white">{formData.gender}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Blood Type</h4>
              <p className="mt-1 text-white">
                {formData.bloodType || "Not specified"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Height</h4>
              <p className="mt-1 text-white">
                {formData.height ? `${formData.height} cm` : "Not specified"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Weight</h4>
              <p className="mt-1 text-white">
                {formData.weight ? `${formData.weight} kg` : "Not specified"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400">Address</h4>
            <p className="mt-1 text-white">{formData.address}</p>
          </div>

          {/* Emergency Contacts Display */}
          {formData.emergencyContacts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                Emergency Contacts
              </h4>
              <div className="space-y-3">
                {formData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs font-medium text-gray-400">
                          Name
                        </h5>
                        <p className="mt-1 text-white">{contact.name}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-400">
                          Relationship
                        </h5>
                        <p className="mt-1 text-white">
                          {contact.relationship}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-400">
                          Phone
                        </h5>
                        <p className="mt-1 text-white">{contact.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insurance Information Display */}
          {formData.insuranceInfo.provider && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                Insurance Information
              </h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-medium text-gray-400">
                      Provider
                    </h5>
                    <p className="mt-1 text-white">
                      {formData.insuranceInfo.provider}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-gray-400">
                      Policy Number
                    </h5>
                    <p className="mt-1 text-white">
                      {formData.insuranceInfo.policyNumber}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-gray-400">
                      Group Number
                    </h5>
                    <p className="mt-1 text-white">
                      {formData.insuranceInfo.groupNumber}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-gray-400">
                      Expiry Date
                    </h5>
                    <p className="mt-1 text-white">
                      {formData.insuranceInfo.expiryDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
