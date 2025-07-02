'use client';

import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300 mb-4">
              By accessing and using HealthConnect's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Use License
            </h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily access the materials on HealthConnect's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <p className="text-gray-300 mb-4">
              Under this license, you may not:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Medical Disclaimer
            </h2>
            <p className="text-gray-300 mb-4">
              The information provided through our services is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Limitations
            </h2>
            <p className="text-gray-300 mb-4">
              In no event shall HealthConnect or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HealthConnect's website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="text-gray-300 mb-4">
              The materials appearing on HealthConnect's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Links
            </h2>
            <p className="text-gray-300 mb-4">
              HealthConnect has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by HealthConnect of the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Modifications
            </h2>
            <p className="text-gray-300 mb-4">
              HealthConnect may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-300 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Contact Information
            </h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-gray-300">
              <p>Email: legal@healthconnect.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Healthcare Street, Medical City, MC 12345</p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 