"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headingRef = useRef(null);
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Refs for animations
  const heroContentRef = useRef(null);
  const heroImageRef = useRef(null);
  const featuresRef = useRef([]);
  const howItWorksRef = useRef([]);
  const specialtiesRef = useRef([]);
  const testimonialsRef = useRef([]);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const faqImageRef = useRef(null);
  const faqItemsRef = useRef([]);

  useEffect(() => {
    // Hero section animations
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

    gsap.fromTo(
      heroContentRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      }
    );

    gsap.fromTo(
      heroImageRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 0.5 }
    );

    // Features section animation
    featuresRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // How It Works section animation
    howItWorksRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Specialties section animation
    gsap.fromTo(
      specialtiesRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: specialtiesRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Testimonials section animation
    testimonialsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // FAQ section animation
    gsap.fromTo(
      faqRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // CTA section animation
    gsap.fromTo(
      ctaRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Fetch FAQs
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs`);
        const data = await res.json();
        setFaqs(data.faqs || []);
      } catch (err) {
        setFaqs([]);
      }
    };
    fetchFaqs();

    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      // Closing animation
      gsap.to(document.querySelector(`#faq-answer-${index}`), {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
        onComplete: () => setActiveIndex(null),
      });
    } else {
      // Opening animation
      setActiveIndex(index);
      const answerEl = document.querySelector(`#faq-answer-${index}`);
      gsap.fromTo(
        answerEl,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power1.inOut",
        }
      );
    }
  };

  // Helper function to add refs to arrays
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 blur-lg"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-500 blur-lg"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Content */}
            <div
              className="lg:w-1/2 z-10 text-center lg:text-left"
              ref={heroContentRef}
            >
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

              {/* Trust indicators */}
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

            {/* Image */}
            <div className="lg:w-1/2 z-10 mt-8 lg:mt-0" ref={heroImageRef}>
              <div className="relative w-full h-[250px] sm:h-[320px] rounded-xl overflow-hidden shadow-lg border-2 border-blue-300/20">
                <img
                  src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Doctor consultation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Why Choose HealthConnectDoctor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔒",
                title: "Secure Medical Records",
                description:
                  "Share your medical history securely with our encrypted platform.",
              },
              {
                icon: "👨‍⚕️",
                title: "Expert Doctors",
                description:
                  "Connect with verified specialists from around the world.",
              },
              {
                icon: "💬",
                title: "Video Consultations",
                description:
                  "Get face-to-face consultations from the comfort of your home.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                ref={(el) => addToRefs(el, featuresRef)}
                className="bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <div className="text-blue-400 text-4xl mb-4">
                  {feature.icon}
            </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
            </div>
            ))}
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
            {[
              {
                step: "1",
                title: "Create Profile",
                description: "Sign up and complete your medical profile",
              },
              {
                step: "2",
                title: "Find Doctor",
                description: "Browse and select from our expert doctors",
              },
              {
                step: "3",
                title: "Book Consultation",
                description: "Schedule a video consultation",
              },
              {
                step: "4",
                title: "Get Second Opinion",
                description: "Receive expert medical advice",
              },
            ].map((step, index) => (
              <div
                key={index}
                ref={(el) => addToRefs(el, howItWorksRef)}
                className="text-center"
              >
              <div className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">
                    {step.step}
                  </span>
              </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6" ref={specialtiesRef}>
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Our Medical Specialties
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Cardiology", icon: "❤️" },
              { name: "Neurology", icon: "🧠" },
              { name: "Oncology", icon: "🦠" },
              { name: "Pediatrics", icon: "👶" },
              { name: "Dermatology", icon: "🧴" },
              { name: "Psychiatry", icon: "🧠" },
              { name: "Orthopedics", icon: "🦴" },
              { name: "Endocrinology", icon: "⚖️" },
            ].map((specialty, index) => (
              <div
                key={index}
                className="bg-gray-900 p-4 rounded-lg text-center hover:bg-blue-900/30 transition-colors"
              >
                <div className="text-3xl mb-2">{specialty.icon}</div>
                <h3 className="font-medium">{specialty.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            What Our Patients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                image: "https://randomuser.me/api/portraits/women/32.jpg",
                quote:
                  "The second opinion I received gave me peace of mind about my treatment options. The doctor was incredibly thorough.",
              },
              {
                name: "Michael Chen",
                image: "https://randomuser.me/api/portraits/men/45.jpg",
                quote:
                  "Saved me hours of waiting at the clinic. The video consultation was just as effective as an in-person visit.",
              },
              {
                name: "Emily Rodriguez",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                quote:
                  "The specialist provided a different perspective that my local doctor hadn't considered. Very valuable service!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                ref={(el) => addToRefs(el, testimonialsRef)}
                className="bg-gray-800 p-6 rounded-lg shadow-md"
              >
              <div className="flex items-center mb-4">
                <img
                    src={testimonial.image}
                  alt="Patient"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
                <p className="text-gray-400 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image on left - only show on larger screens */}
            <div className=" lg:w-1/2">
              <div
                className="relative h-96 w-full rounded-xl overflow-hidden border-2 border-blue-400/20 shadow-lg"
                ref={(el) => {
                  if (el && !faqImageRef.current) {
                    faqImageRef.current = el;
                    gsap.fromTo(
                      el,
                      { x: -100, opacity: 0 },
                      {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: {
                          trigger: el,
                          start: "top 80%",
                          toggleActions: "play none none none",
                        },
                      }
                    );
                  }
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Doctor with patient"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">
                    Have Questions?
                  </h3>
                  <p className="text-blue-200">We're here to help you 24/7</p>
                </div>
              </div>
            </div>

            {/* FAQ Content on right */}
            <div className="w-full lg:w-1/2" ref={faqRef}>
              <div className="space-y-4">
                {faqs.length > 0 ? (
                  faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
                      ref={(el) => {
                        if (el && !faqItemsRef.current.includes(el)) {
                          faqItemsRef.current.push(el);
                          gsap.fromTo(
                            el,
                            { y: 30, opacity: 0 },
                            {
                              y: 0,
                              opacity: 1,
                              duration: 0.5,
                              delay: index * 0.1,
                              scrollTrigger: {
                                trigger: el,
                                start: "top 90%",
                                toggleActions: "play none none none",
                              },
                            }
                          );
                        }
                      }}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-700 transition-colors"
                      >
                  <span className="font-medium">{faq.question}</span>
                  <svg
                          className={`w-5 h-5 text-blue-400 transform transition-transform ${
                            activeIndex === index ? "rotate-180" : ""
                          }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                      <div
                        id={`faq-answer-${index}`}
                        className="overflow-hidden"
                        style={{
                          height: activeIndex === index ? "auto" : "0",
                          opacity: activeIndex === index ? 1 : 0,
                        }}
                      >
                        <div className="px-4 pb-4 pt-2 text-gray-400">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">
                    Loading FAQs...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-16 bg-gradient-to-r from-blue-900 to-blue-700"
        ref={ctaRef}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for a Second Opinion?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Connect with a specialist today and take control of your health
            journey.
          </p>
          <Link
            href="/find-doctor"
            className="bg-white text-blue-900 hover:bg-blue-100 px-8 py-3 rounded-full font-bold text-lg inline-block transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Find Your Doctor Now
          </Link>
        </div>
      </section>
    </main>
  );
}
