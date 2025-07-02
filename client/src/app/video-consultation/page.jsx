'use client';

import { useState } from 'react';
import { doctors } from '@/data/doctors';

export default function VideoConsultation() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    // Handle booking logic here
    console.log({
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-blue-900 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Video Consultation</h1>
          <p className="text-xl text-blue-200">
            Connect with expert doctors from the comfort of your home
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded">
                  {doctor.rating} ★
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-blue-400 mb-2">{doctor.specialty}</p>
                <p className="text-gray-400 mb-4">{doctor.experience} experience</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-400">₹{doctor.consultationFee}</span>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDoctor(doctor);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Section */}
        {selectedDoctor && (
          <div className="bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Book Consultation with {selectedDoctor.name}</h2>
            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Select Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a time slot</option>
                  {selectedDoctor.availability.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">HD Video Quality</h3>
            <p className="text-gray-400">
              Crystal clear video consultations for better diagnosis and communication
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Quick Access</h3>
            <p className="text-gray-400">
              Connect with doctors within minutes, no need to travel
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
            <p className="text-gray-400">
              End-to-end encrypted consultations for your privacy
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-6">
            Our support team is available 24/7 to assist you
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
} 