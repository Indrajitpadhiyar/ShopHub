// src/components/ProfileSettings.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Edit2 } from "lucide-react";

const ProfileSettings = ({ user, onSave, onCancel }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");

    useEffect(() => {
        setName(user?.name || "");
        setEmail(user?.email || "");
        setAvatarPreview(user?.avatar?.url || "");
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave?.({ name, email, avatarFile: null });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setName(user?.name || "");
        setEmail(user?.email || "");
        setAvatarPreview(user?.avatar?.url || "");
        setIsEditing(false);
        onCancel?.();
    };

    const avatarHover = {
        scale: 1.12,
        rotate: 6,
        transition: { type: "spring", stiffness: 400 },
    };
    const btn = {
        tap: { scale: 0.95 },
        hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(249,115,22,.3)" },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="flex justify-center">
                <div className="relative inline-block">
                    <motion.div variants={avatarHover} whileHover="hover">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="avatar"
                                className="h-28 w-28 lg:h-36 lg:w-36 rounded-full object-cover shadow-xl ring-4 ring-orange-100"
                            />
                        ) : (
                            <UserAvatar user={user} size="h-28 w-28 lg:h-36 lg:w-36" textSize="text-5xl" />
                        )}
                    </motion.div>

                    <AnimatePresence>
                        {isEditing && (
                            <motion.label
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:from-orange-600 hover:to-orange-700"
                            >
                                <Camera size={18} />
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </motion.label>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {[
                    { label: "Full Name", value: name, set: setName, type: "text" },
                    { label: "Email Address", value: email, set: setEmail, type: "email" },
                    { label: "Role", value: user?.role || "user", disabled: true },
                    {
                        label: "Member Since",
                        value: user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "-",
                        disabled: true,
                    },
                ].map((f, i) => (
                    <motion.div
                        key={f.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <label className="block text-sm font-medium text-orange-800">
                            {f.label}
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type={f.type || "text"}
                            value={f.value}
                            onChange={(e) => f.set?.(e.target.value)}
                            disabled={f.disabled || !isEditing}
                            className={`mt-1 w-full rounded-lg border px-4 py-2 text-sm transition ${isEditing && !f.disabled
                                    ? "border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                                    : "border-gray-200 bg-orange-50 text-orange-700"
                                }`}
                        />
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center gap-3">
                <AnimatePresence mode="wait">
                    {!isEditing ? (
                        <motion.button
                            key="edit"
                            variants={btn}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2 text-white shadow-md"
                        >
                            <Edit2 size={16} /> Edit
                        </motion.button>
                    ) : (
                        <>
                            <motion.button
                                variants={btn}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleSave}
                                className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-5 py-2 text-white shadow-md"
                            >
                                Save
                            </motion.button>
                            <motion.button
                                variants={btn}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleCancel}
                                className="rounded-lg border border-orange-300 px-5 py-2 text-orange-700 hover:bg-orange-50"
                            >
                                Cancel
                            </motion.button>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const UserAvatar = ({ user, size = "h-24 w-24", textSize = "text-3xl" }) => {
    if (user?.avatar?.url)
        return (
            <img
                src={user.avatar.url}
                alt={user.name}
                className={`${size} rounded-full object-cover shadow-lg ring-4 ring-orange-100`}
            />
        );

    const letter = user?.name?.charAt(0).toUpperCase() || "U";
    const colors = {
        A: "bg-orange-500",
        B: "bg-amber-500",
        C: "bg-yellow-500",
        D: "bg-orange-600",
        E: "bg-red-500",
        F: "bg-pink-500",
        G: "bg-rose-500",
        H: "bg-orange-400",
        I: "bg-amber-600",
        J: "bg-yellow-600",
        K: "bg-orange-700",
        L: "bg-amber-700",
        M: "bg-yellow-700",
        N: "bg-orange-300",
        O: "bg-amber-300",
        P: "bg-yellow-300",
        Q: "bg-red-400",
        R: "bg-pink-400",
        S: "bg-rose-400",
        T: "bg-orange-200",
        U: "bg-amber-200",
        V: "bg-yellow-200",
        W: "bg-orange-100",
        X: "bg-amber-100",
        Y: "bg-yellow-100",
        Z: "bg-gray-400",
    };
    const bg = colors[letter] || "bg-orange-500";

    return (
        <div
            className={`${size} ${bg} rounded-full flex items-center justify-center text-white font-bold ${textSize} shadow-lg ring-4 ring-orange-50`}
        >
            {letter}
        </div>
    );
};

export default ProfileSettings;