import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiGithub,
  FiUserPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";

// Tailwind + react-icons + react-hot-toast login component
// Drop this into your app and render <Login onLogin={(user)=>...} />
// Make sure you've installed deps: `npm i react-hot-toast react-icons`

const validateEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const { axios, user, setUser, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleProvider = async (provider) => {
  //   toast.loading(`Connecting to ${provider}...`, { id: "oauth" });
  //   // Simulate
  //   await new Promise((r) => setTimeout(r, 900));
  //   toast.success(`${provider} sign-in complete`, { id: "oauth" });
  //   onLogin?.({ email: `${provider.toLowerCase()}@example.com` });
  // };

  return (
    <>
      <Navbar state="login" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Toaster position="top-center" />

        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    autoComplete="current-password"
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

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    className="rounded-md bg-slate-900/60 border-white/10"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => toast("Password reset link sent (demo)")}
                  className="text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-medium shadow-lg shadow-indigo-900/30 transition">
                {loading ? (
                  <Spinner size={"small"} color={"white"} />
                ) : (
                  <>
                    <FiLogIn />
                    Sign in
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-slate-400">or continue with</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

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
                  {/* Simple Google G using a circle */}
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-white/40 text-[10px]">
                    G
                  </span>
                  Google
                </button>
              </div>

              <p className="text-center flex items-center justify-center text-slate-300 text-sm">
                New here?
                <button className="inline-flex items-center gap-1 cursor-pointer text-indigo-400 hover:text-indigo-300 ml-1">
                  <FiUserPlus /> <Link to={"/signup"}>Create an account</Link>
                </button>
              </p>
            </form>

            <p className="text-[11px] text-slate-400 text-center mt-6">
              Demo: <span className="text-slate-200">user@demo.dev</span> /{" "}
              <span className="text-slate-200">secret123</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
