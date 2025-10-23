import React, { useState } from "react";
import logo from "../../assets/logo.png";
import SearchBar from "./SearchBar";
import ProfileIcon from "../ui/ProfileIcon";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Chargers",
    items: [
      "All Chargers",
      "Fast Chargers",
      "Wireless Chargers",
      "Car Chargers",
      "Multi-port Chargers",
    ],
  },
  {
    title: "Cables",
    items: [
      "All Cables",
      "USB-C Cables",
      "Lightning Cables",
      "Micro USB Cables",
      "HDMI Cables",
    ],
  },
  {
    title: "Accessories",
    items: [
      "Power Banks",
      "Adapters",
      "Extension Boards",
      "Cable Organizers",
      "Travel Kits",
    ],
  },
  {
    title: "Brands",
    items: ["Apple", "Samsung", "Anker", "Boat", "MI"],
  },
];

const allProducts = categories.flatMap((cat) => cat.items);

const Header = () => {
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-md relative z-50">
      {/* Top Bar with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2.5 text-sm">
          <div className="flex gap-6 text-white/90">
            <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Special Offers
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              24/7 Support
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Get App
            </a>
          </div>
          <div className="flex gap-6 text-white/90">
            <a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Track Order
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              onClick={handleLogoClick}
              src={logo}
              alt="Logo"
              className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-110 cursor-pointer"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(18%) sepia(99%) saturate(7477%) hue-rotate(212deg) brightness(95%) contrast(97%)",
              }}
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                className="font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center gap-2 py-2.5 px-4 rounded-lg hover:bg-blue-50 group"
                aria-haspopup="true"
                aria-expanded={categoriesDropdownOpen}
              >
                CATEGORIES
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${categoriesDropdownOpen ? "rotate-180" : ""} group-hover:text-blue-600`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Categories Dropdown Menu */}
              <div
                className={`absolute left-0 top-full mt-2 bg-white shadow-2xl border border-gray-100 rounded-2xl z-50 min-w-[800px] transition-all duration-300 origin-top overflow-hidden
                  ${categoriesDropdownOpen ? "scale-y-100 opacity-100 pointer-events-auto" : "scale-y-0 opacity-0 pointer-events-none"}
                `}
              >
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Categories</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {categories.map((cat) => (
                      <div key={cat.title} className="group/cat">
                        <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                          <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                          {cat.title}
                        </h4>
                        <ul className="space-y-1.5">
                          {cat.items.map((item) => (
                            <li
                              key={item}
                              className="text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-50 py-2 px-3 rounded-lg text-sm font-medium hover:translate-x-1"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 flex items-center justify-between">
                  <p className="text-white text-sm font-medium">Need help finding something?</p>
                  <a href="#" className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors duration-200">
                    Contact Support
                  </a>
                </div>
              </div>
            </div>

            {/* All Products */}
            <a
              href="/AllProducts"
              className="font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200 py-2.5 px-4 rounded-lg hover:bg-blue-50"
            >
              ALL PRODUCTS
            </a>

            <a
              href="#"
              className="font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200 py-2.5 px-4 rounded-lg hover:bg-blue-50 relative group"
            >
              DEALS
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </a>
            <a
              href="#"
              className="font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200 py-2.5 px-4 rounded-lg hover:bg-blue-50 flex items-center gap-2"
            >
              NEW ARRIVALS
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
            </a>
          </nav>

          {/* Desktop Search Bar Component */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2.5 rounded-full hover:bg-blue-50 text-gray-700 hover:text-red-500 transition-all duration-200 relative group"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.293l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">3</span>
            </a>

            <a
              href="/AddToCart"
              className="p-2.5 rounded-full hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 relative group"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">2</span>
            </a>

            <div className="hidden lg:flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200">
              <ProfileIcon />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-6 pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Categories</h3>
            {categories.map((cat) => (
              <div key={cat.title} className="border-b border-gray-100 pb-4 last:border-0">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                  {cat.title}
                </h4>
                <ul className="space-y-2 ml-3">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-200 py-1.5 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">All Products</h3>
            <ul className="space-y-2 ml-3">
              {allProducts.map((product, idx) => (
                <li
                  key={idx}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer transition-all duration-200 py-1.5 text-sm"
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 pt-2">
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 py-2">
              DEALS
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 py-2">
              NEW ARRIVALS
            </a>
            <a
              href="#"
              className="p-2.5 rounded-full hover:bg-blue-50 text-gray-700 hover:text-red-500 transition-all duration-200 relative group block"
            >
              <svg
                className="w-6 h-6 inline-block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.293l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">3</span>
              <span className="ml-2 text-sm font-semibold">Wishlist</span>
            </a>
            <a
              href="/AddToCart"
              className="p-2.5 rounded-full hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 relative group block"
            >
              <svg
                className="w-6 h-6 inline-block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">2</span>
              <span className="ml-2 text-sm font-semibold">Cart</span>
            </a>
            <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 py-2">
              <ProfileIcon />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;