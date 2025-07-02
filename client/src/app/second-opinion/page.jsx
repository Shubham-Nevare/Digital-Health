'use client';

import { useState } from 'react';

export default function SecondOpinion() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    condition: '',
    currentDiagnosis: '',
    currentTreatment: '',
    medicalHistory: '',
    documents: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">Get a Second Opinion</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Receive expert medical advice from our network of specialists. Get a fresh perspective on your diagnosis and treatment plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Information Section */}
          <div className="bg-gray-950 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Why Get a Second Opinion?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-white font-medium">Confirm Your Diagnosis</h3>
                  <p className="text-gray-400">Ensure your diagnosis is accurate and complete</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-white font-medium">Explore Treatment Options</h3>
                  <p className="text-gray-400">Learn about alternative treatment approaches</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-white font-medium">Expert Review</h3>
                  <p className="text-gray-400">Get insights from specialized medical professionals</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-white font-medium">Peace of Mind</h3>
                  <p className="text-gray-400">Make informed decisions about your health</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Section */}
          <div className="bg-gray-950 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Request a Second Opinion</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Medical Condition
                </label>
                <input
                  type="text"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Current Diagnosis
                </label>
                <textarea
                  value={formData.currentDiagnosis}
                  onChange={(e) => setFormData({ ...formData, currentDiagnosis: e.target.value })}
                  rows="3"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Current Treatment
                </label>
                <textarea
                  value={formData.currentTreatment}
                  onChange={(e) => setFormData({ ...formData, currentTreatment: e.target.value })}
                  rows="3"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Medical History
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  rows="3"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Upload Medical Documents
                </label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, documents: e.target.files[0] })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  multiple
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload medical reports, test results, or imaging studies (PDF, JPG, PNG)
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-950 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-white font-medium mb-2">Submit Your Request</h3>
              <p className="text-gray-400">Fill out the form with your medical information and upload relevant documents</p>
            </div>
            <div className="bg-gray-950 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-white font-medium mb-2">Expert Review</h3>
              <p className="text-gray-400">Our specialists will review your case and medical history</p>
            </div>
            <div className="bg-gray-950 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-white font-medium mb-2">Receive Opinion</h3>
              <p className="text-gray-400">Get a detailed second opinion report within 48-72 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 