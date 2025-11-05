// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Camera, Package, Settings, LogOut, Shield, Edit2, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/user.Action";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.user);

    // Local edit state
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
    const [activeTab, setActiveTab] = useState("profile");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // Update local state when user data changes
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setAvatarPreview(user.avatar?.url || "");
        }
    }, [user]);

    // User Avatar Component
    const UserAvatar = ({ user, size = "h-24 w-24", textSize = "text-3xl" }) => {
        if (user?.avatar?.url) {
            return (
                <img
                    src={user.avatar.url}
                    alt={user.name}
                    className={`${size} rounded-full object-cover shadow-lg ring-4 ring-orange-100`}
                />
            );
        }

        const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

        const getColorClass = (letter) => {
            const colors = {
                'A': 'bg-orange-500', 'B': 'bg-amber-500', 'C': 'bg-yellow-500', 'D': 'bg-orange-600',
                'E': 'bg-red-500', 'F': 'bg-pink-500', 'G': 'bg-rose-500', 'H': 'bg-orange-400',
                'I': 'bg-amber-600', 'J': 'bg-yellow-600', 'K': 'bg-orange-700', 'L': 'bg-amber-700',
                'M': 'bg-yellow-700', 'N': 'bg-orange-300', 'O': 'bg-amber-300', 'P': 'bg-yellow-300',
                'Q': 'bg-red-400', 'R': 'bg-pink-400', 'S': 'bg-rose-400', 'T': 'bg-orange-200',
                'U': 'bg-amber-200', 'V': 'bg-yellow-200', 'W': 'bg-orange-100', 'X': 'bg-amber-100',
                'Y': 'bg-yellow-100', 'Z': 'bg-gray-400'
            };
            return colors[letter] || 'bg-orange-500';
        };

        const colorClass = getColorClass(firstLetter);

        return (
            <div className={`${size} ${colorClass} rounded-full flex items-center justify-center text-white font-bold ${textSize} shadow-lg ring-4 ring-orange-50`}>
                {firstLetter}
            </div>
        );
    };

    // Avatar change handler
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // TODO: dispatch updateProfile({ name, email, avatarFile })
        setIsEditing(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const isAdmin = user?.role === "admin";

    // Navigation Items
    const navItems = [
        { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },
        { id: "profile", label: "Profile Settings", icon: <User size={20} /> },
        { id: "orders", label: "My Orders", icon: <Package size={20} />, href: "/profile/orders" },
        ...(isAdmin ? [{ id: "admin", label: "Admin Dashboard", icon: <Shield size={20} />, href: "/admin/dashboard" }] : []),
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-4 lg:py-8 px-4">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-6 lg:mb-8 text-center">
                    <h1 className="text-2xl lg:text-4xl font-bold text-orange-800">My Account</h1>
                    <p className="text-orange-600 mt-1 text-sm lg:text-base">Manage your profile, orders, and settings</p>
                </div>

                <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
                    {/* Left Sidebar - Navigation */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl bg-white p-4 lg:p-6 shadow-xl border border-orange-100">
                            <div className="flex flex-col items-center">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt={user?.name}
                                        className="h-20 w-20 lg:h-24 lg:w-24 rounded-full object-cover shadow-md ring-4 ring-orange-100"
                                    />
                                ) : (
                                    <UserAvatar
                                        user={user}
                                        size="h-20 w-20 lg:h-24 lg:w-24"
                                        textSize="text-3xl lg:text-5xl"
                                    />
                                )}
                                <h2 className="mt-3 lg:mt-4 text-lg lg:text-xl font-semibold text-orange-900 truncate max-w-full text-center">
                                    {user?.name}
                                </h2>
                                <p className="text-xs lg:text-sm text-orange-600 truncate max-w-full text-center">
                                    {user?.email}
                                </p>
                                {isAdmin && (
                                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                                        <Shield size={14} />
                                        Admin
                                    </span>
                                )}
                            </div>

                            <nav className="mt-6 lg:mt-8 space-y-2">
                                {navItems.map((item) => (
                                    <NavItem
                                        key={item.id}
                                        icon={item.icon}
                                        label={item.label}
                                        href={item.href}
                                        active={activeTab === item.id}
                                        onClick={() => !item.href && setActiveTab(item.id)}
                                    />
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Profile Settings */}
                        <div className="rounded-xl bg-white p-4 lg:p-6 shadow-xl border border-orange-100 mb-6 lg:mb-8">
                            <div className="flex items-center justify-between mb-4 lg:mb-6">
                                <h3 className="text-xl lg:text-2xl font-semibold text-orange-900">Profile Settings</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-3 lg:px-4 py-2 text-white transition hover:from-orange-600 hover:to-orange-700 text-sm lg:text-base shadow-md"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3 lg:px-4 py-2 text-white hover:from-green-600 hover:to-green-700 text-sm lg:text-base shadow-md"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setName(user?.name || "");
                                                setEmail(user?.email || "");
                                                setAvatarPreview(user?.avatar?.url || "");
                                            }}
                                            className="rounded-lg border border-orange-300 px-3 lg:px-4 py-2 text-orange-700 hover:bg-orange-50 text-sm lg:text-base"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Avatar Upload */}
                            <div className="mb-6 lg:mb-8 text-center">
                                <div className="relative inline-block">
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar"
                                            className="h-24 w-24 lg:h-32 lg:w-32 rounded-full object-cover shadow-lg ring-4 ring-orange-100"
                                        />
                                    ) : (
                                        <UserAvatar
                                            user={user}
                                            size="h-24 w-24 lg:h-32 lg:w-32"
                                            textSize="text-3xl lg:text-5xl"
                                        />
                                    )}
                                    {isEditing && (
                                        <label
                                            htmlFor="avatar-upload"
                                            className="absolute bottom-0 right-0 flex h-8 w-8 lg:h-10 lg:w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-orange-700"
                                        >
                                            <Camera size={16} />
                                            <input
                                                id="avatar-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAvatarChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4 lg:space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-orange-800">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={!isEditing}
                                        className={`mt-1 w-full rounded-lg border px-3 lg:px-4 py-2 text-sm lg:text-base transition ${isEditing
                                                ? "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                                                : "border-gray-200 bg-orange-50 text-orange-700"
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-orange-800">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing}
                                        className={`mt-1 w-full rounded-lg border px-3 lg:px-4 py-2 text-sm lg:text-base transition ${isEditing
                                                ? "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                                                : "border-gray-200 bg-orange-50 text-orange-700"
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-orange-800">Role</label>
                                    <input
                                        type="text"
                                        value={user?.role || "user"}
                                        disabled
                                        className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50 px-3 lg:px-4 py-2 text-sm lg:text-base text-orange-700"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-orange-800">Member Since</label>
                                    <input
                                        type="text"
                                        value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                                        disabled
                                        className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50 px-3 lg:px-4 py-2 text-sm lg:text-base text-orange-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders Preview */}
                        <div className="rounded-xl bg-white p-4 lg:p-6 shadow-xl border border-orange-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-orange-900">Recent Orders</h3>
                                <button
                                    onClick={() => navigate("/profile/orders")}
                                    className="text-orange-600 hover:text-orange-700 text-sm lg:text-base font-medium"
                                >
                                    View All
                                </button>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { id: "ORD123", date: "Oct 28, 2025", total: "₹2,499", status: "Delivered" },
                                    { id: "ORD124", date: "Oct 15, 2025", total: "₹1,299", status: "Shipped" },
                                ].map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between rounded-lg border border-orange-200 p-3 lg:p-4 hover:bg-orange-50 transition"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-orange-900 truncate">#{order.id}</p>
                                            <p className="text-xs lg:text-sm text-orange-600">{order.date}</p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="font-semibold text-orange-900 text-sm lg:text-base">{order.total}</p>
                                            <p
                                                className={`text-xs lg:text-sm font-medium ${order.status === "Delivered" ? "text-green-600" : "text-orange-600"
                                                    }`}
                                            >
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate("/profile/orders")}
                                className="mt-4 w-full rounded-lg border border-orange-500 py-2 text-orange-600 hover:bg-orange-50 font-medium text-sm lg:text-base transition"
                            >
                                View All Orders →
                            </button>
                        </div>

                        {/* Admin Stats (Only for Admin) */}
                        {isAdmin && (
                            <div className="mt-6 lg:mt-8 rounded-xl bg-white p-4 lg:p-6 shadow-xl border border-orange-100">
                                <h3 className="text-xl font-semibold text-orange-900 mb-4">Admin Quick Stats</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                                        <p className="text-2xl font-bold text-orange-600">24</p>
                                        <p className="text-sm text-orange-700">Total Orders</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                                        <p className="text-2xl font-bold text-green-600">18</p>
                                        <p className="text-sm text-green-700">Completed</p>
                                    </div>
                                    <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
                                        <p className="text-2xl font-bold text-yellow-600">4</p>
                                        <p className="text-sm text-yellow-700">Pending</p>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                                        <p className="text-2xl font-bold text-red-600">2</p>
                                        <p className="text-sm text-red-700">Cancelled</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate("/admin/dashboard")}
                                    className="mt-4 w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-2 text-white hover:from-orange-600 hover:to-orange-700 font-medium text-sm lg:text-base shadow-md transition"
                                >
                                    Go to Admin Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, href, active, onClick }) => {
    const className = active
        ? "bg-orange-100 text-orange-700 border border-orange-200"
        : "text-orange-700 hover:bg-orange-50 border border-transparent";

    const content = (
        <div
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${className} cursor-pointer font-medium text-sm lg:text-base`}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </div>
    );

    return href ? (
        <a href={href} className="block">
            {content}
        </a>
    ) : (
        content
    );
};

export default Profile;