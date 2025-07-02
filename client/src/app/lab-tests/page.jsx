"use client";

import { useState } from "react";
import Link from "next/link";

export default function LabTests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Tests" },
    { id: "blood", name: "Blood Tests" },
    { id: "urine", name: "Urine Tests" },
    { id: "imaging", name: "Imaging Tests" },
    { id: "cardiac", name: "Cardiac Tests" },
    { id: "hormone", name: "Hormone Tests" },
  ];

  const testCategories = {
    blood: [
      {
        id: "blood-1",
        name: "Complete Blood Count (CBC)",
        price: 49.99,
        description:
          "Measures red blood cells, white blood cells, and platelets",
        preparation: "Fasting required for 8-12 hours",
        duration: "15-20 minutes",
      },
      {
        id: "blood-2",
        name: "Lipid Profile",
        price: 39.99,
        description: "Measures cholesterol and triglyceride levels",
        preparation: "Fasting required for 12 hours",
        duration: "15-20 minutes",
      },
      {
        id: "blood-3",
        name: "Blood Glucose Test",
        price: 29.99,
        description: "Measures blood sugar levels",
        preparation: "Fasting required for 8 hours",
        duration: "10-15 minutes",
      },
    ],
    urine: [
      {
        id: "urine-1",
        name: "Urinalysis",
        price: 34.99,
        description: "Analyzes urine for various substances and cells",
        preparation: "First morning urine sample preferred",
        duration: "10-15 minutes",
      },
      {
        id: "urine-2",
        name: "24-Hour Urine Collection",
        price: 59.99,
        description: "Measures kidney function and protein levels",
        preparation: "24-hour collection required",
        duration: "24 hours",
      },
    ],
    imaging: [
      {
        id: "imaging-1",
        name: "X-Ray",
        price: 89.99,
        description: "Basic imaging for bones and chest",
        preparation: "No special preparation needed",
        duration: "15-30 minutes",
      },
      {
        id: "imaging-2",
        name: "Ultrasound",
        price: 149.99,
        description: "Imaging of internal organs using sound waves",
        preparation: "Fasting may be required depending on area",
        duration: "30-60 minutes",
      },
      {
        id: "imaging-3",
        name: "MRI Scan",
        price: 299.99,
        description: "Detailed imaging of internal structures",
        preparation: "No metal objects, fasting may be required",
        duration: "45-90 minutes",
      },
    ],
    cardiac: [
      {
        id: "cardiac-1",
        name: "ECG/EKG",
        price: 79.99,
        description: "Records electrical activity of the heart",
        preparation: "No special preparation needed",
        duration: "10-15 minutes",
      },
      {
        id: "cardiac-2",
        name: "Stress Test",
        price: 199.99,
        description: "Evaluates heart function during exercise",
        preparation: "Fasting required, comfortable clothes needed",
        duration: "60-90 minutes",
      },
      {
        id: "cardiac-3",
        name: "Echocardiogram",
        price: 249.99,
        description: "Ultrasound of the heart",
        preparation: "No special preparation needed",
        duration: "30-45 minutes",
      },
    ],
    hormone: [
      {
        id: "hormone-1",
        name: "Thyroid Function Test",
        price: 69.99,
        description: "Measures thyroid hormone levels",
        preparation: "Fasting may be required",
        duration: "15-20 minutes",
      },
      {
        id: "hormone-2",
        name: "Testosterone Test",
        price: 59.99,
        description: "Measures testosterone levels",
        preparation: "Morning sample preferred",
        duration: "15-20 minutes",
      },
      {
        id: "hormone-3",
        name: "Estrogen Test",
        price: 59.99,
        description: "Measures estrogen levels",
        preparation: "Timing depends on menstrual cycle",
        duration: "15-20 minutes",
      },
    ],
  };
  const popularTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      category: "blood",
      price: 29.99,
      description: "Measures red blood cells, white blood cells, and platelets",
      preparation: "Fasting required for 8-12 hours",
      duration: "15-20 minutes",
    },
    {
      id: 2,
      name: "Lipid Profile",
      category: "blood",
      price: 39.99,
      description: "Measures cholesterol and triglyceride levels",
      preparation: "Fasting required for 12-14 hours",
      duration: "15-20 minutes",
    },
    {
      id: 3,
      name: "Thyroid Function Test",
      category: "hormone",
      price: 49.99,
      description: "Measures thyroid hormone levels",
      preparation: "No special preparation required",
      duration: "15-20 minutes",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Lab Tests</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Book your lab tests online. Get accurate results and expert analysis
            from our state-of-the-art laboratories.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for lab tests..."
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {(selectedCategory === "all"
            ? Object.values(testCategories).flat() // ✅ Flatten all arrays in object
            : testCategories[selectedCategory] || []
          ) // fallback to empty if undefined
            .map((test) => (
              <div key={test.id} className="bg-gray-950 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {test.name}
                  </h3>
                  <span className="text-blue-400 font-semibold">
                  ₹ {test.price}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{test.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Preparation: {test.preparation}</p>
                  <p>Duration: {test.duration}</p>
                </div>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Test
                </button>
              </div>
            ))}
        </div>

        {/* Popular Tests */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">
            Popular Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularTests.map((test) => (
              <div key={test.id} className="bg-gray-950 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {test.name}
                  </h3>
                  <span className="text-blue-400 font-semibold">
                  ₹ {test.price}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{test.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Duration: {test.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-300">{test.preparation}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Test
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="bg-gray-950 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Book Test</h3>
              <p className="text-gray-400">Select and book your test online</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Sample Collection
              </h3>
              <p className="text-gray-400">
                Visit our lab or get home collection
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Processing
              </h3>
              <p className="text-gray-400">
                Get your samples tested in our lab
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Results</h3>
              <p className="text-gray-400">
                Receive digital reports within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-950 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Accurate Results
            </h3>
            <p className="text-gray-400">
              State-of-the-art equipment and experienced technicians ensure
              precise results
            </p>
          </div>
          <div className="bg-gray-950 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Quick Turnaround
            </h3>
            <p className="text-gray-400">
              Get your test results within 24 hours
            </p>
          </div>
          <div className="bg-gray-950 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Expert Analysis
            </h3>
            <p className="text-gray-400">
              Results reviewed by experienced medical professionals
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need Help Choosing Tests?
          </h2>
          <p className="text-gray-300 mb-8">
            Our medical experts can help you select the right tests based on
            your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Consult Expert
          </Link>
        </div>
      </div>
    </div>
  );
}
