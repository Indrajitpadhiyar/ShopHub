// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Package,
    LogOut,
    Shield,
    Home,
    User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/user.Action";
import ProfileSettings from "../layouts/ProfileSettings";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.user);

    const [activeSection, setActiveSection] = useState("profile");

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    const isAdmin = user?.role === "admin";

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const navItems = [
        { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },
        { id: "profile", label: "Profile Settings", icon: <User size={20} /> },
        { id: "orders", label: "My Orders", icon: <Package size={20} /> },
        ...(isAdmin ? [{ id: "admin", label: "Admin Dashboard", icon: <Shield size={20} /> }] : []),
    ];

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.15 },
        },
    };
    const child = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
    };
    const avatarHover = { scale: 1.12, rotate: 6, transition: { type: "spring", stiffness: 400 } };

    const OrdersSection = () => (
        <motion.div variants={child} className="space-y-4">
            <h3 className="text-xl font-semibold text-orange-900">Recent Orders</h3>
            {[
                { id: "ORD123", date: "Oct 28, 2025", total: "₹2,499", status: "Delivered" },
                { id: "ORD124", date: "Oct 15, 2025", total: "₹1,299", status: "Shipped" },
            ].map((o, i) => (
                <motion.div
                    key={o.id}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(251,146,60,.1)" }}
                    className="flex items-center justify-between rounded-lg border border-orange-200 p-4 transition"
                >
                    <div>
                        <p className="font-medium text-orange-900">#{o.id}</p>
                        <p className="text-sm text-orange-600">{o.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-orange-900">{o.total}</p>
                        <p className={`text-sm font-medium ${o.status === "Delivered" ? "text-green-600" : "text-orange-600"}`}>
                            {o.status}
                        </p>
                    </div>
                </motion.div>
            ))}
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/profile/orders")}
                className="w-full rounded-lg border border-orange-500 py-2 text-orange-600 hover:bg-orange-50 font-medium"
            >
                View All Orders
            </motion.button>
        </motion.div>
    );

    const AdminDashboard = () => (
        <motion.div variants={child} className="space-y-6">
            <h3 className="text-xl font-semibold text-orange-900">Admin Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                    { val: 24, label: "Total Orders", color: "orange" },
                    { val: 18, label: "Completed", color: "green" },
                    { val: 4, label: "Pending", color: "yellow" },
                    { val: 2, label: "Cancelled", color: "red" },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                        className={`rounded-lg bg-${s.color}-50 p-4 text-center border border-${s.color}-200`}
                    >
                        <p className={`text-2xl font-bold text-${s.color}-600`}>{s.val}</p>
                        <p className={`text-sm text-${s.color}-700`}>{s.label}</p>
                    </motion.div>
                ))}
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin/dashboard")}
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-2 text-white shadow-md"
            >
                Open Full Dashboard
            </motion.button>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50"
        >
            <motion.header
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white/80 backdrop-blur-sm shadow-sm py-4 text-center"
            >
                <h1 className="text-2xl lg:text-3xl font-bold text-orange-800">My Account</h1>
                <p className="text-sm text-orange-600">Manage everything in one place</p>
            </motion.header>

            <div className="flex flex-1 flex-col lg:flex-row">
                <motion.aside
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="w-full bg-white shadow-xl lg:w-80 lg:border-r lg:border-orange-100"
                >
                    <motion.div
                        variants={child}
                        className="flex flex-col items-center p-6 border-b border-orange-100"
                    >
                        <motion.div variants={avatarHover} whileHover="hover">
                            {user?.avatar?.url ? (
                                <img
                                    src={user.avatar.url}
                                    alt={user.name}
                                    className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-orange-100"
                                />
                            ) : (
                                <UserAvatar user={user} size="h-20 w-20" textSize="text-4xl" />
                            )}
                        </motion.div>
                        <h2 className="mt-3 text-lg font-semibold text-orange-900">{user?.name}</h2>
                        <p className="text-sm text-orange-600">{user?.email}</p>
                        {isAdmin && (
                            <span className="mt-2 flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                                <Shield size={14} /> Admin
                            </span>
                        )}
                    </motion.div>

                    <nav className="flex-1 space-y-1 p-4">
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <NavItem
                                    icon={item.icon}
                                    label={item.label}
                                    active={activeSection === item.id}
                                    onClick={() => {
                                        if (item.href) navigate(item.href);
                                        else if (item.id !== "home") setActiveSection(item.id);
                                    }}
                                />
                            </motion.div>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05, x: 6 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                            <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                <LogOut size={20} />
                            </motion.div>
                            <span className="font-medium">Logout</span>
                        </motion.button>
                    </nav>
                </motion.aside>

                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4 lg:p-8">
                    <motion.div variants={container} initial="hidden" animate="visible" className="mx-auto max-w-4xl">
                        <AnimatePresence mode="wait">
                            {activeSection === "profile" && (
                                <motion.section
                                    key="profile"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="p-6 bg-white rounded-xl shadow-xl border border-orange-100"
                                >
                                    <ProfileSettings
                                        user={user}
                                        onSave={(data) => {
                                            // TODO: dispatch update profile action
                                            console.log("Profile saved:", data);
                                        }}
                                        onCancel={() => {
                                            console.log("Edit cancelled");
                                        }}
                                    />
                                </motion.section>
                            )}
                            {activeSection === "orders" && (
                                <motion.section
                                    key="orders"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="p-6 bg-white rounded-xl shadow-xl border border-orange-100"
                                >
                                    <OrdersSection />
                                </motion.section>
                            )}
                            {activeSection === "admin" && isAdmin && (
                                <motion.section
                                    key="admin"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="p-6 bg-white rounded-xl shadow-xl border border-orange-100"
                                >
                                    <AdminDashboard />
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </main>
            </div>
        </motion.div>
    );
};

const UserAvatar = ({ user, size = "h-24 w-24", textSize = "text-3xl" }) => {
    if (user?.avatar?.url)
        return (
            <img src={user.avatar.url} alt={user.name} className={`${size} rounded-full object-cover shadow-lg ring-4 ring-orange-100`} />
        );

    const letter = user?.name?.charAt(0).toUpperCase() || "U";
    const colors = {
        A: "bg-orange-500", B: "bg-amber-500", C: "bg-yellow-500", D: "bg-orange-600",
        E: "bg-red-500", F: "bg-pink-500", G: "bg-rose-500", H: "bg-orange-400",
        I: "bg-amber-600", J: "bg-yellow-600", K: "bg-orange-700", L: "bg-amber-700",
        M: "bg-yellow-700", N: "bg-orange-300", O: "bg-amber-300", P: "bg-yellow-300",
        Q: "bg-red-400", R: "bg-pink-400", S: "bg-rose-400", T: "bg-orange-200",
        U: "bg-amber-200", V: "bg-yellow-200", W: "bg-orange-100", X: "bg-amber-100",
        Y: "bg-yellow-100", Z: "bg-gray-400",
    };
    const bg = colors[letter] || "bg-orange-500";

    return (
        <div className={`${size} ${bg} rounded-full flex items-center justify-center text-white font-bold ${textSize} shadow-lg ring-4 ring-orange-50`}>
            {letter}
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }) => {
    const base = "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition font-medium text-sm lg:text-base";
    const cls = active
        ? `${base} bg-orange-100 text-orange-700 border border-orange-200`
        : `${base} text-orange-700 hover:bg-orange-50 border border-transparent`;

    return (
        <motion.div
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`${cls} cursor-pointer`}
        >
            {icon}
            <span>{label}</span>
        </motion.div>
    );
};

export default Profile;