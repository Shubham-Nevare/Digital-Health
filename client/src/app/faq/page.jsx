'use client';

import { useState } from 'react';
import Link from 'next/link';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (questionId) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const faqCategories = {
    general: [
      {
        id: 'general-1',
        question: 'What is HealthConnect?',
        answer: 'HealthConnect is a comprehensive healthcare platform that provides telemedicine services, health packages, insurance, online pharmacy, and lab tests. We aim to make healthcare accessible and convenient for everyone.',
      },
      {
        id: 'general-2',
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking on the "Sign Up" button in the top right corner. You will need to provide your basic information and verify your email address.',
      },
      {
        id: 'general-3',
        question: 'Is my information secure?',
        answer: 'Yes, we take data security very seriously. All your personal and medical information is encrypted and stored securely. We comply with all relevant healthcare data protection regulations.',
      },
    ],
    consultations: [
      {
        id: 'consult-1',
        question: 'How do I book a consultation?',
        answer: 'You can book a consultation by selecting a doctor from our directory, choosing your preferred time slot, and completing the payment process. You will receive a confirmation email with the consultation details.',
      },
      {
        id: 'consult-2',
        question: 'What types of consultations are available?',
        answer: 'We offer video consultations, chat consultations, and follow-up care. Each type has different durations and pricing to suit your needs.',
      },
      {
        id: 'consult-3',
        question: 'Can I get a prescription through online consultation?',
        answer: 'Yes, our doctors can prescribe medications when appropriate. The prescription will be sent to your email and can be used at our online pharmacy or any other pharmacy.',
      },
    ],
    insurance: [
      {
        id: 'insurance-1',
        question: 'What insurance plans do you offer?',
        answer: 'We offer various insurance plans including individual coverage, family coverage, and premium coverage. Each plan has different benefits and coverage limits.',
      },
      {
        id: 'insurance-2',
        question: 'How do I file a claim?',
        answer: 'You can file a claim through your dashboard. Upload the required documents and our team will process your claim within 48 hours.',
      },
      {
        id: 'insurance-3',
        question: 'What is covered under the insurance plans?',
        answer: 'Our insurance plans cover hospitalization, outpatient care, prescription medications, and preventive care. The exact coverage depends on the plan you choose.',
      },
    ],
    pharmacy: [
      {
        id: 'pharmacy-1',
        question: 'How do I order medications?',
        answer: 'You can order medications through our online pharmacy. Search for your medication, add it to cart, and complete the checkout process. You will need to upload a valid prescription for prescription medications.',
      },
      {
        id: 'pharmacy-2',
        question: 'Do you deliver to my location?',
        answer: 'We deliver to most locations within the country. Enter your address during checkout to check delivery availability.',
      },
      {
        id: 'pharmacy-3',
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 24-48 hours. Express delivery is available for urgent medications and takes 4-6 hours.',
      },
    ],
    lab: [
      {
        id: 'lab-1',
        question: 'How do I book a lab test?',
        answer: 'You can book a lab test by selecting the test from our directory, choosing a convenient time slot, and completing the payment. A technician will visit your location for sample collection.',
      },
      {
        id: 'lab-2',
        question: 'When will I get my test results?',
        answer: 'Most test results are available within 24-48 hours. You will receive a notification when your results are ready to view in your dashboard.',
      },
      {
        id: 'lab-3',
        question: 'Do I need to fast before my test?',
        answer: 'Some tests require fasting. The specific requirements will be mentioned in the test details and confirmation email.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300">
            Find answers to common questions about our services
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(faqCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqCategories[activeCategory].map((item) => (
            <div
              key={item.id}
              className="bg-gray-950 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="text-lg font-semibold text-white">
                  {item.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-400 transform transition-transform ${
                    openQuestions[item.id] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openQuestions[item.id] && (
                <div className="px-6 py-4 bg-gray-900">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            Still have questions? Our support team is here to help.
          </p>
          <Link
            href="/support"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 