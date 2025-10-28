import React from "react";
import { useSelector } from "react-redux";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileIcon = () => {
  const navigate = useNavigate();

  // SAFELY get user state
  const userState = useSelector((state) => state.user) || {};
  const { isAuthenticated = false, user = null } = userState;

//   console.log("ProfileIcon Debug:", { isAuthenticated, user }); // DEBUG LINE

  // Get initials safely
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "G";
    return name
      .trim()
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105 select-none"
    >
      {/* Avatar */}
      <div className="relative">
        {isAuthenticated && user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt={user.name || "User"}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Fallback: Initials */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-all ${
            isAuthenticated
              ? "bg-gradient-to-br from-blue-500 to-purple-600"
              : "bg-gradient-to-br from-gray-400 to-gray-600"
          } group-hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-400`}
          style={{
            display:
              isAuthenticated && user?.avatar?.url ? "none" : "flex",
          }}
        >
          {isAuthenticated && user?.name
            ? getInitials(user.name)
            : "G"}
        </div>

        {/* Online Dot */}
        {isAuthenticated && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm animate-pulse"></span>
        )}
      </div>

      {/* Name + Status */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
          {isAuthenticated && user?.name
            ? user.name.split(" ")[0]
            : "Guest"}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          {isAuthenticated ? (
            "Welcome back"
          ) : (
            <>
              <LogIn className="w-3 h-3" />
              Sign in
            </>
          )}
        </span>
      </div>

      {/* Arrow */}
      <svg
        className="w-4 h-4 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

export default ProfileIcon;