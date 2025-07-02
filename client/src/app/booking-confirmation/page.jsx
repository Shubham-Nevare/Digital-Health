'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BookingConfirmationContent() {
  const searchParams = useSearchParams();

  const doctorName = searchParams.get("doctorName");
  const specialty = searchParams.get("specialty");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const duration = searchParams.get("duration");
  const consultationFee = searchParams.get("consultationFee");
  const bookingId = searchParams.get("bookingId");

  return (
    <div className="min-h-screen bg-gray-900 py-12">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">
            Your consultation has been successfully booked. We've sent the details to your email.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-gray-950 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Booking Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Booking ID</span>
              <span className="text-white font-medium">{bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Doctor</span>
              <span className="text-white">Dr. {doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Specialty</span>
              <span className="text-white">{specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="text-white">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time</span>
              <span className="text-white">{time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration</span>
              <span className="text-white">{duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Consultation Fee</span>
              <span className="text-white">₹ {consultationFee}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-950 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Check Your Email</h3>
                <p className="text-gray-400">
                  We've sent a confirmation email with all the details and a calendar invite.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Prepare for Consultation</h3>
                <p className="text-gray-400">
                  Gather your medical records and prepare any questions you'd like to ask.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Join the Video Call</h3>
                <p className="text-gray-400">
                  Use the link in your email to join the video consultation 5 minutes before the scheduled time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/find-doctor"
            className="flex-1 bg-gray-800 text-white text-center py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Book Another Consultation
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}

// Loading component for Suspense fallback
function BookingConfirmationLoading() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
            </div>
            <div className="h-8 bg-gray-800 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
          
          <div className="bg-gray-950 rounded-lg p-6 mb-8">
            <div className="h-6 bg-gray-800 rounded mb-4 animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-800 rounded w-24 animate-pulse"></div>
                  <div className="h-4 bg-gray-800 rounded w-32 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmation() {
  return (
    <Suspense fallback={<BookingConfirmationLoading />}>
      <BookingConfirmationContent />
    </Suspense>
  );
}