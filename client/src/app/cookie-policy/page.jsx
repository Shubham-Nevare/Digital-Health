'use client';

import Link from 'next/link';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              What Are Cookies
            </h2>
            <p className="text-gray-300 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              How We Use Cookies
            </h2>
            <p className="text-gray-300 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Essential cookies for website functionality</li>
              <li>Authentication and security</li>
              <li>Remembering your preferences</li>
              <li>Analyzing website usage</li>
              <li>Personalizing your experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Essential Cookies
                </h3>
                <p className="text-gray-300">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Performance Cookies
                </h3>
                <p className="text-gray-300">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Functionality Cookies
                </h3>
                <p className="text-gray-300">
                  These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Targeting Cookies
                </h3>
                <p className="text-gray-300">
                  These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for individual users.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Managing Cookies
            </h2>
            <p className="text-gray-300 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website. To learn more about cookies and how to manage them, visit:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  All About Cookies
                </a>
              </li>
              <li>
                <a
                  href="https://www.aboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  About Cookies
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Third-Party Cookies
            </h2>
            <p className="text-gray-300 mb-4">
              Some cookies are placed by third-party services that appear on our pages. We use trusted third-party services that track this information on our behalf.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Updates to This Policy
            </h2>
            <p className="text-gray-300 mb-4">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about our Cookie Policy, please contact us:
            </p>
            <div className="text-gray-300">
              <p>Email: privacy@healthconnect.com</p>
              <p>Phone: +1 (555) 123-4567</p>
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

export default CookiePolicy;