"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiEdit,
  FiLogOut,
  FiUser,
  FiLock,
  FiMail,
  FiActivity,
  FiShield,
  FiSettings,
  FiKey,
} from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";

const AdminProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "admin") {
        setUser(parsedUser);
        setEditForm({
          name: parsedUser.name,
          email: parsedUser.email,
          currentPassword: "",
          newPassword: "",
        });
        fetchAdminActivity();
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchAdminActivity = async () => {
    try {
      // Simulate fetching activity from API
      setTimeout(() => {
        setRecentActivity([
          { action: "Changed profile information", time: "30 minutes ago" },
          { action: "Updated security settings", time: "2 hours ago" },
          { action: "Changed password", time: "1 week ago" },
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching activity:", error);
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      setTimeout(() => {
        const updatedUser = {
          ...user,
          name: editForm.name,
          email: editForm.email,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        setRecentActivity((prev) => [
          { action: "Updated profile information", time: "Just now" },
          ...prev,
        ]);
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!editForm.currentPassword) {
      alert("Please enter your current password");
      return;
    }

    try {
      // Simulate password change API call
      setTimeout(() => {
        setRecentActivity((prev) => [
          { action: "Changed password", time: "Just now" },
          ...prev,
        ]);
        setEditForm((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
        }));
        alert("Password changed successfully!");
      }, 1000);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Logo/Title */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Admin Profile
          </h1>

          {/* Navigation */}
          <nav className="flex flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-auto">
            <Link
              href="/admin/dashboard"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full md:w-auto text-left"
            >
              Back to Dashboard
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
            >
              <FiLogOut /> Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-600 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiUser /> Profile Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    isEditing
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white transition-colors`}
                >
                  {isEditing ? (
                    <>Cancel Editing</>
                  ) : (
                    <>
                      <FiEdit /> Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="p-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <FiUser /> Name
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <FiMail /> Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
                        >
                          Save Profile Changes
                        </button>
                      </div>
                    </form>

                    <form
                      onSubmit={handlePasswordChange}
                      className="space-y-4 pt-6 border-t border-gray-700"
                    >
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <FiKey /> Change Password
                      </h3>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={editForm.currentPassword}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter current password"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={editForm.newPassword}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-3xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <p className="text-gray-400">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-gray-750 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Role</p>
                        <p className="text-white font-medium flex items-center gap-2">
                          <FiShield /> {user.role}
                        </p>
                      </div>
                      <div className="bg-gray-750 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Member Since</p>
                        <p className="text-white font-medium flex items-center gap-2">
                          <BsCalendarCheck />{" "}
                          {new Date(
                            user.createdAt || Date.now()
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-800 to-purple-600">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiActivity /> Your Recent Activity
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="bg-purple-900/50 p-2 rounded-full mt-1">
                          <FiActivity className="text-purple-300" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-600">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiSettings /> Account Settings
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  href="/admin/security"
                  className="bg-blue-900/50 hover:bg-blue-800 p-4 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <FiShield className="text-blue-300" size={20} />
                  <span>Security Settings</span>
                </Link>
                <Link
                  href="/admin/notifications"
                  className="bg-blue-900/50 hover:bg-blue-800 p-4 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <FiActivity className="text-blue-300" size={20} />
                  <span>Notification Preferences</span>
                </Link>
                <Link
                  href="/admin/privacy"
                  className="bg-blue-900/50 hover:bg-blue-800 p-4 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <FiLock className="text-blue-300" size={20} />
                  <span>Privacy Settings</span>
                </Link>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-600">
                <h2 className="text-xl font-semibold">System Information</h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Login</span>
                  <span>Today, 09:42 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Status</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Two-Factor Auth</span>
                  <span className="text-yellow-400">Not Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
