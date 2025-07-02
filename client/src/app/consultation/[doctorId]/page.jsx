"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

export default function BookConsultation({ params }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock available time slots (now with default times)
  const defaultTimeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00"];
  const availableSlots = {
    // Your existing slots plus default for any new date
    ...Object.fromEntries(
      Array(30)
        .fill(0)
        .map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          return [format(date, "yyyy-MM-dd"), defaultTimeSlots];
        })
    ),
    // Override specific dates if needed
    "2025-07-12": ["09:00", "10:00", "11:00", "14:00", "15:00"],
    "2025-07-13": ["10:00", "11:00", "13:00", "14:00", "16:00"],
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(defaultTimeSlots[0]); // Set default time
  const [consultationType, setConsultationType] = useState("video");
  const [medicalConcern, setMedicalConcern] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    async function fetchDoctor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/doctors/${unwrappedParams.doctorId}`
        );
        if (!res.ok) throw new Error("Failed to fetch doctor info");
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message || "Error fetching doctor info");
      } finally {
        setLoading(false);
      }
    }
    if (unwrappedParams.doctorId) fetchDoctor();
  }, [unwrappedParams.doctorId]);

  const handleDateSelect = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
    setShowCalendar(false);
    // Reset time selection when date changes
    setSelectedTime(availableSlots[formattedDate]?.[0] || "");
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prev) => ({
          ...prev,
          [file.id]: progress,
        }));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    });
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time for the appointment.");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token") || Cookies.get("token");

    if (!token) {
      setError("You must be logged in to book an appointment.");
      setIsSubmitting(false);
      return;
    }

    const appointmentDetails = {
      doctorId: doctor._id,
      date: selectedDate,
      time: selectedTime,
      symptoms: medicalConcern,
      consultationType: consultationType,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book appointment");
      }

      const bookingData = await response.json();
      const queryString = new URLSearchParams({
        bookingId: bookingData.appointment._id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: bookingData.appointment.appointmentDate,
        time: bookingData.appointment.appointmentTime,
      }).toString();

      router.push(`/booking-confirmation?${queryString}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading doctor info...</div>;
  if (error) return <div>{error}</div>;
  if (!doctor) return <div>Doctor not found.</div>;

  const slots = selectedDate ? availableSlots[selectedDate] || defaultTimeSlots : [];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-400 mb-8">
            Book Consultation
          </h1>

          {/* Doctor Info */}
          <div className="bg-gray-950 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Dr. {doctor.name}
                </h2>
                <p className="text-gray-400">{doctor.specialty}</p>
                <p className="text-gray-400">
                  Consultation Fee: ₹ {doctor.consultationFee}
                </p>
                <p className="text-gray-400">Duration: {doctor.duration}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="bg-gray-950 rounded-lg p-6">
            <div className="space-y-6">
              {/* Date Selection with Calendar Picker */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Date
                </label>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={selectedDate || "Select a date"}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-lg focus:outline-none text-white cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  >
                    📅
                  </button>
                </div>
                {showCalendar && (
                  <div className="absolute z-10 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                    <Calendar
                      date={selectedDate ? new Date(selectedDate) : new Date()}
                      onChange={handleDateSelect}
                      minDate={new Date()}
                      className="border-0"
                    />
                    <div className="p-2 bg-gray-900 border-t border-gray-700 rounded-b-lg flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCalendar(false)}
                        className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Time (Default first available)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-lg text-center transition-colors ${
                          selectedTime === time
                            ? "bg-blue-600 text-white"
                            : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rest of your form remains the same */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Consultation Type
                </label>
                <select
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                  <option value="chat">Chat</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your medical concern
                </label>
                <textarea
                  value={medicalConcern}
                  onChange={(e) => setMedicalConcern(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Please provide details about your medical concern..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Medical Records (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-gray-400">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      PDF, JPG, PNG, DOC up to 10MB
                    </span>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between bg-gray-900 p-3 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-gray-300">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {uploadProgress[file.id] < 100 ? (
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${uploadProgress[file.id]}%` }}
                              ></div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => removeFile(file.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Booking..." : "Book Consultation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}