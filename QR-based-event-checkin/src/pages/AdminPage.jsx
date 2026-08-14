import { Camera, CircleCheck, CircleX } from 'lucide-react';
import { useEffect, useState } from "react";
import { getAllUsers, markAttendance } from "../services/api";
import QRScanner from "../components/QRScanner";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [scanMessage, setScanMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [search, setSearch] = useState("");

  // Load participants list
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const interval = setInterval(() => {
    fetchUsers();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle scanned QR Code
  const handleScan = async (scannedId) => {
    setShowScanner(false); // Close scanner modal/box after scan

    const matchedUser = users.find((u) => u.id === scannedId);

    if (!matchedUser) {
      setScanMessage({
        type: "error",
        text: `❌ Invalid Pass: Ticket ID #${scannedId} not found!`,
      });
      return;
    }

    if (matchedUser.status === "Attended") {
      setScanMessage({
        type: "error",
        text: `⚠️ Duplicate Check-In: ${matchedUser.fullName} has ALREADY checked in!`,
      });
      return;
    }

    try {
      await markAttendance(scannedId);
      setScanMessage({
        type: "success",
        text: `✅ Check-in Successful: ${matchedUser.fullName} (${matchedUser.rollNumber})`,
      });
      fetchUsers(); // Refresh live table stats
    } catch (err) {
      setScanMessage({
        type: "error",
        text: "❌ Server error updating attendance.",
      });
    }
  };

  // Metrics
  const totalRegistered = users.length;
  const totalAttended = users.filter((u) => u.status === "Attended").length;
  const totalPending = totalRegistered - totalAttended;

  // Filtered users for search bar
  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pt-28 sm:pt-32 px-4 sm:px-6 pb-12 space-y-8">
      
      {/* Top Header & Metrics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Organizer Dashboard</h1>
          <p className="text-sm text-zinc-400">Manage real-time check-ins and participant data</p>
        </div>

        <button
          onClick={() => {
            setScanMessage(null);
            setShowScanner(!showScanner);
          }}
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-emerald-500/10 transition-all cursor-pointer"
        >
          {showScanner ? "Close Camera" :  (
            <span className="flex items-center gap-2">
                <Camera className="w-5 h-5" strokeWidth={3}/>
                Open QR Scanner
            </span>
            )}
        </button>
      </div>

      {/* Live Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-xs font-semibold uppercase text-zinc-400">Total Registered</p>
          <p className="text-3xl font-bold text-zinc-100 mt-2">{totalRegistered}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-xs font-semibold uppercase text-emerald-400">Attended</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{totalAttended}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-xs font-semibold uppercase text-amber-400">Pending Check-in</p>
          <p className="text-3xl font-bold text-amber-400 mt-2">{totalPending}</p>
        </div>
      </div>

      {/* Alert Banner for Scan Feedback */}
      {scanMessage && (
        <div
          className={`p-4 rounded-xl border text-sm font-medium ${
            scanMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {scanMessage.text}
        </div>
      )}

      {/* Camera Modal / Box */}
      {showScanner && (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-center font-bold text-zinc-200 mb-4">
            Position QR Code inside the frame
          </h3>
          <QRScanner onScanSuccess={handleScan} />
        </div>
      )}

      {/* Participants Table Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold text-zinc-100">Participant Records</h2>
          <input
            type="text"
            placeholder="Search by name or roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-xs font-semibold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Roll No</th>
                <th className="p-3">Branch</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-zinc-500">
                    Loading participants...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-zinc-500">
                    No participants found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="p-3 font-mono text-zinc-500">#{u.id}</td>
                    <td className="p-3 text-zinc-200 font-medium">{u.fullName}</td>
                    <td className="p-3">{u.rollNumber}</td>
                    <td className="p-3">{u.branch}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          u.status === "Attended"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;