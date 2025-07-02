"use client";
import React, { useState, useEffect } from "react";
import {
  FiClock,
  FiAlertTriangle,
  FiUserCheck,
  FiCalendar,
  FiBarChart2,
  FiSearch,
  FiBell,
  FiUser,
  FiClipboard,
  FiFileText,
  FiX,
  FiCheck,
} from "react-icons/fi";
import ClientOnlyClock from "./component/ClientOnlyClock";
import Cookies from "js-cookie";

export default function DoctorDashboard() {
  // State management
  const [activeTab, setActiveTab] = useState("queue");
  const [patientQueue, setPatientQueue] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [emergencyPatients, setEmergencyPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPatient, setCurrentPatient] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);

  // Fetch appointments data
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      const token = Cookies.get("token");
      if (!token) {
        setError("Authentication token not found.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        const doctorAppointments = data.appointments || [];

        // Robust date comparison using string
        const isToday = (dateStr) =>
          dateStr
            ? dateStr.slice(0, 10) === new Date().toISOString().slice(0, 10)
            : false;

        // Patient Queue: confirmed and pending appointments for today
        setPatientQueue(
          doctorAppointments.filter(
            (a) =>
              isToday(a.appointmentDate) &&
              (a.status === "confirmed" || a.status === "pending")
          )
        );

        // Today's Appointments: all appointments for today
        setTodaysAppointments(
          doctorAppointments.filter((a) => isToday(a.appointmentDate))
        );

        // Emergency patients
        setEmergencyPatients(doctorAppointments.filter((a) => a.isEmergency));

        // Store all appointments in state
        setAllAppointments(doctorAppointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Set current patient from queue
  useEffect(() => {
    if (patientQueue.length > 0 && !currentPatient) {
      setCurrentPatient(
        patientQueue.find((p) => p.status === "in-progress") || patientQueue[0]
      );
    }
  }, [patientQueue, currentPatient]);

  // Filter patients based on search query
  const filteredPatients = patientQueue.filter(
    (patient) =>
      patient.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle appointment confirmation
  const handleConfirmAppointment = async (appointmentId) => {
    const token = Cookies.get("token");
    if (!token) {
      alert("You must be logged in to confirm appointments.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "confirmed" }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to confirm appointment");
      }

      const updatedAppointment = await res.json();

      // Update state
      setTodaysAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? updatedAppointment : appt
        )
      );
      setPatientQueue((prev) =>
        [...prev, updatedAppointment].sort((a, b) =>
          a.appointmentTime.localeCompare(b.appointmentTime)
        )
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle appointment rejection
  const handleRejectAppointment = (appointmentId) => {
    setCurrentAppointmentId(appointmentId);
    setShowRejectionModal(true);
  };

  // Submit rejection with reason
  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    const token = Cookies.get("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${currentAppointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "rejected",
            rejectionReason: `Rejected by Doctor - ${rejectionReason}`,
          })
          
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to reject appointment");
      }

      const updatedAppointment = await res.json();

      // Update state
      setTodaysAppointments((prev) =>
        prev.map((appt) =>
          appt._id === currentAppointmentId ? updatedAppointment : appt
        )
      );

      // Close modal and reset
      setShowRejectionModal(false);
      setRejectionReason("");
      setCurrentAppointmentId(null);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Mark appointment as done
  const handleMarkAsDone = async (appointmentId) => {
    if (!confirm("Are you sure you want to mark this consultation as completed?")) {
      return;
    }
    const token = Cookies.get("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "completed" }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update appointment status.");
      }
      
      // Remove from queue and update current patient
      const newQueue = patientQueue.filter((p) => p._id !== appointmentId);
      setPatientQueue(newQueue);
      setCurrentPatient(newQueue.length > 0 ? newQueue[0] : null);
      
      alert("Consultation marked as completed.");

    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-8 px-4">
      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Reject Appointment
            </h3>
            <textarea
              className="w-full bg-gray-700 text-white rounded p-3 mb-4"
              rows={4}
              placeholder="Enter reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason("");
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-2">
              Doctor Dashboard
            </h1>
            <ClientOnlyClock />
          </div>
          <div className="relative">
            <button className="p-2 rounded-full bg-blue-800 text-blue-200 hover:bg-blue-700 relative">
              <FiBell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search patients, conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Queue and Emergency */}
          <div className="space-y-6">
            {/* Patient Queue Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiUserCheck className="mr-2" /> Patient Queue
                </h2>
                <span className="bg-blue-900 text-blue-200 text-sm px-3 py-1 rounded-full">
                  {patientQueue.length} patients
                </span>
              </div>
              <div className="p-4">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setActiveTab("queue")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "queue"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    All Patients
                  </button>
                  <button
                    onClick={() => setActiveTab("emergency")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === "emergency"
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    Emergency
                  </button>
                </div>

                {activeTab === "queue" ? (
                  <div className="space-y-3">
                    {isLoading ? (
                      <p className="text-gray-400">Loading...</p>
                    ) : error ? (
                      <p className="text-red-400">{error}</p>
                    ) : filteredPatients.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">
                        No patients in the queue
                      </p>
                    ) : (
                      filteredPatients.map((patient) => (
                        <div
                          key={patient._id + '-' + patient.appointmentTime}
                          className={`p-4 rounded-lg border-l-4 cursor-pointer ${
                            patient.isEmergency
                              ? "border-red-500 bg-gray-750"
                              : "border-blue-500"
                          } ${
                            patient.status === "in-progress"
                              ? "ring-2 ring-blue-400"
                              : ""
                          }`}
                          onClick={() => setCurrentPatient(patient)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">
                                {patient.patient.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {patient.symptoms}
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  patient.status === "in-progress"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                                }`}
                              >
                                {patient.status === "in-progress"
                                  ? "In Progress"
                                  : "Waiting"}
                              </span>
                              <div className="text-blue-300 text-sm mt-1">
                                {patient.appointmentTime}
                              </div>
                            </div>
                          </div>
                          {patient.isEmergency && (
                            <div className="mt-2 flex items-center text-red-400 text-sm">
                              <FiAlertTriangle className="mr-1" /> High Priority
                            </div>
                          )}
                          {patient.status === "pending" && (
                            <div className="mt-3 pt-3 border-t border-blue-800 flex justify-end space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRejectAppointment(patient._id);
                                }}
                                className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 flex items-center"
                              >
                                <FiX className="mr-1" /> Reject
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleConfirmAppointment(patient._id);
                                }}
                                className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 flex items-center"
                              >
                                <FiCheck className="mr-1" /> Confirm
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {isLoading ? (
                      <p className="text-gray-400">Loading...</p>
                    ) : error ? (
                      <p className="text-red-400">{error}</p>
                    ) : (
                      emergencyPatients.map((patient) => (
                        <div
                          key={patient._id}
                          className="p-4 rounded-lg bg-gradient-to-r from-red-900 to-red-700 border-l-4 border-red-400"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">
                                {patient.patient.name}
                              </h3>
                              <p className="text-sm text-red-200">
                                {patient.symptoms}
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  patient.isEmergency
                                    ? "bg-red-500 text-white"
                                    : "bg-orange-500 text-white"
                                }`}
                              >
                                {patient.isEmergency ? "Critical" : "Urgent"}
                              </span>
                              <div className="text-red-200 text-sm mt-1">
                                {patient.appointmentTime}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <button className="bg-white text-red-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-100">
                              Accept Case
                            </button>
                            <button className="bg-red-800 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-700">
                              Request Assistance
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Alerts Card */}
            {emergencyPatients.length > 0 && (
              <div className="bg-gradient-to-br from-red-900 to-red-700 rounded-xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FiAlertTriangle className="mr-2" /> Emergency Alerts
                  </h2>
                  <span className="bg-red-800 text-red-200 text-sm px-3 py-1 rounded-full animate-pulse">
                    {emergencyPatients.length} urgent
                  </span>
                </div>
                <div className="p-4">
                  <div className="bg-red-800 bg-opacity-50 rounded-lg p-3 mb-3 border border-red-600">
                    <div className="flex items-center">
                      <div className="bg-red-600 p-2 rounded-full mr-3">
                        <FiAlertTriangle className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Code Blue - ICU
                        </h3>
                        <p className="text-sm text-red-200">
                          Cardiac arrest in progress
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-white text-red-700 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors">
                    View All Emergency Cases
                  </button>
                </div>
              </div>
            )}
            {/* Recent Lab Results Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-cyan-800">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  Recent Lab Results
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="bg-gray-750 p-3 rounded-lg flex items-center">
                    <div className="bg-cyan-700 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
                      <span className="text-xs">CBC</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        Complete Blood Count
                      </h3>
                      <p className="text-xs text-gray-400">
                        Jun 14, 2023 • 10:42 AM
                      </p>
                    </div>
                    <button className="text-cyan-400 hover:text-white text-sm">
                      View
                    </button>
                  </div>
                  <div className="bg-gray-750 p-3 rounded-lg flex items-center">
                    <div className="bg-cyan-700 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
                      <span className="text-xs">LFT</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        Liver Function Test
                      </h3>
                      <p className="text-xs text-gray-400">
                        Jun 10, 2023 • 09:15 AM
                      </p>
                    </div>
                    <button className="text-cyan-400 hover:text-white text-sm">
                      View
                    </button>
                  </div>
                </div>
                <button className="w-full mt-4 bg-cyan-800 hover:bg-cyan-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  View All Results
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Current Patient and Charts */}
          <div className="space-y-6">
            {/* Current Patient Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiClipboard className="mr-2" /> Current Patient
                </h2>
              </div>
              <div className="p-6">
                {currentPatient ? (
                  <>
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mr-4">
                        {currentPatient.patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {currentPatient.patient.name}
                        </h3>
                        <p className="text-gray-400">
                          {currentPatient.symptoms}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-blue-400 text-sm flex items-center">
                            <FiClock className="mr-1" />{" "}
                            {currentPatient.appointmentTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-750 p-4 rounded-lg">
                        <h4 className="text-gray-400 text-sm mb-1">Age</h4>
                        <p className="text-white font-medium">
                          {currentPatient.patient.age || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-750 p-4 rounded-lg">
                        <h4 className="text-gray-400 text-sm mb-1">
                          Blood Type
                        </h4>
                        <p className="text-white font-medium">
                          {currentPatient.patient.bloodType || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-750 p-4 rounded-lg">
                        <h4 className="text-gray-400 text-sm mb-1">
                          Last Visit
                        </h4>
                        <p className="text-white font-medium">
                          {currentPatient.patient.lastVisit || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-750 p-4 rounded-lg">
                        <h4 className="text-gray-400 text-sm mb-1">
                          Allergies
                        </h4>
                        <p className="text-white font-medium">
                          {currentPatient.patient.allergies?.join(", ") ||
                            "None"}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-gray-400 text-sm mb-2">
                        Recent Notes
                      </h4>
                      <div className="bg-gray-750 rounded-lg p-4">
                        <p className="text-gray-300 text-sm">
                          {currentPatient.notes ||
                            "No notes available for this patient."}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleMarkAsDone(currentPatient._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FiCheck /> Mark as Done
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex-1">
                        Start Consultation
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Select a patient from the queue to view details
                  </div>
                )}
              </div>
            </div>
            {/* Quick Prescriptions Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-green-800">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiFileText className="mr-2" /> Quick Prescriptions
                </h2>
              </div>
              <div className="p-4">
                <div className="bg-gray-750 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-700 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
                      <FiFileText />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        Common Prescriptions
                      </h3>
                      <p className="text-xs text-gray-400">
                        Quickly prescribe common medications
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-2 rounded">
                      Amoxicillin
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-2 rounded">
                      Ibuprofen
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-2 rounded">
                      Lisinopril
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-2 rounded">
                      Metformin
                    </button>
                  </div>
                </div>
                <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  New Prescription
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Appointments and Prescriptions */}
          <div className="space-y-6">
            {/* All Appointments Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiCalendar className="mr-2" /> All Appointments
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {isLoading ? (
                    <p className="text-gray-400">Loading...</p>
                  ) : error ? (
                    <p className="text-red-400">{error}</p>
                  ) : allAppointments.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">
                      No appointments found
                    </p>
                  ) : (
                    allAppointments.map((appt) => (
                      <div
                        key={appt._id}
                        className={`p-4 rounded-lg ${
                          appt.status === "completed"
                            ? "bg-gray-750 opacity-70"
                            : appt.status === "rejected"
                            ? "bg-red-900 bg-opacity-30 border border-red-800"
                            : "bg-indigo-900 bg-opacity-30 border border-indigo-800"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-white">
                              {appt.patient.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {appt.consultationType}
                            </p>
                            <p className="text-sm text-gray-400">
                              {new Date(
                                appt.appointmentDate
                              ).toLocaleDateString()}{" "}
                              {appt.appointmentTime}
                            </p>
                            {appt.status === "rejected" &&
                              appt.rejectionReason && (
                                <p className="text-sm text-red-300 mt-1">
                                  <strong>Reason:</strong>{" "}
                                  {appt.rejectionReason}
                                </p>
                              )}
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-block mt-1 text-xs px-2 py-1 rounded-full capitalize ${
                                appt.status === "pending"
                                  ? "bg-yellow-700 text-yellow-200"
                                  : appt.status === "confirmed"
                                  ? "bg-green-700 text-green-200"
                                  : appt.status === "rejected"
                                  ? "bg-red-700 text-red-200"
                                  : "bg-indigo-700 text-indigo-200"
                              }`}
                            >
                              {appt.status}
                            </span>
                          </div>
                        </div>
                        {appt.status === "pending" && (
                          <div className="mt-3 pt-3 border-t border-indigo-800 flex justify-end space-x-2">
                            <button
                              onClick={() => handleRejectAppointment(appt._id)}
                              className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 flex items-center"
                            >
                              <FiX className="mr-1" /> Reject
                            </button>
                            <button
                              onClick={() => handleConfirmAppointment(appt._id)}
                              className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 flex items-center"
                            >
                              <FiCheck className="mr-1" /> Confirm
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiBarChart2 className="mr-2" /> Today's Stats
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <div className="text-blue-400 text-2xl font-bold mb-1">
                      {todaysAppointments.length}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Total Appointments
                    </div>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <div className="text-green-400 text-2xl font-bold mb-1">
                      {
                        todaysAppointments.filter(
                          (a) => a.status === "completed"
                        ).length
                      }
                    </div>
                    <div className="text-gray-400 text-xs">Completed</div>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <div className="text-yellow-400 text-2xl font-bold mb-1">
                      32m
                    </div>
                    <div className="text-gray-400 text-xs">Avg. Time</div>
                  </div>
                </div>
                <div className="mt-4 h-40 bg-gray-750 rounded-lg flex items-center justify-center text-gray-500">
                  [Consultation Time Chart]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
