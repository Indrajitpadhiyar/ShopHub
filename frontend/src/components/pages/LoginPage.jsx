import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { clearErrors, login } from "../../actions/user.action";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [floatingShapes, setFloatingShapes] = useState([]);

  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user || {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const shapes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
    }));
    setFloatingShapes(shapes);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };


  useEffect(() => {
    if (isAuthenticated) {
      const redirect = localStorage.getItem("redirectAfterLogin") || "/";
      navigate(redirect, { replace: true });
      localStorage.removeItem("redirectAfterLogin");

      if (rememberMe) localStorage.setItem("rememberedEmail", email);
      else localStorage.removeItem("rememberedEmail");
    }
  }, [isAuthenticated, navigate, email, rememberMe]);

  // ---------- save current path ----------
  useEffect(() => {
    const full = window.location.pathname + window.location.search;
    if (!full.includes("/login")) {
      localStorage.setItem("redirectAfterLogin", full);
    }
  }, []);

  // ---------- error toast ----------
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* floating shapes */}
      {floatingShapes.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background:
              s.id % 3 === 0
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : s.id % 3 === 1
                  ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                  : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            animation: `float ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* card */}
      <div className="relative w-full max-w-md z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
          {/* decorative blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div
            className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative">
            {/* header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                <img
                  src="/bagifyLogo.png"
                  className="w-10 h-10 rounded"
                  alt="Bagify Logo"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-500">Please sign in to your account</p>
            </div>

            {/* form */}
            <form onSubmit={loginSubmit} className="space-y-5">
              {/* email */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              {/* password */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* remember + forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all disabled:opacity-50"
                  />
                  <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => navigate("/forgot-password")}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing In…</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* social divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm font-medium">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* social buttons (add real URLs) */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  name: "Google",
                  color: "from-red-500 to-orange-500",
                  // href: `${process.env.REACT_APP_API_URL}/auth/google`,
                },
                {
                  name: "GitHub",
                  color: "from-gray-700 to-gray-900",
                  // href: `${process.env.REACT_APP_API_URL}/auth/github`,
                },
                {
                  name: "Apple",
                  color: "from-gray-800 to-black",
                  // href: `${process.env.REACT_APP_API_URL}/auth/apple`,
                },
              ].map((s) => (
                <button
                  key={s.name}
                  type="button"
                  disabled={loading}
                  onClick={() => (window.location.href = s.href)}
                  className={`py-3 bg-gradient-to-br ${s.color} text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* sign-up */}
            <p className="text-center text-gray-600 text-sm mt-8">
              Don't have an account?{" "}
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors disabled:opacity-50"
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* toast container */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
        }}
      />
    </div>
  );
};

export default LoginPage;