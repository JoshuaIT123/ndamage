import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/students";

const ViewStudents = () => {
  // =========================
  // State
  // =========================
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("names");

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // =========================
  // Fetch Students
  // =========================
  const handleFetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Lifecycle
  // =========================
  useEffect(() => {
    handleFetch();
  }, []);

  // =========================
  // Search Logic
  // =========================
  const filteredStudents = students.filter((std) =>
    std.names.toLowerCase().includes(search.toLowerCase()) ||
    std.email.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // Sort Logic
  // =========================
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "age") return a.age - b.age;
    if (sortBy === "grade") return a.grade.localeCompare(b.grade);
    return a.names.localeCompare(b.names);
  });

  // =========================
  // Pagination Logic
  // =========================
  const totalPages = Math.ceil(sortedStudents.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = sortedStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // =========================
  // UI States
  // =========================
  if (loading) {
    return <p className="text-white p-6">Loading students...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-6">{error}</p>;
  }

  // =========================
  // Render
  // =========================
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-6xl mx-auto bg-gray-950 p-6 rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Students Dashboard</h1>

          <button
            onClick={handleFetch}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg w-full md:w-1/2"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg"
          >
            <option value="names">Sort by Name</option>
            <option value="age">Sort by Age</option>
            <option value="grade">Sort by Grade</option>
          </select>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 text-gray-400 border-b border-gray-700 pb-2">
          <span>Name</span>
          <span>Age</span>
          <span>Grade</span>
          <span>Email</span>
        </div>

        {/* Students */}
        <div className="mt-4 space-y-3">
          {paginatedStudents.length === 0 ? (
            <p className="text-gray-400">No students found.</p>
          ) : (
            paginatedStudents.map((std, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <span>{std.names}</span>
                <span>{std.age}</span>
                <span className="text-indigo-400">{std.grade}</span>
                <span className="truncate">{std.email}</span>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewStudents;
