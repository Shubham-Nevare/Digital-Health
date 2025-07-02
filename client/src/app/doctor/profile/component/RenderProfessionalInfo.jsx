"use client"
import { useState } from "react";
import {
  FiEdit2,
  FiX,
  FiCheck,
  FiPlus,
  FiClock,
  FiGlobe,
  FiBook,
  FiAward,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const RenderProfessionalInfo = ({
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    handleSubmit,
    addEducation,
    updateEducation,
    removeEducation,
    addCertification,
    updateCertification,
    removeCertification
  }) => {
    const [expandedSections, setExpandedSections] = useState({
      about: true,
      education: true,
      certifications: true,
    });

    const toggleSection = (section) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-800 to-blue-600">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FiEdit2 className="mr-2" />
          Professional Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            isEditing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors shadow-md`}
          aria-label={isEditing ? "Cancel editing" : "Edit information"}
        >
          {isEditing ? (
            <>
              <FiX size={16} /> Cancel
            </>
          ) : (
            <>
              <FiEdit2 size={16} /> Edit
            </>
          )}
        </button>
      </div>

      <div className="p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Column */}
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Specialty
                  </label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Experience
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                      placeholder="e.g. 10 years"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      yrs
                    </span>
                  </div>
                </div>
              </div>

              {/* Practice Information Column */}
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <FiClock className="text-blue-300" /> Availability
                  </label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="e.g. Mon-Fri 9am-5pm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <FaRupeeSign className="text-blue-300" /> Consultation Fee
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.consultationFee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          consultationFee: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pl-8"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    ₹
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Consultation Duration
                  </label>
                  <select
                    value={formData.consultationDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consultationDuration: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">Select duration</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <FiGlobe className="text-blue-300" /> Languages
                  </label>
                  <input
                    type="text"
                    value={formData.languages.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        languages: e.target.value
                          .split(",")
                          .map((lang) => lang.trim()),
                      })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="English, Spanish, French"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="border-t border-gray-700 pt-6">
              <button
                type="button"
                onClick={() => toggleSection("about")}
                className="flex items-center justify-between w-full mb-2"
              >
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  About
                </h3>
                {expandedSections.about ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {expandedSections.about && (
                <div className="mb-4">
                  <textarea
                    value={formData.about}
                    onChange={(e) =>
                      setFormData({ ...formData, about: e.target.value })
                    }
                    rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Tell patients about your practice and approach..."
                  />
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={() => toggleSection("education")}
                  className="flex items-center gap-2"
                >
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <FiBook className="text-blue-300" /> Education
                  </h3>
                  {expandedSections.education ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </button>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  <FiPlus size={14} /> Add
                </button>
              </div>

              {expandedSections.education &&
                formData.education.map((edu, index) => (
                  <div key={index} className="flex gap-3 items-center mb-3">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(index, "year", e.target.value)
                      }
                      className="w-24 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-gray-700 transition-colors"
                      aria-label="Remove education"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
            </div>

            {/* Certifications Section */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={() => toggleSection("certifications")}
                  className="flex items-center gap-2"
                >
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <FiAward className="text-blue-300" /> Certifications
                  </h3>
                  {expandedSections.certifications ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </button>
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  <FiPlus size={14} /> Add
                </button>
              </div>

              {expandedSections.certifications &&
                formData.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-3 items-center mb-3">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) =>
                        updateCertification(index, e.target.value)
                      }
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Certification name"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-gray-700 transition-colors"
                      aria-label="Remove certification"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
              >
                <FiCheck size={16} /> Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Full Name
                  </h3>
                  <p className="text-white text-lg font-medium">
                    {formData.name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Email</h3>
                  <p className="text-white text-lg">{formData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Specialty
                  </h3>
                  <p className="text-white text-lg">{formData.specialty}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Experience
                  </h3>
                  <p className="text-white text-lg">{formData.experience}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 flex items-center">
                    <FiClock className="mr-2" /> Availability
                  </h3>
                  <p className="text-white text-lg">{formData.availability}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 flex items-center">
                    <FaRupeeSign className="mr-2" /> Consultation Fee
                  </h3>
                  <p className="text-white text-lg">
                  ₹{formData.consultationFee}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Consultation Duration
                  </h3>
                  <p className="text-white text-lg">
                    {formData.consultationDuration}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 flex items-center">
                    <FiGlobe className="mr-2" /> Languages
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {formData.about && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  About
                </h3>
                <p className="text-white text-lg">{formData.about}</p>
              </div>
            )}

            {formData.education.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                  <FiBook className="mr-2" /> Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-4 rounded-lg shadow"
                    >
                      <p className="text-white font-medium text-lg">
                        {edu.degree}
                      </p>
                      <p className="text-blue-300">{edu.institution}</p>
                      <p className="text-gray-400">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.certifications.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                  <FiAward className="mr-2" /> Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-4 rounded-lg shadow flex items-center"
                    >
                      <FiAward className="text-yellow-400 mr-3" />
                      <p className="text-white">{cert}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default RenderProfessionalInfo;