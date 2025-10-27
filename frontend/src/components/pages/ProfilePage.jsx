import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ProfileSideBar from "../ui/ProfileSideBar";
import ProfileDetails from "../ui/ProfileDetails";

const ProfilePage = () => {
    const profileState = useSelector((state) => state.profile) || {};
    const { user, loading } = profileState;
    const isLoggedIn = user && !loading;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex">
            <div className="w-full md:w-80 bg-gray-900 text-white flex flex-col">
                <ProfileSideBar />
            </div>

            <div className="flex-1 bg-white flex items-center justify-center p-6 md:p-12">
                {isLoggedIn ? (
                    <ProfileDetails />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                            Profile
                        </h2>
                        <p className="text-gray-600">You are not logged in. Please log in to view your profile.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;