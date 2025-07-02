'use client';

import { useState } from 'react';
import Link from 'next/link';

const TreatmentComparison = () => {
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const treatments = [
    {
      id: 1,
      name: 'Physical Therapy',
      description: 'Non-invasive treatment using exercises and manual techniques',
      duration: '6-8 weeks',
      cost: '250',
      effectiveness: 'High',
      sideEffects: 'Minimal',
      recoveryTime: 'Gradual',
      successRate: '85%',
      bestFor: ['Muscle injuries', 'Joint problems', 'Post-surgery recovery'],
    },
    {
      id: 2,
      name: 'Surgery',
      description: 'Invasive procedure to repair or replace damaged tissue',
      duration: '1-2 hours',
      cost: '500',
      effectiveness: 'Very High',
      sideEffects: 'Moderate to High',
      recoveryTime: 'Long',
      successRate: '90%',
      bestFor: ['Severe injuries', 'Structural problems', 'Chronic conditions'],
    },
    {
      id: 3,
      name: 'Medication',
      description: 'Pharmaceutical treatment for pain and inflammation',
      duration: 'Varies',
      cost: '600',
      effectiveness: 'Moderate',
      sideEffects: 'Moderate',
      recoveryTime: 'Quick',
      successRate: '70%',
      bestFor: ['Pain management', 'Inflammation', 'Temporary relief'],
    },
    {
      id: 4,
      name: 'Acupuncture',
      description: 'Traditional Chinese medicine using thin needles',
      duration: '30-60 minutes per session',
      cost: '500',
      effectiveness: 'Moderate to High',
      sideEffects: 'Minimal',
      recoveryTime: 'Quick',
      successRate: '75%',
      bestFor: ['Chronic pain', 'Stress', 'Muscle tension'],
    },
    {
      id: 5,
      name: 'Chiropractic Care',
      description: 'Manual manipulation of the spine and joints',
      duration: '15-30 minutes per session',
      cost: '800',
      effectiveness: 'High',
      sideEffects: 'Minimal',
      recoveryTime: 'Quick',
      successRate: '80%',
      bestFor: ['Back pain', 'Neck pain', 'Joint alignment'],
    },
  ];

  const toggleTreatment = (treatment) => {
    if (selectedTreatments.find(t => t.id === treatment.id)) {
      setSelectedTreatments(selectedTreatments.filter(t => t.id !== treatment.id));
    } else if (selectedTreatments.length < 3) {
      setSelectedTreatments([...selectedTreatments, treatment]);
    }
  };

  const filteredTreatments = treatments.filter(treatment =>
    treatment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Treatment Comparison
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compare different treatment options to make an informed decision about your healthcare.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for treatments..."
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Treatment Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className={`bg-gray-950 rounded-lg p-6 cursor-pointer transition-colors ${
                selectedTreatments.find(t => t.id === treatment.id)
                  ? 'ring-2 ring-blue-500'
                  : 'hover:bg-gray-900'
              }`}
              onClick={() => toggleTreatment(treatment)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">{treatment.name}</h3>
                <span className="text-blue-400 font-semibold">₹ {treatment.cost}</span>
              </div>
              <p className="text-gray-400 mb-4">{treatment.description}</p>
              <div className="text-sm text-gray-500">
                <p>Duration: {treatment.duration}</p>
                <p>Effectiveness: {treatment.effectiveness}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedTreatments.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-950 rounded-lg">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="px-6 py-4 text-left text-white">Feature</th>
                    {selectedTreatments.map((treatment) => (
                      <th key={treatment.id} className="px-6 py-4 text-left text-white">
                        {treatment.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="px-6 py-4 text-gray-300">Description</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        {treatment.description}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-6 py-4 text-gray-300">Duration</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        {treatment.duration}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-6 py-4 text-gray-300">Cost</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        {treatment.cost}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-6 py-4 text-gray-300">Effectiveness</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        {treatment.effectiveness}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-6 py-4 text-gray-300">Side Effects</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        {treatment.sideEffects}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-6 py-4 text-gray-300">Recovery Time</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        {treatment.recoveryTime}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-6 py-4 text-gray-300">Success Rate</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        {treatment.successRate}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Best For</td>
                    {selectedTreatments.map((treatment) => (
                      <td key={treatment.id} className="px-6 py-4 text-gray-300">
                        <ul className="list-disc list-inside">
                          {treatment.bestFor.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Need Help Deciding?
          </h2>
          <p className="text-gray-300 mb-8">
            Our medical experts can help you choose the best treatment option for your condition.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Consult Doctor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TreatmentComparison; 