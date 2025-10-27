import React from "react";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

const ProfileIcon = () => {
    const userState = useSelector((state) => state?.user);
    const isAuthenticated = userState?.isAuthenticated || false;
    const user = userState?.user || null;

    return (
        <div className="flex items-center gap-2 cursor-pointer">
            <User className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            {isAuthenticated && user ? (
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {user.name}
                </span>
            ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">Guest</span>
            )}
        </div>
    );
};

export default ProfileIcon;
