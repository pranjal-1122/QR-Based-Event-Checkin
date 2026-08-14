import { useParams, Link } from "react-router-dom";
import QRGenerator from "../components/QRGenerator";
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
        
        {/* Pass Header */}
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          ● Official Digital Pass
        </div>
        
        <h2 className="text-2xl font-bold text-zinc-100">Event Pass Ready</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Pass ID: <span className="font-mono text-emerald-400 font-semibold">#{id}</span>
        </p>

        {/* QR Code Container */}
        <div className="my-8 flex justify-center">
          <QRGenerator value={id} />
        </div>

        {/* Instruction Note */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-400 mb-6">
          <p>📌 Please present this QR code at the event check-in desk for entry.</p>
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
  );
};

export default TicketPage;