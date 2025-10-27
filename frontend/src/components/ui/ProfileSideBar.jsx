import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Settings,
    Heart,
    ShoppingBag,
    LogOut,
    Menu,
    X,
    Home,
    Package,
    Bell,
} from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux';

const ProfileSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('profile');
    const dispatch = useDispatch();

    // Get user from Redux store - adjust the path based on your store structure
    const user = useSelector((state) => state.auth?.user || state.user);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .trim()
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    // ... rest of your code remains the same
    const menuItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'cart', label: 'Cart', icon: ShoppingBag },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const sidebarVariants = {
        open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    };

    const itemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -20 },
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {(isOpen || window.innerWidth >= 1024) && (
                    <motion.aside
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        className="fixed lg:relative top-0 left-0 h-screen w-72 bg-white dark:bg-gray-900 shadow-2xl z-40 flex flex-col"
                    >
                        {/* User Profile Section */}
                        <div className="p-6 border-b dark:border-gray-700">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center space-x-4"
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    {user?.profilePic ? (
                                        <img
                                            src={user.profilePic}
                                            alt="Profile"
                                            className="w-14 h-14 rounded-full object-cover ring-4 ring-white dark:ring-gray-900 shadow-md"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {getInitials(user?.name)}
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                                        {user?.name || 'Guest User'}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email || 'guest@example.com'}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                            {menuItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.button
                                        key={item.id}
                                        variants={itemVariants}
                                        initial="closed"
                                        animate="open"
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setActiveItem(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${activeItem === item.id
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 transition-transform duration-200 ${activeItem === item.id ? 'scale-110' : 'group-hover:scale-110'
                                                }`}
                                        />
                                        <span className="font-medium">{item.label}</span>

                                        {/* Active Indicator */}
                                        {activeItem === item.id && (
                                            <motion.div
                                                layoutId="activeSidebarIndicator"
                                                className="absolute right-0 w-1 h-10 bg-blue-600 rounded-l-full"
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </nav>

                        {/* Logout Button */}
                        <div className="p-4 border-t dark:border-gray-700">
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                            >
                                <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span className="font-medium">Logout</span>
                            </motion.button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                />
            )}
        </>
    );
};

export default ProfileSideBar;