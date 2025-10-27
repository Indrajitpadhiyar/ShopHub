import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
// import { login } from "../../actions/auth.action"; 
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [floatingShapes, setFloatingShapes] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle floating shapes animation
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

  // Handle navigation after successful login and display errors
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     toast.success("Login successful!");
  //     navigate("/addToCart"); // Redirect to cart page after login
  //   }
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [isAuthenticated, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // Dispatch login action
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background shapes */}
      {floatingShapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            background:
              shape.id % 3 === 0
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : shape.id % 3 === 1
                  ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                  : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            animation: `float ${shape.duration}s ease-in-out ${shape.delay}s infinite`,
          }}
        />
      ))}

      {/* Login card */}
      <div className="relative w-full max-w-md z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div
            className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          {/* Content */}
          <div className="relative">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                <img src="/bagifyLogo.png" className="rounded" alt="Bagify Logo" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-500">Please sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email input */}
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
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password input */}
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
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
                  />
                  <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                
                className="w-full py-3.5 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <span>{"Sign In"}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm font-medium">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Google", color: "from-red-500 to-orange-500" },
                { name: "GitHub", color: "from-gray-700 to-gray-900" },
                { name: "Apple", color: "from-gray-800 to-black" },
              ].map((social) => (
                <button
                  key={social.name}
                  className={`py-3 bg-gradient-to-br ${social.color} text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
                >
                  {social.name}
                </button>
              ))}
            </div>

            {/* Sign up link */}
            <p className="text-center text-gray-600 text-sm mt-8">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, -10px) rotate(5deg);
          }
          50% {
            transform: translate(-5px, 5px) rotate(-5deg);
          }
          75% {
            transform: translate(-10px, -5px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;