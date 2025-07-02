'use client';

import { useState } from 'react';
import Link from 'next/link';
import { services } from '@/data/services';

export default function Telemedicine() {
  const [selectedService, setSelectedService] = useState(null);

  
  // const services = [
  //   {
  //     id: 'video',
  //     title: 'Video Consultation',
  //     description: 'Connect with doctors through secure video calls for real-time medical advice.',
  //     features: [
  //       'High-quality video and audio',
  //       'Secure and private consultations',
  //       'Screen sharing for medical reports',
  //       'Chat functionality during consultation',
  //       'Prescription delivery',
  //     ],
  //     price: 'Starting from ₹ 50',
  //     duration: '30-45 minutes',
  //   },
  //   {
  //     id: 'chat',
  //     title: 'Chat Consultation',
  //     description: 'Get medical advice through text-based consultations with healthcare professionals.',
  //     features: [
  //       '24/7 availability',
  //       'Quick responses',
  //       'Document sharing',
  //       'Follow-up support',
  //       'Prescription delivery',
  //     ],
  //     price: 'Starting from ₹ 25',
  //     duration: '15-30 minutes',
  //   },
  //   {
  //     id: 'followup',
  //     title: 'Follow-up Care',
  //     description: 'Regular check-ins and monitoring for ongoing treatment and recovery.',
  //     features: [
  //       'Regular progress tracking',
  //       'Medication management',
  //       'Lifestyle guidance',
  //       'Diet and exercise plans',
  //       'Remote monitoring',
  //     ],
  //     price: 'Starting from ₹ 35',
  //     duration: '20-30 minutes',
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Telemedicine Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access quality healthcare from the comfort of your home. Connect with experienced
            doctors through secure video consultations and get the medical attention you need.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-gray-950 rounded-lg p-6 transition-all duration-300 ${
                selectedService === service.id
                  ? 'ring-2 ring-blue-500 transform scale-105'
                  : 'hover:ring-1 hover:ring-blue-500'
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="space-y-2 mb-4">
                {service.features.map((feature, index) => (
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
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-blue-400 font-semibold">{service.price}</p>
                <p className="text-gray-400 text-sm">Duration: {service.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-gray-950 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            How Telemedicine Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Book Appointment</h3>
              <p className="text-gray-400">
                Choose your preferred doctor and time slot
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Prepare</h3>
              <p className="text-gray-400">
                Gather your medical history and current symptoms
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Connect</h3>
              <p className="text-gray-400">
                Join the video consultation at your scheduled time
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Follow-up</h3>
              <p className="text-gray-400">
                Receive prescriptions and follow-up care instructions
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8">
            Book your telemedicine consultation today and experience healthcare at your convenience.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
} 