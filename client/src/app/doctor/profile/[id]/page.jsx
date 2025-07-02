"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorProfile({ params }) {
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDoctor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/doctors/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch doctor info");
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message || "Error fetching doctor info");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchDoctor();
  }, [params.id]);

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
      <div className="max-w-3xl mx-auto px-6 bg-gray-950 rounded-xl shadow-md p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={doctor.profileImage || "/default-doctor.png"}
            alt={doctor.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-400 mb-2">{doctor.name}</h1>
            <p className="text-gray-400 mb-2">{doctor.specialty}</p>
            <p className="text-gray-300 mb-2">Experience: {doctor.experience}</p>
            <p className="text-gray-300 mb-2">Languages: {doctor.languages?.join(", ")}</p>
            <p className="text-gray-300 mb-2">Consultation Fee: ₹{doctor.consultationFee}</p>
            <p className="text-gray-300 mb-2">About: {doctor.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 