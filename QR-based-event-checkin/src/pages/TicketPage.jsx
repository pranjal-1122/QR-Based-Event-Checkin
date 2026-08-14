import { useParams, Link } from "react-router-dom";
import QRGenerator from "../components/QRGenerator";
import Aurora from "../components/Aurora";
import { getUserById } from "../services/api";
import { useEffect, useState } from "react";

const TicketPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        console.error("Error loading ticket:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 px-4 pt-28 pb-12">
      
      {/* 🌌 WebGL Aurora Background Component */}
      <Aurora
        colorStops={["#000000", "#10b981", "#022c22"]}
        blend={0.6}
        amplitude={1.2}
        speed={0.5}
      />

      {/* Ticket Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-zinc-900/30 backdrop-blur-2xl border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
          
          {/* Pass Header */}
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-sm shadow-emerald-500/10">
            Official Digital Pass
          </div>

          <h2 className="text-2xl font-bold text-zinc-100">Event Pass Ready</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Pass ID: <span className="font-mono text-emerald-400 font-semibold">#{id}</span>
          </p>

          {/* Participant Details (if loaded) */}
          {user && (
            <div className="mt-3 text-xs text-zinc-300 bg-zinc-950/60 border border-zinc-800/60 rounded-xl py-2 px-4 inline-flex items-center gap-2">
              <span className="font-semibold text-zinc-100">{user.fullName}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{user.rollNumber}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-medium">{user.branch}</span>
            </div>
          )}

          {/* QR Code Container */}
          <div className="my-6 flex justify-center">
            <QRGenerator value={id} />
          </div>

          {/* Instruction Note */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-3.5 text-xs text-zinc-400 mb-6">
            <p>Please present this QR code at the event check-in desk for entry.</p>
          </div>

          {/* Navigation Action */}
          <Link
            to="/"
            className="inline-block text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            ← Register another participant
          </Link>

        </div>
      </div>

    </div>
  );
};

export default TicketPage;