'use client';

import { useState } from 'react';
import Link from 'next/link';
import { packages } from '@/data/packages';
export default function HealthPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  // const packages = [
  //   {
  //     id: 'basic',
  //     title: 'Basic Health Check',
  //     description: 'Essential health screening for adults',
  //     price: 99,
  //     features: [
  //       'Complete Blood Count',
  //       'Blood Sugar (Fasting)',
  //       'Lipid Profile',
  //       'Liver Function Test',
  //       'Kidney Function Test',
  //       'ECG',
  //       'General Physician Consultation',
  //     ],
  //     recommended: false,
  //   },
  //   {
  //     id: 'comprehensive',
  //     title: 'Comprehensive Health Check',
  //     description: 'Detailed health assessment for comprehensive care',
  //     price: 199,
  //     features: [
  //       'All Basic Health Check features',
  //       'Thyroid Function Test',
  //       'Vitamin D Level',
  //       'Cardiac Risk Markers',
  //       'Chest X-Ray',
  //       'Ultrasound Abdomen',
  //       'Specialist Consultation',
  //     ],
  //     recommended: true,
  //   },
  //   {
  //     id: 'premium',
  //     title: 'Premium Health Check',
  //     description: 'Complete health evaluation with advanced diagnostics',
  //     price: 299,
  //     features: [
  //       'All Comprehensive Health Check features',
  //       'Cancer Screening Markers',
  //       'Bone Density Test',
  //       'Stress Test',
  //       'CT Scan',
  //       'MRI Scan',
  //       'Multiple Specialist Consultations',
  //     ],
  //     recommended: false,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Health Checkup Packages
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our comprehensive range of health checkup packages designed to keep you
            healthy and detect potential health issues early.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-gray-950 rounded-lg p-6 transition-all duration-300 ${
                selectedPackage === pkg.id
                  ? 'ring-2 ring-blue-500 transform scale-105'
                  : 'hover:ring-1 hover:ring-blue-500'
              } ${pkg.recommended ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.recommended && (
                <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-3">{pkg.title}</h3>
              <p className="text-gray-400 mb-4">{pkg.description}</p>
              <div className="text-3xl font-bold text-blue-400 mb-6">
              ₹ {pkg.price}
                <span className="text-sm text-gray-400 font-normal">/package</span>
              </div>
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
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
              <Link
                href={`/booking/health-package/${pkg.id}`}
                className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gray-950 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Why Choose Our Health Packages?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Accurate Results</h3>
              <p className="text-gray-400">
                State-of-the-art equipment and experienced technicians ensure precise results
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Quick Turnaround</h3>
              <p className="text-gray-400">
                Get your test results within 24 hours and expert consultation on the same day
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Expert Team</h3>
              <p className="text-gray-400">
                Experienced doctors and healthcare professionals provide comprehensive care
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact us to create a personalized health checkup package tailored to your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 