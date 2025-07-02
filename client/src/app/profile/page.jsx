"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from 'js-cookie';
import PersonalInfo from './components/PersonalInfo';
import MedicalHistory from './components/MedicalHistory';
import Settings from './components/Settings';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContacts: [],
    insuranceInfo: {
      provider: "",
      policyNumber: "",
      groupNumber: "",
      expiryDate: "",
    },
    bloodType: "",
    height: "",
    weight: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Medical history state
  const [medicalHistory, setMedicalHistory] = useState({
    allergies: [],
    chronicConditions: [],
    medications: [],
  });

  // New item inputs for medical history
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newMedication, setNewMedication] = useState("");

  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push("/login");
        return;
      }

      
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : "",
          gender: userData.gender || "",
          address: userData.address || "",
          emergencyContacts: userData.emergencyContacts || [],
          insuranceInfo: userData.insuranceInfo || {
            provider: "",
            policyNumber: "",
            groupNumber: "",
            expiryDate: "",
          },
          bloodType: userData.bloodType || "",
          height: userData.height || "",
          weight: userData.weight || "",
        });
        setProfileImage(userData.profileImage || null);
        
        // Set medical history - initialize as empty if not exists
        const initialMedicalHistory = userData.medicalHistory || {
          allergies: [],
          chronicConditions: [],
          medications: [],
        };
        setMedicalHistory(initialMedicalHistory);
      } else {
        if (response.status === 401) {
          // Token expired or invalid
          Cookies.remove('token');
          localStorage.removeItem('user');
          router.push("/login");
        } else {
          setError("Failed to load user profile");
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [router]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('profileImage', file);
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const response = await fetch(`${API_URL}/auth/profile/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setProfileImage(updatedUser.profileImage);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsUploading(false);
        alert('Profile image updated successfully!');
      } else {
        setIsUploading(false);
        alert('Failed to update profile image.');
      }
    } catch (error) {
      setIsUploading(false);
      alert('Network error. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          emergencyContacts: formData.emergencyContacts,
          insuranceInfo: formData.insuranceInfo,
          bloodType: formData.bloodType,
          height: formData.height,
          weight: formData.weight,
        }),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        setIsEditing(false);
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setSuccess("Profile updated successfully!");
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [
        ...formData.emergencyContacts,
        { name: "", relationship: "", phone: "" },
      ],
    });
  };

  const removeEmergencyContact = (index) => {
    const updatedContacts = formData.emergencyContacts.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const updateEmergencyContact = (index, field, value) => {
    const updatedContacts = formData.emergencyContacts.map((contact, i) => {
      if (i === index) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setMedicalHistory(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy("");
    }
  };

  const removeAllergy = (index) => {
    setMedicalHistory(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setMedicalHistory(prev => ({
        ...prev,
        chronicConditions: [...prev.chronicConditions, newCondition.trim()]
      }));
      setNewCondition("");
    }
  };

  const removeCondition = (index) => {
    setMedicalHistory(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions.filter((_, i) => i !== index)
    }));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedicalHistory(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication.trim()]
      }));
      setNewMedication("");
    }
  };

  const removeMedication = (index) => {
    setMedicalHistory(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const saveMedicalHistory = async () => {
    try {
      console.log('=== Frontend: Saving Medical History ===');
      console.log('Current medical history state:', medicalHistory);
      
      const token = Cookies.get('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        router.push("/login");
        return;
      }

      const requestBody = { medicalHistory };
      console.log('Sending request body:', requestBody);

      const response = await fetch(`${API_URL}/auth/profile/medical-history`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log('Received updated user data:', updatedUserData);
        
        setUser(updatedUserData);
        
        // Update the medical history state with the new data
        if (updatedUserData.medicalHistory) {
          console.log('Updating medical history state with:', updatedUserData.medicalHistory);
          setMedicalHistory(updatedUserData.medicalHistory);
        }
        
        setIsEditingMedical(false);
        setSuccess("Medical history updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        setError(errorData.message || "Failed to update medical history");
      }
    } catch (error) {
      console.error('Error in saveMedicalHistory:', error);
      setError("Network error. Please try again.");
    }
  };

  const renderProfileImage = () => (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-32 h-32 mb-4">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-4xl text-gray-400">
              {formData.name ? formData.name[0].toUpperCase() : "?"}
            </span>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-blue-400 hover:text-blue-300 text-sm"
      >
        {profileImage ? "Change Photo" : "Add Photo"}
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-gray-950 p-6 rounded-xl shadow-md border border-gray-800">
          {/* Left: Heading & Description */}
          <div className="text-left space-y-2">
            <h1 className="text-4xl font-bold text-blue-500">
              Hello, {formData.name} 👋
            </h1>
            <p className="text-gray-400 text-sm">
              Welcome to your dashboard — manage your profile, view medical
              history, and update settings.
            </p>

            {/* Optional Role Badge */}
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {user.role === 'doctor' ? 'Verified Doctor' : 'Verified Patient'}
            </div>
          </div>

          {/* Right: Profile Image + Edit Button */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            {renderProfileImage()}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-lg text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className="mb-6 bg-green-900/50 border border-green-700 text-green-100 px-4 py-3 rounded-lg text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex justify-center space-x-8">
            {["personal", "medical", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition duration-200 ease-in-out pb-3 text-sm font-semibold border-b-2 ${
                  activeTab === tab
                    ? "text-blue-400 border-blue-500"
                    : "text-gray-400 border-transparent hover:text-white hover:border-gray-600"
                }`}
              >
                {tab === "personal"
                  ? "Personal Information"
                  : tab === "medical"
                  ? "Medical History"
                  : "Settings"}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 transition-all duration-300">
          {activeTab === "personal" && (
            <PersonalInfo
              user={user}
              formData={formData}
              setFormData={setFormData}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              fileInputRef={fileInputRef}
              handleImageUpload={handleImageUpload}
              handleSubmit={handleSubmit}
              addEmergencyContact={addEmergencyContact}
              removeEmergencyContact={removeEmergencyContact}
              updateEmergencyContact={updateEmergencyContact}
            />
          )}
         
          {activeTab === "medical" && (
            <MedicalHistory
              medicalHistory={medicalHistory}
              setMedicalHistory={setMedicalHistory}
              newAllergy={newAllergy}
              setNewAllergy={setNewAllergy}
              newCondition={newCondition}
              setNewCondition={setNewCondition}
              newMedication={newMedication}
              setNewMedication={setNewMedication}
              addAllergy={addAllergy}
              removeAllergy={removeAllergy}
              addCondition={addCondition}
              removeCondition={removeCondition}
              addMedication={addMedication}
              removeMedication={removeMedication}
              saveMedicalHistory={saveMedicalHistory}
              isEditingMedical={isEditingMedical}
              setIsEditingMedical={setIsEditingMedical}
            />
          )}

          {activeTab === "settings" && (
            <Settings user={user} />
          )}
        </div>
      </div>
    </div>
  );
}
