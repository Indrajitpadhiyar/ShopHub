import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    ArrowRight,
    Upload,
    X,
    Shield,
    Truck,
    CreditCard,
    Star,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { register, clearErrors } from "../../actions/user.action";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: null,
    });

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [orbs, setOrbs] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        const newOrbs = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 140 + 100,
            duration: Math.random() * 35 + 25,
            delay: Math.random() * -50,
            blur: Math.random() * 100 + 80,
            color:
                i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#3b82f6" : "#f59e0b",
        }));
        setOrbs(newOrbs);
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            toast.success("Welcome to ShopHub!");
            navigate("/", { replace: true });
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/"))
            return toast.error("Please select an image");
        if (file.size > 5 * 1024 * 1024)
            return toast.error("Image must be under 5MB");

        setFormData({ ...formData, avatar: file });
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setFormData({ ...formData, avatar: null });
        setAvatarPreview(null);
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords don't match");
        }
        if (!termsAccepted) {
            return toast.error("Please accept terms & privacy");
        }

        const myForm = new FormData();
        myForm.append("name", formData.fullName);      // ← SEND "name"
        myForm.append("email", formData.email);
        myForm.append("password", formData.password);
        if (formData.avatar) myForm.append("avatar", formData.avatar);

        dispatch(register(myForm));
    };

    return (
        <>
            <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
                {orbs.map((orb) => (
                    <div
                        key={orb.id}
                        className="absolute rounded-full opacity-15 pointer-events-none animate-float"
                        style={{
                            left: `${orb.x}%`,
                            top: `${orb.y}%`,
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            background: `radial-gradient(circle, ${orb.color}, transparent)`,
                            filter: `blur(${orb.blur}px)`,
                            animationDelay: `${orb.delay}s`,
                            animationDuration: `${orb.duration}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative flex items-center justify-center p-4 lg:p-6 min-h-screen">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                        <div className="hidden lg:flex flex-col justify-center h-full animate-fadeIn">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-3xl blur-3xl animate-pulse" />
                                <div className="relative bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/30">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-2 14H5L3 3z" />
                                            </svg>
                                        </div>
                                        <h1 className="text-3xl font-bold text-gray-800">ShopHub</h1>
                                    </div>

                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                                        Shop Smarter, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Save Bigger</span>
                                    </h2>

                                    <p className="text-base lg:text-lg text-gray-600 mb-6">
                                        Join 2M+ happy shoppers. Get exclusive deals, fast delivery, and secure payments.
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {[
                                            { icon: Shield, text: "100% Secure" },
                                            { icon: Truck, text: "Free Delivery" },
                                            { icon: CreditCard, text: "Easy Returns" },
                                            { icon: Star, text: "4.8/5 Rating" },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2 bg-white/70 backdrop-blur p-3 rounded-xl shadow-md animate-slideIn"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            >
                                                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                                    <item.icon className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-gradient-to-br from-gray-300 to-gray-400" />
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-700">2M+ Happy Customers</p>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full animate-slideUp">
                            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-5 sm:p-6 lg:p-8 border border-white/30 relative overflow-hidden">
                                <div className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

                                <div className="relative z-10">
                                    <div className="lg:hidden text-center mb-6">
                                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-xl mb-3 mx-auto">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-2 14H5L3 3z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                                        <p className="text-xs text-gray-600 mt-1">Join ShopHub & Start Saving!</p>
                                    </div>

                                    <form onSubmit={registerSubmit} className="space-y-5">
                                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100">
                                            <label className="block text-xs font-semibold text-gray-700 mb-2">Profile Picture (Optional)</label>
                                            <div className="flex items-center gap-3">
                                                <div className="relative group">
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center overflow-hidden border-3 border-white shadow-lg ring-3 ring-emerald-100/50 transition-all group-hover:ring-emerald-300">
                                                        {avatarPreview ? (
                                                            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <User className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
                                                        )}
                                                    </div>
                                                    {avatarPreview && (
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            disabled={loading}
                                                            className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transform hover:scale-110 transition-all text-xs"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </div>

                                                <label className="flex-1">
                                                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-emerald-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group text-xs">
                                                        <Upload className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
                                                        <span className="font-medium text-emerald-700 group-hover:text-emerald-900">
                                                            {avatarPreview ? "Change" : "Upload"}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        disabled={loading}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-emerald-600 mt-1 text-center">Max 5MB • JPG, PNG</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="group">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-all" />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="John Doe"
                                                        required
                                                        disabled={loading}
                                                        className="w-full pl-10 pr-3 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-gray-800 placeholder-emerald-300 focus:outline-none focus:ring-3 focus:ring-emerald-300 focus:border-emerald-500 transition-all disabled:opacity-60 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="group">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-all" />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="john@example.com"
                                                        required
                                                        disabled={loading}
                                                        className="w-full pl-10 pr-3 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-gray-800 placeholder-emerald-300 focus:outline-none focus:ring-3 focus:ring-emerald-300 focus:border-emerald-500 transition-all disabled:opacity-60 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div className="group">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-all" />
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="••••••••"
                                                        required
                                                        disabled={loading}
                                                        className="w-full pl-10 pr-10 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-gray-800 placeholder-emerald-300 focus:outline-none focus:ring-3 focus:ring-emerald-300 focus:border-emerald-500 transition-all disabled:opacity-60 text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        disabled={loading}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-600 transition-all hover:scale-110"
                                                    >
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="group">
                                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 group-hover:text-emerald-600 transition-all" />
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        placeholder="••••••••"
                                                        required
                                                        disabled={loading}
                                                        className="w-full pl-10 pr-10 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl text-gray-800 placeholder-emerald-300 focus:outline-none focus:ring-3 focus:ring-emerald-300 focus:border-emerald-500 transition-all disabled:opacity-60 text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        disabled={loading}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-600 transition-all hover:scale-110"
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <input
                                                type="checkbox"
                                                checked={termsAccepted}
                                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                                disabled={loading}
                                                className="w-4 h-4 mt-0.5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <label className="text-xs text-gray-600">
                                                I agree to the{" "}
                                                <a href="#" className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors">
                                                    Terms
                                                </a>{" "}
                                                and{" "}
                                                <a href="#" className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors">
                                                    Privacy
                                                </a>
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={
                                                loading ||
                                                !formData.name ||
                                                !formData.email ||
                                                !formData.password ||
                                                !formData.confirmPassword ||
                                                !termsAccepted
                                            }
                                            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-base rounded-xl shadow-xl hover:shadow-emerald-500/50 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    <span>Creating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Join ShopHub</span>
                                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="flex items-center gap-3 my-6">
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                                        <span className="text-emerald-600 font-medium text-xs">OR</span>
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { name: "Google", gradient: "from-red-500 to-orange-500" },
                                            { name: "Facebook", gradient: "from-blue-600 to-blue-800" },
                                            { name: "Apple", gradient: "from-gray-900 to-black" },
                                        ].map((social) => (
                                            <button
                                                key={social.name}
                                                disabled={loading}
                                                className={`py-2.5 bg-gradient-to-br ${social.gradient} text-white font-medium rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:scale-100 text-xs`}
                                            >
                                                {social.name}
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-center mt-6 text-gray-600 text-xs">
                                        Already have an account?{" "}
                                        <a href="/login" className="text-emerald-600 font-bold hover:text-emerald-800 transition-colors">
                                            Sign in
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(8deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
          75% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-float { animation: float linear infinite; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.7s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.5s ease-out forwards; }
      `}</style>
        </>
    );
};

export default RegisterPage;