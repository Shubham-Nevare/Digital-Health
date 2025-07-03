"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollTop = 0;

  // Refs for GSAP animations
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const navRef = useRef(null);

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    const handleStorageChange = (e) => {
      if (e.key === "user") {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    const handleAuthChange = () => {
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animations for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      // Menu opening animation
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "auto", duration: 0.3, ease: "power2.out" }
      );

      // Stagger animation for menu items
      gsap.fromTo(
        mobileLinksRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "back.out",
        }
      );
    } else {
      // Menu closing animation
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          height: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isMenuOpen]);

  // Navbar show/hide animation
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: showNavbar ? 0 : -80,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [showNavbar]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    window.dispatchEvent(new Event("manualLogout"));
    router.push("/login");
  };

  const addToMobileLinksRef = (el) => {
    if (el && !mobileLinksRef.current.includes(el)) {
      mobileLinksRef.current.push(el);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed w-full bg-gray-900 border-b border-gray-800 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-blue-400 text-xl font-bold">
              HealthConnect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/"
                    ? "text-white bg-blue-900/50"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/find-doctor"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/find-doctor"
                    ? "text-white bg-blue-900/50"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Find Doctor
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/about"
                    ? "text-white bg-blue-900/50"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/contact"
                    ? "text-white bg-blue-900/50"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Contact
              </Link>

              {user ? (
                <div className="relative ml-4">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    {user.profileImage ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500">
                        <Image
                          src={user.profileImage}
                          alt={user.name || "User"}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-blue-400">
                        <span className="text-white font-medium">
                          {user.name?.charAt(0) || user.email?.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-gray-300">
                      {user.name || user.email}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isProfileMenuOpen ? "rotate-180" : ""
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

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <Link
                          href={
                            user?.role === "admin"
                              ? "/admin/profile"
                              : user?.role === "doctor"
                              ? "/doctor/profile"
                              : "/profile"
                          }
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Your Profile
                        </Link>
                        <Link
                          href={
                            user?.role === "admin"
                              ? "/admin/dashboard"
                              : user?.role === "doctor"
                              ? "/doctor/dashboard"
                              : "/dashboard"
                          }
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === "/login"
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === "/signup"
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            ref={addToMobileLinksRef}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/"
                ? "text-white bg-blue-900/50"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/find-doctor"
            ref={addToMobileLinksRef}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/find-doctor"
                ? "text-white bg-blue-900/50"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Find Doctor
          </Link>
          <Link
            href="/about"
            ref={addToMobileLinksRef}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/about"
                ? "text-white bg-blue-900/50"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            ref={addToMobileLinksRef}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/contact"
                ? "text-white bg-blue-900/50"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <Link
                  href={
                    user?.role === "admin"
                      ? "/admin/profile"
                      : user?.role === "doctor"
                      ? "/doctor/profile"
                      : "/profile"
                  }
                  ref={addToMobileLinksRef}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  href={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : user?.role === "doctor"
                      ? "/doctor/dashboard"
                      : "/dashboard"
                  }
                  ref={addToMobileLinksRef}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  ref={addToMobileLinksRef}
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-700 pt-2 mt-2">
              <Link
                href="/login"
                ref={addToMobileLinksRef}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/login"
                    ? "text-white bg-blue-600"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                ref={addToMobileLinksRef}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === "/signup"
                    ? "text-white bg-blue-600"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}