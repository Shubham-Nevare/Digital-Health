"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { FiUser, FiEdit, FiPlusCircle, FiShield, FiAlertCircle, FiUserPlus, FiDroplet, FiPhone, FiMapPin, FiCalendar, FiHeart, FiTrash2 } from "react-icons/fi";

export default function PatientProfile({ params }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchPatient() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/patients/${unwrappedParams.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch patient info");
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        setError(err.message || "Error fetching patient info");
      } finally {
        setLoading(false);
      }
    }
    if (unwrappedParams.id) fetchPatient();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="text-center py-12 text-blue-400">
        Loading your health profile...
      </div>
    );
  }
  if (error) {
    return <div className="text-center py-12 text-red-400">{error}</div>;
  }
  if (!patient) {
    return (
      <div className="text-center py-12 text-blue-400">Profile not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Patient Header */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700 flex flex-col md:flex-row items-center gap-6">
          <img
            src={patient.profileImage || "/default-patient.png"}
            alt={patient.name}
            className="w-32 h-32 rounded-full border-4 border-gray-700 shadow-lg object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-100 mb-1 flex items-center justify-center md:justify-start gap-2">
              <FiUser className="text-blue-400" /> {patient.name}
            </h1>
            <p className="text-lg text-gray-300 mb-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <FiCalendar className="inline text-blue-400" />
              {patient.gender}, {calculateAge(patient.dateOfBirth)} years
              <span className="mx-2 text-gray-500">|</span>
              <FiDroplet className="inline text-blue-400" />
              {patient.bloodType || "Blood type not set"}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 flex flex-col items-center min-w-[80px]">
                <span className="text-xs text-blue-400">Height</span>
                <span className="font-medium text-gray-100">{patient.height || "N/A"}</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 flex flex-col items-center min-w-[80px]">
                <span className="text-xs text-green-400">Weight</span>
                <span className="font-medium text-gray-100">{patient.weight || "N/A"}</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 flex flex-col items-center min-w-[80px]">
                <span className="text-xs text-purple-400">Last Visit</span>
                <span className="font-medium text-gray-100">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-150 shadow-sm">
                <FiEdit /> Update Profile
              </button>
              <button className="border border-blue-500 text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white flex items-center gap-2 transition-all duration-150">
                <FiUserPlus /> Share Records
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-xl shadow-lg mb-8 border border-gray-700">
          <nav className="flex border-b border-gray-700 overflow-x-auto">
            {[
              { key: "overview", label: "Overview", icon: <FiUser /> },
              { key: "medical", label: "Medical", icon: <FiHeart /> },
              { key: "insurance", label: "Insurance", icon: <FiShield /> },
              { key: "emergency", label: "Emergency", icon: <FiAlertCircle /> },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-blue-400 border-b-2 border-blue-400 bg-gray-900"
                    : "text-gray-400 hover:text-blue-400"
                }`}
                aria-label={tab.label}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
                    <FiUser className="text-blue-400" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Date of Birth</span>
                      <p className="text-gray-100">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Gender</span>
                      <p className="text-gray-100">{patient.gender}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
                    <FiMapPin className="text-blue-400" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Email</span>
                      <p className="text-gray-100">{patient.email}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Phone</span>
                      <p className="text-gray-100 flex items-center gap-2"><FiPhone />{patient.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Address</span>
                      <p className="text-gray-100 flex items-center gap-2"><FiMapPin />{patient.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Medical Tab */}
            {activeTab === "medical" && (
              <div className="space-y-5">
                {/* Allergies */}
                <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                      <FiAlertCircle className="text-blue-400" /> Allergies
                    </h3>
                    <button className="text-blue-400 hover:text-blue-200 flex items-center gap-1">
                      <FiPlusCircle /> Add
                    </button>
                  </div>
                  {patient.medicalHistory?.allergies?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalHistory.allergies.map((allergy, index) => (
                        <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-blue-200 border border-blue-400 shadow-sm flex items-center gap-1">
                          {/* <FiAlertCircle className="text-blue-400" />  */}
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No allergies recorded</p>
                  )}
                </div>
                {/* Chronic Conditions */}
                <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                      <FiHeart className="text-blue-400" /> Chronic Conditions
                    </h3>
                    <button className="text-blue-400 hover:text-blue-200 flex items-center gap-1">
                      <FiPlusCircle /> Add
                    </button>
                  </div>
                  {patient.medicalHistory?.chronicConditions?.length > 0 ? (
                    <ul className="space-y-3">
                      {patient.medicalHistory.chronicConditions.map((condition, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {/* <FiHeart className="text-blue-400" /> */}
                          <span className="text-gray-200 font-medium pl-6">{condition}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">No chronic conditions recorded</p>
                  )}
                </div>
                {/* Medications */}
                <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                      <FiPlusCircle className="text-blue-400" /> Current Medications
                    </h3>
                    <button className="text-blue-400 hover:text-blue-200 flex items-center gap-1">
                      <FiPlusCircle /> Add
                    </button>
                  </div>
                  {patient.medicalHistory?.medications?.length > 0 ? (
                    <ul className="space-y-3">
                      {patient.medicalHistory.medications.map((medication, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {/* <FiPlusCircle className="text-blue-400" /> */}
                          <span className="text-gray-200 font-medium pl-6">{medication}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">No current medications recorded</p>
                  )}
                </div>
              </div>
            )}
            {/* Insurance Tab */}
            {activeTab === "insurance" && (
              <div className="space-y-5">
                {patient.insuranceInfo ? (
                  <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                        <FiShield className="text-blue-400" /> Insurance Information
                      </h3>
                      <button className="text-blue-400 hover:text-blue-200 flex items-center gap-1">
                        <FiEdit /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Provider</span>
                        <p className="text-gray-200 font-medium">{patient.insuranceInfo.provider || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Policy Number</span>
                        <p className="text-gray-200 font-mono">{patient.insuranceInfo.policyNumber || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Group Number</span>
                        <p className="text-gray-200">{patient.insuranceInfo.groupNumber || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Expiry Date</span>
                        <p className="text-gray-200">{patient.insuranceInfo.expiryDate ? new Date(patient.insuranceInfo.expiryDate).toLocaleDateString() : "Not specified"}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Cardholder</span>
                      <p className="text-gray-200">{patient.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-900 p-8 rounded-lg border-2 border-dashed border-gray-700 text-center">
                    <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiShield className="text-blue-400 text-2xl" />
                    </div>
                    <h4 className="text-gray-300 font-medium mb-2">No Insurance Added</h4>
                    <p className="text-gray-400 text-sm mb-4">Add your insurance information for faster check-ins</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm inline-flex items-center gap-2">
                      <FiPlusCircle className="mr-2" /> Add Insurance
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Emergency Tab */}
            {activeTab === "emergency" && (
              <div className="space-y-5">
                {patient.emergencyContacts?.length > 0 ? (
                  <>
                    {patient.emergencyContacts.map((contact, index) => (
                      <div key={index} className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-sm mb-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                            <FiUserPlus className="text-blue-400" /> Emergency Contact {index + 1}
                          </h3>
                          <div className="flex gap-2">
                            <button className="text-blue-400 hover:text-blue-200 flex items-center gap-1">
                              <FiEdit /> Edit
                            </button>
                            <button className="text-blue-400 hover:text-blue-200 flex items-center gap-1">
                              <FiTrash2 /> Remove
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Name</span>
                            <p className="text-gray-200 font-medium">{contact.name}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Relationship</span>
                            <p className="text-gray-200 capitalize">{contact.relationship}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Phone</span>
                            <p className="text-gray-200 flex items-center gap-2"><FiPhone />{contact.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-700 text-center hover:border-blue-400 transition-colors flex items-center justify-center gap-2">
                      <FiPlusCircle className="text-blue-400" /> <span className="text-blue-400 font-medium">Add Another Emergency Contact</span>
                    </button>
                  </>
                ) : (
                  <div className="bg-gray-900 p-8 rounded-lg border-2 border-dashed border-gray-700 text-center">
                    <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiUserPlus className="text-blue-400 text-2xl" />
                    </div>
                    <h4 className="text-gray-300 font-medium mb-2">No Emergency Contacts</h4>
                    <p className="text-gray-400 text-sm mb-4">Add at least one emergency contact for your safety</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm inline-flex items-center gap-2">
                      <FiPlusCircle className="mr-2" /> Add Emergency Contact
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
