"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiEdit,
  FiTrash2,
  FiUser,
  FiUserPlus,
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiCheck,
  FiX,
  FiCalendar,
  FiUserCheck,
  FiDownload,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";
import { saveAs } from "file-saver";

const AdminDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Appointment filters
  const [appointmentFilters, setAppointmentFilters] = useState({
    sortBy: "newest", // newest, oldest, date
    status: "all", // all, pending, confirmed, rejected, cancelled
    dateRange: "all", // all, today, week, month
    searchTerm: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Admin management
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "admin") {
        setUser(parsedUser);
        fetchData();
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Fetch doctors
      const doctorsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/doctors`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const doctorsData = await doctorsRes.json();
      setDoctors(doctorsData.doctors || []);
      setTotalDoctors(doctorsData.total || 0);

      // Fetch patients
      const patientsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/patients`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const patientsData = await patientsRes.json();
      setPatients(patientsData.patients || []);
      setTotalPatients(patientsData.total || 0);

      // Fetch appointments
      const apptRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const apptData = await apptRes.json();
      setAppointments(apptData.appointments || []);
      setTotalAppointments(apptData.total || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/add-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAdmin),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Admin added successfully!");
        setNewAdmin({ name: "", email: "", password: "" });
      } else {
        setMessage(data.message || "Error adding admin");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  const handleEditUser = (type, id) => {
    router.push(`/admin/edit/${type}/${id}`);
  };

  const handleDeleteUser = async (type, id) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${type}/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        if (type === "doctors") {
          setDoctors(doctors.filter((d) => d._id !== id));
        } else {
          setPatients(patients.filter((p) => p._id !== id));
        }
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleConfirmAppointment = async (appointmentId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "confirmed" }),
        }
      );
      if (!res.ok) throw new Error("Failed to confirm appointment");
      const updatedAppointment = await res.json();
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? updatedAppointment : appt
        )
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "rejected", rejectionReason: reason }),
        }
      );
      if (!res.ok) throw new Error("Failed to reject appointment");
      const updatedAppointment = await res.json();
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? updatedAppointment : appt
        )
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleExport = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/export`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to export data");

      const blob = await res.blob();
      saveAs(blob, `appointments-${new Date().toISOString()}.csv`);
    } catch (error) {
      console.error("Export Error:", error);
      alert("Could not export appointments.");
    }
  };

  // Appointment filtering functions
  const getFilteredAppointments = () => {
    let filtered = [...appointments];

    // Filter by search term
    if (appointmentFilters.searchTerm) {
      const searchLower = appointmentFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (appt) =>
          appt.patient?.name?.toLowerCase().includes(searchLower) ||
          appt.doctor?.name?.toLowerCase().includes(searchLower) ||
          appt.appointmentTime?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (appointmentFilters.status !== "all") {
      filtered = filtered.filter(
        (appt) => appt.status === appointmentFilters.status
      );
    }

    // Filter by date range
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (appointmentFilters.dateRange) {
      case "today":
        filtered = filtered.filter((appt) => {
          const apptDate = new Date(appt.appointmentDate);
          return apptDate >= today;
        });
        break;
      case "week":
        filtered = filtered.filter((appt) => {
          const apptDate = new Date(appt.appointmentDate);
          return apptDate >= weekAgo;
        });
        break;
      case "month":
        filtered = filtered.filter((appt) => {
          const apptDate = new Date(appt.appointmentDate);
          return apptDate >= monthAgo;
        });
        break;
      default:
        break;
    }

    // Sort appointments
    switch (appointmentFilters.sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || b.appointmentDate) -
            new Date(a.createdAt || a.appointmentDate)
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt || a.appointmentDate) -
            new Date(b.createdAt || b.appointmentDate)
        );
        break;
      case "date":
        filtered.sort(
          (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
        );
        break;
      default:
        break;
    }

    return filtered;
  };

  const clearFilters = () => {
    setAppointmentFilters({
      sortBy: "newest",
      status: "all",
      dateRange: "all",
      searchTerm: "",
    });
  };

  const filteredAppointments = getFilteredAppointments();

  const filteredDoctors = (doctors || []).filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = (patients || []).filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <nav className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base ${
                activeTab === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base ${
                activeTab === "doctors" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab("patients")}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base ${
                activeTab === "patients" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Patients
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base ${
                activeTab === "appointments"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab("admins")}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base ${
                activeTab === "admins" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              Admins
            </button>
            <Link
              href="/admin/profile"
              className="px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-gray-700"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/login");
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Welcome Section */}
        <div className="mb-8 bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            Welcome, <span className="text-blue-400">{user.name}</span>!
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            You have full administrative privileges to manage the system.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 md:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Search doctors or patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={fetchData}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Total Doctors */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                <FiUser className="text-sm md:text-base" /> Total Doctors
              </h3>
              <p className="text-2xl md:text-3xl font-bold">{totalDoctors}</p>
            </div>

            {/* Total Patients */}
            <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                <FiUser className="text-sm md:text-base" /> Total Patients
              </h3>
              <p className="text-2xl md:text-3xl font-bold">{totalPatients}</p>
            </div>

            {/* Total Appointments */}
            <div className="bg-gradient-to-br from-green-900 to-green-700 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                <FiUserCheck className="text-sm md:text-base" /> Total
                Appointments
              </h3>
              <p className="text-2xl md:text-3xl font-bold">
                {totalAppointments}
              </p>
            </div>

            {/* Add New */}
            <div className="bg-gradient-to-br from-teal-900 to-teal-700 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                <FiUserPlus className="text-sm md:text-base" /> Add New
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => router.push("/admin/add-doctor")}
                  className="bg-white bg-opacity-10 text-black hover:bg-opacity-20 px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm"
                >
                  Add Doctor
                </button>
                <button
                  onClick={() => router.push("/admin/add-patient")}
                  className="bg-white bg-opacity-10 text-black hover:bg-opacity-20 px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === "doctors" && (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold">Doctors List</h3>
              <button
                onClick={() => router.push("/admin/add-doctor")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base"
              >
                <FiPlus /> Add Doctor
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Name
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Specialty
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Email
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Status
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-right text-sm md:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-750">
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        {doctor.name}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        {doctor.specialty}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        {doctor.email}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            doctor.active
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {doctor.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleEditUser("doctors", doctor._id)
                            }
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <FiEdit className="text-sm md:text-base" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteUser("doctors", doctor._id)
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            <FiTrash2 className="text-sm md:text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold">Patients List</h3>
              <button
                onClick={() => router.push("/admin/add-patient")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 text-sm md:text-base"
              >
                <FiPlus /> Add Patient
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Name
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Email
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Phone
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Status
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-right text-sm md:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredPatients.map((patient) => (
                    <tr key={patient._id} className="hover:bg-gray-750">
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        {patient.name}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        {patient.email}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        {patient.phone || "N/A"}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            patient.active
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {patient.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleEditUser("patients", patient._id)
                            }
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <FiEdit className="text-sm md:text-base" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteUser("patients", patient._id)
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            <FiTrash2 className="text-sm md:text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-700 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h3 className="text-lg font-semibold flex items-center">
                <FiCalendar className="mr-2" />
                Appointments
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={fetchData}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiRefreshCw className={loading ? "animate-spin" : ""} />{" "}
                  Refresh
                </button>
                <button
                  onClick={handleExport}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiDownload className="mr-1" /> Export to CSV
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiFilter className="mr-1" /> Filters
                  <FiChevronDown
                    className={`ml-1 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Filter Controls */}
            {showFilters && (
              <div className="p-4 bg-gray-750 border-t border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      placeholder="Search patient, doctor, or time..."
                      value={appointmentFilters.searchTerm}
                      onChange={(e) =>
                        setAppointmentFilters({
                          ...appointmentFilters,
                          searchTerm: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sort By
                    </label>
                    <select
                      value={appointmentFilters.sortBy}
                      onChange={(e) =>
                        setAppointmentFilters({
                          ...appointmentFilters,
                          sortBy: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="date">Appointment Date</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      value={appointmentFilters.status}
                      onChange={(e) =>
                        setAppointmentFilters({
                          ...appointmentFilters,
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date Range
                    </label>
                    <select
                      value={appointmentFilters.dateRange}
                      onChange={(e) =>
                        setAppointmentFilters({
                          ...appointmentFilters,
                          dateRange: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>

                {/* Container for count & button */}
                <div className="mt-4 flex justify-between items-center">
                {/* Result count text */}
                  <div className="text-sm text-gray-300">
                    Showing {filteredAppointments.length} of{" "}
                    {appointments.length} appointments
                  </div>

                  {/* Clear Filters button */}
                  <button
                    onClick={clearFilters}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Patient
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Doctor
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Date
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Time
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-sm md:text-base">
                      Status
                    </th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-right text-sm md:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-400"
                      >
                        {appointments.length === 0
                          ? "No appointments found"
                          : "No appointments match your filters"}
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appt) => (
                      <tr key={appt._id} className="hover:bg-gray-750">
                        <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                          {appt.patient?.name || "-"}
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                          {appt.doctor?.name || "-"}
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                          {new Date(appt.appointmentDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                          {appt.appointmentTime}
                        </td>
                        <td className="px-4 py-2 md:px-6 md:py-4 text-sm md:text-base">
                          <span
                            className={`px-2 py-1 rounded-full text-xs capitalize ${
                              appt.status === "pending"
                                ? "bg-yellow-700 text-yellow-200"
                                : appt.status === "confirmed"
                                ? "bg-green-700 text-green-200"
                                : appt.status === "rejected"
                                ? "bg-red-700 text-red-200"
                                : appt.status === "cancelled"
                                ? "bg-yellow-900/30 text-yellow-300 border border-yellow-800"
                                : "bg-indigo-700 text-indigo-200"
                            }`}
                          >
                            {appt.status}
                          </span>
                          {appt.status === "rejected" &&
                            appt.rejectionReason && (
                              <div className="text-xs text-red-300 mt-1">
                                Reason: {appt.rejectionReason}
                              </div>
                            )}
                          {appt.status === "cancelled" &&
                            appt.cancellationReason && (
                              <div className="text-xs text-yellow-300 mt-1">
                                Reason: {appt.cancellationReason}
                              </div>
                            )}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-4">
                          {appt.status === "pending" && (
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-1 sm:gap-2">
                              <button
                                onClick={() =>
                                  handleConfirmAppointment(appt._id)
                                }
                                className="text-xs bg-green-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-green-500 flex items-center w-full sm:w-auto justify-center"
                              >
                                <FiCheck className="mr-1" /> Confirm
                              </button>
                              <button
                                onClick={() =>
                                  handleRejectAppointment(appt._id)
                                }
                                className="text-xs bg-red-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-500 flex items-center w-full sm:w-auto justify-center"
                              >
                                <FiX className="mr-1" /> Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admins Tab */}
        {activeTab === "admins" && (
          <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Admin</h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  type="text"
                  placeholder="Name"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  type="email"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm md:text-base"
              >
                Add Admin
              </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
