"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import { doctors } from "@/data/doctors";
import RenderProfessionalInfo from "./component/RenderProfessionalInfo";
import RenderScheduleInfo from "./component/RenderScheduleInfo";
import RenderPatientInfo from "./component/RenderPatientInfo";
import RenderReviewsInfo from "./component/RenderReviewsInfo";
import Cookies from 'js-cookie';

export default function DoctorProfile() {
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    rating: 0,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    experience: "",
    availability: "",
    consultationFee: "",
    consultationDuration: "",
    languages: [],
    certifications: [],
    education: [],
    about: "",
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setDoctor(parsedUser);

      // Fetch full doctor profile from backend
      const fetchDoctorProfile = async () => {
        try {
          const token = Cookies.get('token');
          if (!token) {
            router.push("/login");
            return;
          }
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const userData = await response.json();
            // Set stats safely
            setStats({
              patients: userData.doctorProfile?.totalPatientsCheck || 0,
              appointments: userData.doctorProfile?.totalAppointments || 0,
              rating: userData.doctorProfile?.rating || 0,
            });
            setFormData({
              name: userData.name || "",
              email: userData.email || "",
              specialty: userData.specialty || "",
              experience: userData.experience || "",
              availability: userData.availability || "",
              consultationFee: userData.consultationFee || "",
              consultationDuration: userData.consultationDuration || "",
              languages: userData.languages || [],
              certifications: userData.certifications || [],
              education: userData.education || [],
              about: userData.about || "",
            });
            setProfileImage(userData.profileImage || null);
          } else {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
        }
      };
      fetchDoctorProfile();
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        try {
          const token = Cookies.get('token');
          if (!token) {
            router.push('/login');
            return;
          }
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profileImage: base64Image }),
          });
          if (response.ok) {
            const updatedUser = await response.json();
            setProfileImage(updatedUser.profileImage || base64Image);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setDoctor(updatedUser);
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
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setDoctor(updatedUser);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", year: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setFormData({ ...formData, education: updatedEducation });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, ""],
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = formData.certifications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const updateCertification = (index, value) => {
    const updatedCertifications = formData.certifications.map((cert, i) =>
      i === index ? value : cert
    );
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const renderProfileImage = () => {
    const initials = formData.name
      ? formData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "?";

    return (
      <div className="flex flex-col items-center mb-8 relative group">
        <div className="relative w-40 h-40 mb-4">
          {/* Profile Image or Initials Avatar */}
          {profileImage ? (
            <Image
              src={profileImage}
              alt={`${formData.name || "Doctor"} profile`}
              fill
              className="rounded-full object-cover border-4 border-blue-500 shadow-lg"
              priority
              sizes="160px"
              onError={() => setProfileImage(null)} // Fallback to initials if image fails to load
            />
          ) : (
            <div
              className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center border-4 border-blue-500 shadow-lg"
              aria-hidden={!!profileImage}
            >
              <span className="text-6xl text-white font-bold select-none">
                {initials}
              </span>
            </div>
          )}

          {/* Upload Loading Indicator */}
          {isUploading && (
            <div
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"
              aria-live="polite"
              aria-busy={isUploading}
            >
              <div
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"
                aria-label="Uploading image"
              />
            </div>
          )}

          {/* Upload Button Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-md transform translate-x-1 translate-y-1 transition-all duration-300 group-hover:scale-110 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={
              profileImage ? "Change profile picture" : "Upload profile picture"
            }
            disabled={isUploading}
          >
            <FiUpload className="text-white text-lg" />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          aria-hidden="true"
          disabled={isUploading}
        />

        {/* Upload Text Button */}
        {/* <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 transition-colors"
          disabled={isUploading}
        >
          <FiUpload size={14} />
          {profileImage ? "Change Photo" : "Add Photo"}
        </button> */}
      </div>
    );
  };

  const renderStats = () => (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-4 text-center shadow-lg">
        <div className="text-3xl font-bold text-white">{stats.patients}+</div>
        <div className="text-blue-200 text-sm">Patients</div>
      </div>
      <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-4 text-center shadow-lg">
        <div className="text-3xl font-bold text-white">
          {stats.appointments}
        </div>
        <div className="text-purple-200 text-sm">Appointments</div>
      </div>
      <div className="bg-gradient-to-br from-teal-900 to-teal-700 rounded-xl p-4 text-center shadow-lg">
        <div className="text-3xl font-bold text-white">{stats.rating}</div>
        <div className="text-teal-200 text-sm">Rating</div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="flex border-b border-gray-700 mb-6">
      <button
        onClick={() => setActiveTab("profile")}
        className={`px-4 py-3 font-medium ${
          activeTab === "profile"
            ? "text-blue-400 border-b-2 border-blue-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Profile
      </button>
      <button
        onClick={() => setActiveTab("schedule")}
        className={`px-4 py-3 font-medium ${
          activeTab === "schedule"
            ? "text-blue-400 border-b-2 border-blue-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Schedule
      </button>
      <button
        onClick={() => setActiveTab("patients")}
        className={`px-4 py-3 font-medium ${
          activeTab === "patients"
            ? "text-blue-400 border-b-2 border-blue-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Patients
      </button>
      <button
        onClick={() => setActiveTab("reviews")}
        className={`px-4 py-3 font-medium ${
          activeTab === "reviews"
            ? "text-blue-400 border-b-2 border-blue-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Reviews
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {renderProfileImage()}
            {renderStats()}
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{formData.name}</h1>
            <p className="text-xl text-blue-400 mb-6">{formData.specialty}</p>
            {renderTabs()}
            {activeTab === "profile" && (
              <RenderProfessionalInfo
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                addEducation={addEducation}
                updateEducation={updateEducation}
                removeEducation={removeEducation}
                addCertification={addCertification}
                updateCertification={updateCertification}
                removeCertification={removeCertification}
              />
            )}
            {activeTab === "schedule" && <RenderScheduleInfo />}
            {activeTab === "patients" && <RenderPatientInfo />}
            {activeTab === "reviews" && <RenderReviewsInfo />}
          </div>
        </div>
      </div>
    </div>
  );
}
