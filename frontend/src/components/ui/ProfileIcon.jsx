import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth.action";

const ProfileIcon = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleMenuItemClick = (path) => {
        setDropdownOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
        navigate("/");
    };

    // Generate initials from username
    const getInitials = (name) => {
        if (!name) return "U";
        const names = name.trim().split(" ");
        const initials = names
            .map((n) => n.charAt(0).toUpperCase())
            .slice(0, 2)
            .join("");
        return initials || "U";
    };

    return (
        <div
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => isAuthenticated && setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
        >
            {/* Profile Icon or Login Link */}
            <div
                onClick={() => !isAuthenticated && navigate("/login")}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
                {isAuthenticated ? (
                    user?.profilePic ? (
                        <img
                            src={user.profilePic}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600 hover:border-indigo-800 transition-all duration-200"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-base border-2 border-indigo-600 hover:border-indigo-800 transition-all duration-200">
                            {getInitials(user?.name)}
                        </div>
                    )
                ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 font-semibold transition-all duration-200">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Dropdown Menu (visible only when authenticated and dropdown is open) */}
            {isAuthenticated && (
                <div
                    className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-48 bg-white shadow-xl border border-gray-200 rounded-lg z-50 overflow-hidden ${dropdownOpen
                            ? "scale-100 opacity-100 translate-y-0 rotate-0"
                            : "scale-90 opacity-0 translate-y-4 -rotate-5"
                        } transition-all duration-300 ease-out origin-top`}
                >
                    <ul className="py-2">
                        <li
                            onClick={() => handleMenuItemClick("/profile")}
                            className="px-4 py-2 text-gray-800 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer transition-all duration-200 text-sm font-medium"
                        >
                            Profile
                        </li>
                        <li
                            onClick={() => handleMenuItemClick("/orders")}
                            className="px-4 py-2 text-gray-800 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer transition-all duration-200 text-sm font-medium"
                        >
                            Orders
                        </li>
                        <li
                            onClick={() => handleMenuItemClick("/wishlist")}
                            className="px-4 py-2 text-gray-800 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer transition-all duration-200 text-sm font-medium"
                        >
                            Wishlist
                        </li>
                        <li
                            onClick={handleLogout}
                            className="px-4 py-2 text-gray-800 hover:text-red-600 hover:bg-red-100 cursor-pointer transition-all duration-200 text-sm font-medium"
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;