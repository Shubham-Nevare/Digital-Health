'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VideoConsultation({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [doctor, setDoctor] = useState({
    name: 'Loading...',
    specialty: 'Loading...',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    consultationFee: 150,
    duration: '45 minutes',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await fetch(`/api/doctors/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctor information');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor information:', error);
        // Keep the default values in case of error
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [params.id]);

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecordingConsent, setHasRecordingConsent] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    initializeMedia();
    return () => {
      // Cleanup streams when component unmounts
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Simulate remote stream connection
      setTimeout(() => {
        setConnectionStatus('Connected');
        setIsConnecting(false);
        // In a real implementation, this would be the remote peer's stream
        setRemoteStream(stream.clone());
      }, 2000);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setConnectionStatus('Failed to connect');
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        
        // Replace video track in local stream
        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = localStream.getVideoTracks()[0];
        sender.replaceTrack(videoTrack);
        
        // Handle screen share stop
        videoTrack.onended = async () => {
          setIsScreenSharing(false);
          // Restore camera video track
          const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          const cameraTrack = cameraStream.getVideoTracks()[0];
          sender.replaceTrack(cameraTrack);
        };

        setIsScreenSharing(true);
      } else {
        // Stop screen sharing and restore camera
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const videoTrack = cameraStream.getVideoTracks()[0];
        const sender = localStream.getVideoTracks()[0];
        sender.replaceTrack(videoTrack);
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const toggleRecording = () => {
    if (!hasRecordingConsent) {
      alert('Please provide consent for recording first.');
      return;
    }
    setIsRecording(!isRecording);
    // Implement actual recording logic here
    if (!isRecording) {
      // Start recording
      console.log('Recording started');
    } else {
      // Stop recording
      console.log('Recording stopped');
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate doctor's response
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: doctor.name,
          text: 'Thank you for your message. I will address this during our consultation.',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const endCall = () => {
    if (confirm('Are you sure you want to end the consultation?')) {
      // Cleanup streams
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold text-blue-400">
                {isLoading ? 'Loading...' : doctor.name}
              </h1>
              <p className="text-gray-400">
                {isLoading ? 'Loading...' : doctor.specialty}
              </p>
              <p className="text-sm text-gray-500">
                Consultation Fee: ${doctor.consultationFee}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">
              Duration: {isLoading ? 'Loading...' : doctor.duration}
            </span>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isChatOpen ? 'Hide Chat' : 'Show Chat'}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Video Section */}
          <div className={`${isChatOpen ? 'w-3/4' : 'w-full'} bg-gray-950 rounded-lg overflow-hidden`}>
            {isConnecting ? (
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">{connectionStatus}</p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video">
                {/* Remote Video */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Local Video */}
                <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden border-2 border-gray-800">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="p-4 bg-gray-900 flex justify-center items-center space-x-4">
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoEnabled ? 'bg-gray-800 text-white' : 'bg-red-600 text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isVideoEnabled
                      ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      : "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    }
                  />
                </svg>
              </button>
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full ${
                  isAudioEnabled ? 'bg-gray-800 text-white' : 'bg-red-600 text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isAudioEnabled
                      ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    }
                  />
                </svg>
              </button>
              <button
                onClick={toggleScreenShare}
                className={`p-3 rounded-full ${
                  isScreenSharing ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </button>
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-full ${
                  isRecording ? 'bg-red-600 text-white' : 'bg-gray-800 text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
              <button
                onClick={endCall}
                className="p-3 rounded-full bg-red-600 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Section */}
          {isChatOpen && (
            <div className="w-1/4 bg-gray-950 rounded-lg flex flex-col h-[calc(100vh-12rem)]">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-blue-400">Chat</h2>
              </div>
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      message.sender === 'You' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-sm text-gray-400">{message.sender}</span>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'You'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {message.text}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Recording Consent Modal */}
      {!hasRecordingConsent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-950 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Recording Consent
            </h2>
            <p className="text-gray-300 mb-4">
              This consultation may be recorded for quality and training purposes.
              The recording will be securely stored and only accessible to authorized personnel.
              Do you consent to being recorded?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setHasRecordingConsent(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-300"
              >
                Decline
              </button>
              <button
                onClick={() => setHasRecordingConsent(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}