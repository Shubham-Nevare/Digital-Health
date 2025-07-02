"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { medicalRecords } from "@/data/medicalRecords";
// import { paymentHistory } from "@/data/paymentHistory";
import { FiCalendar, FiDownload, FiFileText } from "react-icons/fi";
// import { upcomingAppointments } from '@/data/upcomingAppointments';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  const handleCancel = async (appointmentId) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    const token = Cookies.get("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cancellationReason: "Cancelled by user" }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel appointment");
      }

      const cancelledAppointment = await res.json();

      // Update UI
      setUpcomingAppointments((prev) =>
        prev.filter((app) => app._id !== appointmentId)
      );
      setPastAppointments((prev) => [
        cancelledAppointment.appointment,
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
      alert("Could not cancel the appointment. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAppointments = async (filter) => {
      setIsLoading(true);
      setError(null);
      const token = Cookies.get("token");

      if (!token) {
        setError("You must be logged in to view appointments.");
        setIsLoading(false);
        return;
      }

      try {
        const query = new URLSearchParams(filter).toString();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments?${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch appointments`);
        }

        const data = await res.json();

        if (filter.status) {
          if (filter.status.includes("pending")) {
            setUpcomingAppointments(data.appointments);
          } else {
            setPastAppointments(data.appointments);
          }
        } else if (filter.paymentStatus) {
          setPaymentHistory(data.appointments);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === "upcoming") {
      fetchAppointments({ status: "pending,confirmed" });
    } else if (activeTab === "past") {
      fetchAppointments({ status: "completed,cancelled,no-show,rejected" });
    } else if (activeTab === "payments") {
      fetchAppointments({ paymentStatus: "paid" });
    }
  }, [activeTab]);

  const renderUpcomingAppointments = () => {
    if (isLoading && activeTab === "upcoming")
      return <p className="text-gray-400">Loading appointments...</p>;
    if (error) return <p className="text-red-400">{error}</p>;
    if (upcomingAppointments.length === 0) {
      return (
        <p className="text-gray-400">You have no upcoming appointments.</p>
      );
    }

    return (
      <div className="space-y-4">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-gray-950 rounded-xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-200"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Info Section */}
              <div className="flex items-start space-x-4 flex-1">
                {/* Doctor Image - Hidden on mobile if already shown in header */}
                <img
                  src={
                    appointment.doctor.profileImage ||
                    "/images/default-avatar.jpg"
                  }
                  alt={appointment.doctor.name}
                  className="hidden md:block w-16 h-16 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 md:mb-1">
                    <img
                      src={
                        appointment.doctor.profileImage ||
                        "/images/default-avatar.jpg"
                      }
                      alt={appointment.doctor.name}
                      className="w-12 h-12 rounded-full object-cover md:hidden"
                    />
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-400">
                        Dr. {appointment.doctor.name}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base">
                        {appointment.doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Details - Grid for mobile, flex for desktop */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 md:flex md:flex-wrap md:gap-x-8 md:items-center">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-gray-500 hidden md:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-300 text-sm md:text-base">
                        <span className="md:hidden">Date: </span>
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-gray-500 hidden md:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-gray-300 text-sm md:text-base">
                        <span className="md:hidden">Time: </span>
                        {appointment.appointmentTime}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-gray-500 hidden md:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={
                            appointment.consultationType === "Video Call"
                              ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              : "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          }
                        />
                      </svg>
                      <p className="text-gray-300 text-sm md:text-base">
                        <span className="md:hidden">Type: </span>
                        {appointment.consultationType}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <p className="text-gray-300 text-sm md:text-base capitalize">
                        <span className="md:hidden">Status: </span>
                        {appointment.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-3 md:w-48 flex-shrink-0">
                {appointment.consultationType === "video" ||
                appointment.consultationType === "audio" ? (
                  <a
                    href={appointment.meetingLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Join Call</span>
                  </a>
                ) : appointment.consultationType === "chat" ? (
                  <Link
                    href={`/chat/${appointment._id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>View Chat</span>
                  </Link>
                ) : (
                  <div className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>In-Person</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    /* Handle reschedule */
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Reschedule</span>
                </button>

                <button
                  onClick={() => handleCancel(appointment._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 col-span-2 md:col-span-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPastConsultations = () => {
    if (isLoading && activeTab === "past") {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
          <p className="text-red-400">Error loading consultations: {error}</p>
          <button 
            onClick={fetchAppointments}
            className="mt-2 text-sm bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      );
    }
  
    if (pastAppointments.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="mx-auto max-w-md">
            <FiCalendar className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-300">No past consultations</h3>
            <p className="mt-2 text-gray-500">
              You haven't had any consultations yet. Book one to get started.
            </p>
            <button
              onClick={() => setActiveTab("book")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Book Consultation
            </button>
          </div>
        </div>
      );
    }
  
    return (
      <div className="space-y-4 md:space-y-6">
        {pastAppointments.map((consultation) => (
          <div
            key={consultation._id}
            className="bg-gray-800/50 rounded-xl shadow-md p-4 md:p-6 hover:ring-1 hover:ring-blue-500 transition-all duration-200 border border-gray-700"
          >
            {/* Doctor Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={
                    consultation.doctor.profileImage ||
                    "/images/default-avatar.jpg"
                  }
                  alt={consultation.doctor.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-blue-400 flex-shrink-0"
                  loading="lazy"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base md:text-lg font-semibold text-blue-400">
                      Dr. {consultation.doctor.name}
                    </h3>
                    <span className="hidden md:inline-block text-gray-500">•</span>
                    <span className="text-sm md:text-base text-gray-400">
                      {consultation.doctor.specialty}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-500">
                    <span>
                      {new Date(consultation.appointmentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{consultation.appointmentTime}</span>
                  </div>
                </div>
              </div>
  
              <div className="mt-2 md:mt-0">
                <span className="inline-block px-3 py-1 rounded-full text-xs md:text-sm bg-gray-700 text-gray-300 capitalize">
                  {consultation.consultationType}
                </span>
              </div>
            </div>
  
            {/* Consultation Details */}
            <div className="mt-4 md:mt-6">
              {consultation.symptoms && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Notes</h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2">
                    {consultation.symptoms}
                  </p>
                </div>
              )}
  
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium
                    ${consultation.status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-800' : ''}
                    ${consultation.status === 'confirmed' ? 'bg-blue-900/30 text-blue-300 border border-blue-800' : ''}
                    ${consultation.status === 'cancelled' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-800' : ''}
                    ${consultation.status === 'rejected' ? 'bg-red-900/30 text-red-300 border border-red-800' : ''}
                    ${consultation.status === 'no-show' ? 'bg-gray-700 text-gray-400 border border-gray-600' : ''}
                  `}>
                    {consultation.status}
                  </span>
                  
                  {(consultation.status === 'cancelled' && consultation.cancellationReason) && (
                    <span className="text-xs text-yellow-300 bg-yellow-900/20 px-2 py-1 rounded">
                      Reason: {consultation.cancellationReason}
                    </span>
                  )}
                  {(consultation.status === 'rejected' && (
                    <span className="text-xs text-red-300 bg-red-900/20 px-2 py-1 rounded">
                      Reason: {consultation.rejectionReason ? consultation.rejectionReason : 'No reason provided'}
                    </span>
                  ))}
                </div>
  
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setSelectedRecord(consultation);
                      setShowRecordModal(true);
                    }}
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors flex items-center gap-1"
                  >
                    <FiFileText className="text-base" /> Records
                  </button>
                  <button
                    onClick={() => window.open("/dummy.pdf", "_blank")}
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors flex items-center gap-1"
                  >
                    <FiDownload className="text-base" /> Summary
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMedicalRecords = () => (
    <div className="space-y-4">
      {medicalRecords.map((record) => (
        <div
          key={record.id}
          className="bg-gray-800 rounded-lg p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              {record.type === "pdf" ? (
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-blue-400">
                {record.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {new Date(record.date).toLocaleDateString()} • {record.size}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2 md:gap-4">
            <button
              onClick={() => {
                if (record.type === "pdf") {
                  window.open("/dummy.pdf", "_blank");
                } else {
                  window.open(record.url, "_blank");
                }
              }}
              className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
            >
              View
            </button>
            <button
              onClick={() => {
                if (record.type === "pdf") {
                  window.open("/dummy.pdf", "_blank");
                } else {
                  window.open(record.url, "_blank");
                }
              }}
              className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
            >
              Download
            </button>
            <button
              onClick={() => {
                setSelectedRecord(record);
                setShowRecordModal(true);
              }}
              className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
            >
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPaymentHistory = () => {
    if (isLoading && activeTab === "payments")
      return <p className="text-gray-400">Loading payment history...</p>;
    if (error) return <p className="text-red-400">{error}</p>;
    if (paymentHistory.length === 0) {
      return <p className="text-gray-400">You have no payment history.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-800">
              <th className="pb-4 text-sm md:text-base">Date</th>
              <th className="pb-4 text-sm md:text-base">Amount</th>
              <th className="pb-4 text-sm md:text-base hidden md:table-cell">
                Type
              </th>
              <th className="pb-4 text-sm md:text-base hidden md:table-cell">
                Doctor
              </th>
              <th className="pb-4 text-sm md:text-base">Status</th>
              <th className="pb-4 text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment._id} className="border-b border-gray-800">
                <td className="py-4 text-gray-300 text-sm md:text-base">
                  {new Date(payment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-300 text-sm md:text-base">
                  ₹{payment.consultationFee.toFixed(2)}
                </td>
                <td className="py-4 text-gray-300 text-sm md:text-base hidden md:table-cell capitalize">
                  {payment.consultationType}
                </td>
                <td className="py-4 text-gray-300 text-sm md:text-base hidden md:table-cell">
                  Dr. {payment.doctor.name}
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 rounded-full text-xs md:text-sm bg-green-900 text-green-400 capitalize">
                    {payment.paymentStatus}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => window.open("/dummy.pdf", "_blank")}
                    className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
                  >
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 md:mb-8">
          Dashboard
        </h1>

        {/* Tabs - Scrollable on mobile */}
        <div className="mb-6 md:mb-8">
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:space-x-4">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-3 py-2 text-sm md:text-base md:px-4 md:py-2 mx-2 rounded-lg flex-shrink-0 ${
                activeTab === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-3 py-2 text-sm md:text-base md:px-4 md:py-2 mx-2 rounded-lg flex-shrink-0 ${
                activeTab === "past"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`px-3 py-2 text-sm md:text-base md:px-4 md:py-2 mx-2 rounded-lg flex-shrink-0 ${
                activeTab === "records"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Records
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`px-3 py-2 text-sm md:text-base md:px-4 md:py-2 mx-2 rounded-lg flex-shrink-0 ${
                activeTab === "payments"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Payments
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-950 rounded-lg p-4 md:p-6">
          {activeTab === "upcoming" && renderUpcomingAppointments()}
          {activeTab === "past" && renderPastConsultations()}
          {activeTab === "records" && renderMedicalRecords()}
          {activeTab === "payments" && renderPaymentHistory()}
        </div>
      </div>

      {/* Share Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-950 p-4 md:p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-400">
                Share {selectedRecord?.name}
              </h2>
              <button
                onClick={() => setShowRecordModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Add a message"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowRecordModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Record shared successfully!");
                    setShowRecordModal(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
