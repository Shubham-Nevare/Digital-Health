'use client';

import { useState } from 'react';
import Link from 'next/link';
import { plans } from '@/data/plans';

export default function HealthInsurance() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // const plans = [
  //   {
  //     id: 'basic',
  //     title: 'Basic Coverage',
  //     description: 'Essential health coverage for individuals',
  //     price: 49,
  //     coverage: [
  //       'Hospitalization expenses',
  //       'Pre and post hospitalization',
  //       'Day care procedures',
  //       'Ambulance charges',
  //       'Basic dental coverage',
  //     ],
  //     features: [
  //       'Coverage up to $50,000',
  //       'Network hospitals access',
  //       'Cashless hospitalization',
  //       '24/7 customer support',
  //       'Online claim processing',
  //     ],
  //     recommended: false,
  //   },
  //   {
  //     id: 'family',
  //     title: 'Family Coverage',
  //     description: 'Comprehensive health coverage for your entire family',
  //     price: 149,
  //     coverage: [
  //       'All Basic Coverage features',
  //       'Maternity coverage',
  //       'Vaccination coverage',
  //       'Dental and vision care',
  //       'Alternative medicine',
  //     ],
  //     features: [
  //       'Coverage up to $200,000',
  //       'Family floater option',
  //       'Preventive care coverage',
  //       'Health checkup benefits',
  //       'Priority customer support',
  //     ],
  //     recommended: true,
  //   },
  //   {
  //     id: 'premium',
  //     title: 'Premium Coverage',
  //     description: 'Extensive health coverage with additional benefits',
  //     price: 299,
  //     coverage: [
  //       'All Family Coverage features',
  //       'Critical illness coverage',
  //       'International coverage',
  //       'Luxury hospital rooms',
  //       'Concierge service',
  //     ],
  //     features: [
  //       'Coverage up to $500,000',
  //       'Worldwide coverage',
  //       'VIP hospitalization',
  //       'Personal health manager',
  //       'Premium customer support',
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
            Health Insurance Plans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Protect your health and financial well-being with our comprehensive health insurance
            plans. Choose the coverage that best suits your needs.
          </p>
        </div>

        {/* Insurance Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-gray-950 rounded-lg p-6 transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-blue-500 transform scale-105'
                  : 'hover:ring-1 hover:ring-blue-500'
              } ${plan.recommended ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.recommended && (
                <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-3">{plan.title}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold text-blue-400 mb-6">
              ₹ {plan.price}
                <span className="text-sm text-gray-400 font-normal">/month</span>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Coverage Includes:</h4>
                  <ul className="space-y-2">
                    {plan.coverage.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
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
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link
                href={`/insurance/apply/${plan.id}`}
                className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-950 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Why Choose Our Health Insurance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <h3 className="text-lg font-medium text-white mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-400">
                Extensive coverage for various medical expenses
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Affordable Premiums</h3>
              <p className="text-gray-400">
                Competitive rates with flexible payment options
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Quick Claims</h3>
              <p className="text-gray-400">
                Fast and hassle-free claim processing
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400">
                Round-the-clock customer assistance
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need Help Choosing a Plan?
          </h2>
          <p className="text-gray-300 mb-8">
            Our insurance experts are here to help you find the perfect coverage for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </div>
  );
} 