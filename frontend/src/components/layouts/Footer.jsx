import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                                <img
                                    src="/bagifyLogo.png"
                                    className="rounded"
                                    alt=""
                                />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Bagify
                            </h2>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
                            Your ultimate hub for cutting-edge chargers, cables, and smart accessories. Experience quality and innovation with every purchase!
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: "M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12", label: "Facebook", hover: "hover:text-blue-400" },
                                { icon: "M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.89-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.16c-.37.64-.58 1.39-.58 2.18 0 1.5.76 2.82 1.92 3.6a4.28 4.28 0 0 1-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.72 8.72 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z", label: "Twitter", hover: "hover:text-sky-400" },
                                { icon: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z", label: "Instagram", hover: "hover:text-pink-400" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    aria-label={social.label}
                                    className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ${social.hover} transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:-translate-y-1`}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></span>
                        </h3>
                        <ul className="space-y-3">
                            {["Home", "Shop", "Deals", "About Us", "Blog"].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
                            Support
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></span>
                        </h3>
                        <ul className="space-y-3">
                            {["Contact Us", "Track Order", "FAQs", "Shipping Info", "Returns"].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
                            Get in Touch
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></span>
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@nexora.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
                            </li>
                        </ul>
                        <button className="mt-6 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
                            Download App
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p className="text-center sm:text-left">
                            &copy; {new Date().getFullYear()} Bagify. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
                            <span className="text-gray-600">•</span>
                            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</a>
                            <span className="text-gray-600">•</span>
                            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Cookies</a>
                        </div>
                    </div>
                </div>  
            </div>

        </footer>
    );
};

export default Footer;  