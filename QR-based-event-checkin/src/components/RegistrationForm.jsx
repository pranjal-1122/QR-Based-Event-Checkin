import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const RegistrationForm = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rollNumber: "",
    branch: "CSE",
  });

  // Loading State
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to MockAPI using Axios
      const createdUser = await registerUser(formData);
      
      // Redirect to ticket page using the REAL database ID
      navigate(`/ticket/${createdUser.id}`);
    } catch (error) {
      alert("Failed to register. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-zinc-900/20 backdrop-blur-2xl border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-zinc-100">Event Registration</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Fill in your student details to generate your official event entry pass.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            College Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="student@college.edu"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Roll Number & Branch (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Roll / Student ID
            </label>
            <input
              type="text"
              name="rollNumber"
              required
              placeholder="22BCS1001"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Branch / Dept
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full h-11 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="CSE">CSE</option>
              <option value="CSE-AI">CSE-AI</option>
              <option value="CSE-AI/ML">CSE-AI/ML</option>
              <option value="CS-IT">CS-IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-lg shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? "Generating Pass..." : "Generate Entry Pass →"}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;