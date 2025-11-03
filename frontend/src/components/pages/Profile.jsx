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

    // User Avatar Component - Directly in Profile
    const UserAvatar = ({ user, size = "h-24 w-24", textSize = "text-3xl" }) => {
        if (user?.avatar?.url) {
            return (
                <img
                    src={user.avatar.url}
                    alt={user.name}
                    className={`${size} rounded-full object-cover shadow-lg`}
                />
            );
        }

        // If no avatar, show first letter of name with different color
        const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

        // Different colors based on first letter for consistency
        const getColorClass = (letter) => {
            const colors = {
                'A': 'bg-red-500', 'B': 'bg-blue-500', 'C': 'bg-green-500', 'D': 'bg-yellow-500',
                'E': 'bg-purple-500', 'F': 'bg-pink-500', 'G': 'bg-indigo-500', 'H': 'bg-teal-500',
                'I': 'bg-orange-500', 'J': 'bg-red-600', 'K': 'bg-blue-600', 'L': 'bg-green-600',
                'M': 'bg-yellow-600', 'N': 'bg-purple-600', 'O': 'bg-pink-600', 'P': 'bg-indigo-600',
                'Q': 'bg-teal-600', 'R': 'bg-orange-600', 'S': 'bg-red-400', 'T': 'bg-blue-400',
                'U': 'bg-green-400', 'V': 'bg-yellow-400', 'W': 'bg-purple-400', 'X': 'bg-pink-400',
                'Y': 'bg-indigo-400', 'Z': 'bg-teal-400'
            };

            return colors[letter] || 'bg-gray-500';
        };

        const colorClass = getColorClass(firstLetter);

        return (
            <div className={`${size} ${colorClass} rounded-full flex items-center justify-center text-white font-bold ${textSize} shadow-lg`}>
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
                // TODO: dispatch updateAvatar action
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 lg:py-8 px-4">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-6 lg:mb-8 text-center">
                    <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">My Account</h1>
                    <p className="text-gray-600 mt-1 text-sm lg:text-base">Manage your profile, orders, and settings</p>
                </div>

                <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
                    {/* Left Sidebar - Navigation */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl bg-white p-4 lg:p-6 shadow-lg">
                            <div className="flex flex-col items-center">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt={user?.name}
                                        className="h-20 w-20 lg:h-24 lg:w-24 rounded-full object-cover shadow-md"
                                    />
                                ) : (
                                    <UserAvatar
                                        user={user}
                                        size="h-20 w-20 lg:h-24 lg:w-24"
                                        textSize="text-3xl lg:text-5xl"
                                    />
                                )}
                                <h2 className="mt-3 lg:mt-4 text-lg lg:text-xl font-semibold text-gray-800 truncate max-w-full text-center">
                                    {user?.name}
                                </h2>
                                <p className="text-xs lg:text-sm text-gray-500 truncate max-w-full text-center">
                                    {user?.email}
                                </p>
                                {isAdmin && (
                                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
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
                        <div className="rounded-xl bg-white p-4 lg:p-6 shadow-lg mb-6 lg:mb-8">
                            <div className="flex items-center justify-between mb-4 lg:mb-6">
                                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">Profile Settings</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 lg:px-4 py-2 text-white transition hover:bg-indigo-700 text-sm lg:text-base"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="rounded-lg bg-green-600 px-3 lg:px-4 py-2 text-white hover:bg-green-700 text-sm lg:text-base"
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
                                            className="rounded-lg border border-gray-300 px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm lg:text-base"
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
                                            className="h-24 w-24 lg:h-32 lg:w-32 rounded-full object-cover shadow-lg"
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
                                            className="absolute bottom-0 right-0 flex h-8 w-8 lg:h-10 lg:w-10 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
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
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={!isEditing}
                                        className={`mt-1 w-full rounded-lg border px-3 lg:px-4 py-2 text-sm lg:text-base ${isEditing
                                            ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                            : "border-gray-200 bg-gray-50"
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing}
                                        className={`mt-1 w-full rounded-lg border px-3 lg:px-4 py-2 text-sm lg:text-base ${isEditing
                                            ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                            : "border-gray-200 bg-gray-50"
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <input
                                        type="text"
                                        value={user?.role || "user"}
                                        disabled
                                        className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 lg:px-4 py-2 text-sm lg:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                                    <input
                                        type="text"
                                        value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                                        disabled
                                        className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 lg:px-4 py-2 text-sm lg:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders Preview */}
                        <div className="rounded-xl bg-white p-4 lg:p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
                                <button
                                    onClick={() => navigate("/profile/orders")}
                                    className="text-indigo-600 hover:text-indigo-700 text-sm lg:text-base"
                                >
                                    View All
                                </button>
                            </div>
                            <div className="space-y-3">
                                {/* Replace with real orders from API */}
                                {[
                                    { id: "ORD123", date: "Oct 28, 2025", total: "₹2,499", status: "Delivered" },
                                    { id: "ORD124", date: "Oct 15, 2025", total: "₹1,299", status: "Shipped" },
                                ].map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between rounded-lg border p-3 lg:p-4 hover:bg-gray-50"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 truncate">#{order.id}</p>
                                            <p className="text-xs lg:text-sm text-gray-500">{order.date}</p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="font-semibold text-gray-800 text-sm lg:text-base">{order.total}</p>
                                            <p
                                                className={`text-xs lg:text-sm font-medium ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"
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
                                className="mt-4 w-full rounded-lg border border-indigo-600 py-2 text-indigo-600 hover:bg-indigo-50 text-sm lg:text-base"
                            >
                                View All Orders →
                            </button>
                        </div>

                        {/* Admin Stats (Only for Admin) */}
                        {isAdmin && (
                            <div className="mt-6 lg:mt-8 rounded-xl bg-white p-4 lg:p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Admin Quick Stats</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-blue-600">24</p>
                                        <p className="text-sm text-blue-600">Total Orders</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-green-600">18</p>
                                        <p className="text-sm text-green-600">Completed</p>
                                    </div>
                                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-yellow-600">4</p>
                                        <p className="text-sm text-yellow-600">Pending</p>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-red-600">2</p>
                                        <p className="text-sm text-red-600">Cancelled</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate("/admin/dashboard")}
                                    className="mt-4 w-full rounded-lg bg-purple-600 py-2 text-white hover:bg-purple-700 text-sm lg:text-base"
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

// Reusable Nav Item
const NavItem = ({ icon, label, href, active, onClick }) => {
    const className = active
        ? "bg-indigo-50 text-indigo-700"
        : "text-gray-700 hover:bg-gray-100";

    const content = (
        <div
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${className} cursor-pointer`}
            onClick={onClick}
        >
            {icon}
            <span className="font-medium text-sm lg:text-base">{label}</span>
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