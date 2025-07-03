"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function DoctorProfile({ params }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchDoctor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/doctors/${unwrappedParams.id}`);
        if (!res.ok) throw new Error("Failed to fetch doctor info");
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message || "Error fetching doctor info");
      } finally {
        setLoading(false);
      }
    }
    if (unwrappedParams.id) fetchDoctor();
  }, [unwrappedParams.id]);

  const submitDoctorRating = async () => {
    setSubmitting(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${doctor._id}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, review }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit rating");
      toast.success("Doctor rated successfully!");
      setRating(0);
      setReview("");
      // Refetch doctor data to update rating
      if (unwrappedParams.id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/doctors/${unwrappedParams.id}`);
        if (res.ok) setDoctor(await res.json());
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading doctor profile...</div>;
  }
  if (error) {
    return <div className="text-center py-12 text-red-400">{error}</div>;
  }
  if (!doctor) {
    return <div className="text-center py-12 text-gray-400">Doctor not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        {/* Doctor Header */}
        <div className="bg-gray-950 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={doctor.profileImage || "/default-doctor.png"}
                alt={doctor.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-blue-400 mb-2">
                Dr. {doctor.name}
              </h1>
              <p className="text-xl text-gray-400 mb-4">{doctor.specialty}</p>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="ml-2 text-white">{doctor.rating}</span>
                  <span className="text-gray-400 ml-2">
                    ({doctor.reviews} reviews)
                  </span>
                </div>
                <span className="mx-4 text-gray-600">|</span>
                <span className="text-gray-400">
                  {doctor.experience} year's experience
                </span>
              </div>

              {/* Doctor Rating UI */}
              {/* <div className="mb-6 bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Rate this Doctor</h3>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none"
                      type="button"
                    >
                      <span className={rating >= star ? "text-yellow-400" : "text-gray-500"}>★</span>
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Share your experience (optional)"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-sm text-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-2"
                  rows="3"
                />
                <button
                  onClick={submitDoctorRating}
                  disabled={submitting || !rating}
                  className={`mt-2 px-4 py-2 rounded-md text-sm font-medium ${
                    rating
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  } transition-colors`}
                >
                  {submitting ? "Submitting..." : "Submit Rating"}
                </button>
              </div> */}

              <div className="space-y-2 mb-6">
                <p className="text-gray-300">
                  <span className="text-gray-400">Languages:</span>{" "}
                  {Array.isArray(doctor.languages) &&
                  doctor.languages.length > 0
                    ? doctor.languages.join(", ")
                    : "N/A"}
                </p>

                <p className="text-gray-300">
                  <span className="text-gray-400">Availability:</span>{" "}
                  {doctor.availability}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Consultation Fee:</span> ₹{" "}
                  {doctor.consultationFee}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Duration:</span>{" "}
                  {doctor.consultationDuration}
                </p>
              </div>

              <Link
                href={`/consultation/${doctor._id}`}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-950 rounded-lg mb-8">
          <div className="border-b border-gray-800">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("about")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "about"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "education"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Education
              </button>
              <button
                onClick={() => setActiveTab("certifications")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "certifications"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Certifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "about" && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{doctor.about}</p>
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-4">
                {/* <h3 className="text-xl font-semibold text-blue-400 mb-4">Education</h3> */}
                {Array.isArray(doctor.education) ? (
                  doctor.education.map((edu, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium">{edu.degree}</h4>
                      {edu.institution && (
                        <p className="text-gray-400">{edu.institution}</p>
                      )}
                      {edu.year && <p className="text-gray-500">{edu.year}</p>}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">{doctor.education}</div>
                )}
              </div>
            )}

            {activeTab === "certifications" && (
              <div className="space-y-4">
                {/* <h3 className="text-xl font-semibold text-blue-400 mb-4">Certifications</h3> */}
                {Array.isArray(doctor.certifications) ? (
                  doctor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300">{cert}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">{doctor.certifications}</div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {Array.isArray(doctor.recentReviews) &&
                doctor.recentReviews.length > 0 ? (
                  doctor.recentReviews.map((review) => (
                    <div key={review.id} className="bg-gray-900 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-white font-medium">
                            {review.patientName}
                          </h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No reviews available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
