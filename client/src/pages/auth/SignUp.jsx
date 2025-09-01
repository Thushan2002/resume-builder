import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiUserPlus,
  FiGithub,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { AppContext, useAppContext } from "../../context/AppContext";
import Navbar from "../../components/Navbar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { axios, setUser } = useAppContext();

  const validateEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim().length < 2) {
      toast.error("Please enter your full username");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/signup", {
        username,
        email,
        password,
      });
      console.log("data", data);

      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleProvider = async (provider) => {
  //   toast.loading(`Connecting to ${provider}...`, { id: "oauth" });
  //   await new Promise((r) => setTimeout(r, 900));
  //   toast.success(`${provider} sign-up complete`, { id: "oauth" });
  //   onSignup?.({
  //     name: provider,
  //     email: `${provider.toLowerCase()}@example.com`,
  //   });
  // };

  return (
    <>
      <Navbar state="signup" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Toaster position="top-center" />

        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 mb-3">
                <FiUserPlus className="text-indigo-400 text-2xl" />
              </div>
              <h1 className="text-white text-2xl font-semibold tracking-tight">
                Create account
              </h1>
              <p className="text-slate-300 text-sm mt-1">Resume Builder</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-slate-200 text-sm mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-200 text-sm mb-1">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-slate-200 text-sm mb-1">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-slate-200 text-sm mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-medium shadow-lg shadow-indigo-900/30 transition">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-transparent animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <>
                    <FiUserPlus />
                    Sign up
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-slate-400">or sign up with</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Providers */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleProvider("GitHub")}
                  className="inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-100 hover:bg-slate-900 transition">
                  <FiGithub /> GitHub
                </button>
                <button
                  type="button"
                  onClick={() => handleProvider("Google")}
                  className="inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-100 hover:bg-slate-900 transition">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-white/40 text-[10px]">
                    G
                  </span>
                  Google
                </button>
              </div>

              <p className="flex justify-center items-center text-slate-300 text-sm">
                Already have an account?
                <button className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 ml-1">
                  <FiUser /> <Link to={"/login"}>Sign in</Link>
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
