import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
// import { getProfile, updateAddress } from "../../actions/user.action";
import Loader from "../layouts/Loader";
import toast from "react-hot-toast";

const ProfileDetails = () => {
    const dispatch = useDispatch();

    const profileState = useSelector((state) => state.profile) || {};
    const { loading = false, user = null, error = null } = profileState;

    const [addressForm, setAddressForm] = useState({
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateAddress(addressForm));
        setIsEditing(false);
        toast.success("Address saved!");
    };

    const hasFullAddress = user?.address && user?.city && user?.state && user?.pincode;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Loader */}
                {loading && <Loader />}

                {/* Profile Card */}
                <AnimatePresence>
                    {user && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <motion.img
                                        while Hover={{ scale: 1.1 }}
                                        src={user.avatar?.url || "https://via.placeholder.com/120"}
                                        alt={user.name}
                                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="text-center sm:text-left">
                                        <motion.h1
                                            initial={{ x: -20 }}
                                            animate={{ x: 0 }}
                                            className="text-2xl sm:text-3xl font-bold"
                                        >
                                            {user.name}
                                        </motion.h1>
                                        <p className="text-sm opacity-90">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 sm:p-8 space-y-6">
                                <InfoRow
                                    label="Email"
                                    value={user.email}
                                    icon="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />

                                {/* Address Section */}
                                {hasFullAddress ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-gray-50 p-5 rounded-xl"
                                    >
                                        <h3 className="font-semibold text-gray-800 mb-2">
                                            Shipping Address
                                        </h3>
                                        <p className="text-gray-700">
                                            {user.address}, {user.city}, {user.state} -{" "}
                                            <span className="font-medium">{user.pincode}</span>
                                        </p>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="mt-3 text-sm text-indigo-600 hover:underline"
                                        >
                                            Edit address
                                        </button>
                                    </motion.div>
                                ) : (
                                    <AddressForm
                                        addressForm={addressForm}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                        setIsEditing={setIsEditing}
                                    />
                                )}

                                {/* Edit Form */}
                                {isEditing && hasFullAddress && (
                                    <EditAddressForm
                                        user={user}
                                        addressForm={addressForm}
                                        setAddressForm={setAddressForm}
                                        handleSubmit={handleSubmit}
                                        setIsEditing={setIsEditing}
                                    />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* No user fallback */}
                {!loading && !user && (
                    <p className="text-center text-gray-500 mt-10">
                        Please log in to view your profile.
                    </p>
                )}
            </div>
        </div>
    );
};

/* Reusable Components */
const InfoRow = ({ label, value, icon }) => (
    <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

const Input = ({ name, placeholder, value, defaultValue, onChange, required, maxLength }) => (
    <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value ?? undefined}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
);

const AddressForm = ({ addressForm, handleInputChange, handleSubmit, setIsEditing }) => (
    <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="bg-amber-50 p-5 rounded-xl border border-amber-200"
    >
        <h3 className="font-semibold text-gray-800 mb-3">Add your shipping address</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="address" placeholder="Street / House No." value={addressForm.address} onChange={handleInputChange} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="city" placeholder="City" value={addressForm.city} onChange={handleInputChange} required />
                <Input name="state" placeholder="State" value={addressForm.state} onChange={handleInputChange} required />
            </div>
            <Input name="pincode" placeholder="Pincode" value={addressForm.pincode} onChange={handleInputChange} required maxLength={6} />
            <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    Save Address
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
                    Cancel
                </button>
            </div>
        </form>
    </motion.div>
);

const EditAddressForm = ({ user, addressForm, setAddressForm, handleSubmit, setIsEditing }) => {
    useEffect(() => {
        if (user) {
            setAddressForm({
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                pincode: user.pincode || "",
            });
        }
    }, [user, setAddressForm]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-amber-50 p-5 rounded-xl border border-amber-200"
        >
            <h3 className="font-semibold text-gray-800 mb-3">Edit Address</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="address" defaultValue={user.address} onChange={(e) => setAddressForm(prev => ({ ...prev, address: e.target.value }))} required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input name="city" defaultValue={user.city} onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))} required />
                    <Input name="state" defaultValue={user.state} onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))} required />
                </div>
                <Input name="pincode" defaultValue={user.pincode} onChange={(e) => setAddressForm(prev => ({ ...prev, pincode: e.target.value }))} required maxLength={6} />
                <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                        Update
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default ProfileDetails;