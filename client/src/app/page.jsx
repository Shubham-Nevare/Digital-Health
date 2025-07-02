"use client"
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      {/* Hero Section - Optimized for 1280px */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white relative overflow-hidden">
        {/* Decorative elements (more subtle) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 blur-lg"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-500 blur-lg"></div>
        </div>

        <div className="container mx-auto px-15 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Content */}
            <div className="lg:w-1/2 z-10 text-center lg:text-left">
              <h1
                ref={headingRef}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-snug"
              >
                Get Expert <span className="text-blue-300">Medical</span> Second
                Opinions
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 text-blue-100 max-w-lg mx-auto lg:mx-0">
                Connect with top specialists for comprehensive medical advice
                and personalized treatment options.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/find-doctor"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-sm sm:text-base rounded-full font-semibold transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  Find a Specialist
                </Link>
                <Link
                  href="/consultation"
                  className="bg-transparent border border-blue-300 hover:bg-blue-600/20 text-blue-100 hover:text-white px-6 py-3 text-sm sm:text-base rounded-full font-semibold transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Book Consultation
                </Link>
              </div>

              {/* Compact trust indicators */}
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <img
                      className="w-6 h-6 rounded-full border border-blue-800"
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Patient"
                    />
                    <img
                      className="w-6 h-6 rounded-full border border-blue-800"
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Patient"
                    />
                  </div>
                  <span>5000+ Patients</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="h-4 w-4 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9 (1200+)</span>
                </div>
              </div>
            </div>

            {/* Image - Slightly smaller */}
            <div className="lg:w-1/2 z-10 mt-8 lg:mt-0">
              <div className="relative w-full h-[250px] sm:h-[320px] rounded-xl overflow-hidden shadow-lg border-2 border-blue-300/20">
                <img
                  src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Doctor consultation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Smaller floating badge */}
                <div className="absolute -bottom-2 -right-2 bg-white text-blue-900 px-4 py-1.5 text-xs sm:text-sm rounded-full shadow-md font-bold flex items-center gap-1">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Why Choose HealthConnectDoctor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">
                Secure Medical Records
              </h3>
              <p className="text-gray-400">
                Share your medical history securely with our encrypted platform.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-400">
                Connect with verified specialists from around the world.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="text-blue-400 text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">
                Video Consultations
              </h3>
              <p className="text-gray-400">
                Get face-to-face consultations from the comfort of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-400">
                Sign up and complete your medical profile
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="font-semibold mb-2">Find Doctor</h3>
              <p className="text-gray-400">
                Browse and select from our expert doctors
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="font-semibold mb-2">Book Consultation</h3>
              <p className="text-gray-400">Schedule a video consultation</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">4</span>
              </div>
              <h3 className="font-semibold mb-2">Get Second Opinion</h3>
              <p className="text-gray-400">Receive expert medical advice</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
