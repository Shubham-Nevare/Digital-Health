"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FindDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/doctors`
        );
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        setDoctors(data.doctors || []);
      } catch (err) {
        setError(err.message || "Error fetching doctors");
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialty || doctor.specialty === specialty;
    const matchesLanguage =
      !language || (doctor.languages && doctor.languages.includes(language));

    return matchesSearch && matchesSpecialty && matchesLanguage;
  });

  const specialties = [
    ...new Set(doctors.map((doctor) => doctor.specialty).filter(Boolean)),
  ];
  const languages = [
    ...new Set(doctors.flatMap((doctor) => doctor.languages || [])),
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Find Your Doctor
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our network of expert doctors and book a consultation for a
            second medical opinion. Select a doctor to view their profile and
            schedule an appointment.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-950 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
            <div>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="">All Specialties</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading doctors...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {doctor.rating} ★ ({doctor.reviews})
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    Dr. {doctor.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{doctor.specialty}</p>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Experience:</span>{" "}
                      {doctor.experience}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Languages:</span>{" "}
                      {doctor.languages.join(", ")}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Availability:</span>{" "}
                      {doctor.availability}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      href={`/doctor/${doctor._id}`}
                      className="flex-1 text-center bg-gray-800 text-white  py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={`/consultation/${doctor._id}`}
                      className="flex-1 text-center bg-blue-600 text-white  py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No doctors found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSpecialty("");
                setLanguage("");
              }}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
