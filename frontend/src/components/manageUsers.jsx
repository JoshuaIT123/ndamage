import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/users"; // your users API

const ManageUsers = () => {
  // =========================
  // State
  // =========================
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // =========================
  // Fetch Users
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // Add User
  // =========================
  const handleAddUser = async () => {
    if (!username || !email || !role) return alert("Fill all fields!");

    try {
      await axios.post(API_URL, { username, email, role });
      setUsername("");
      setEmail("");
      setRole("");
      fetchUsers(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  // =========================
  // Delete User
  // =========================
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  // =========================
  // UI States
  // =========================
  if (loading) return <p className="text-white p-6">Loading users...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  // =========================
  // Render
  // =========================
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-6xl mx-auto bg-gray-950 p-6 rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <button
            onClick={fetchUsers}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>

        {/* Add User Form */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg w-full md:w-1/3"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg w-full md:w-1/4"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Add User
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 text-gray-400 border-b border-gray-700 pb-2">
          <span>Username</span>
          <span>Email</span>
          <span>Role</span>
          <span>Actions</span>
        </div>

        {/* Users */}
        <div className="mt-4 space-y-3">
          {users.length === 0 ? (
            <p className="text-gray-400">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-4 gap-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition items-center"
              >
                <span>{user.username}</span>
                <span className="truncate">{user.email}</span>
                <span className="text-indigo-400">{user.role}</span>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;
