// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
// import Card from '../layouts/Card';
import Product from './Product';


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/offer1.png',
    'https://via.placeholder.com/1200x400?text=Slide+2+New+Arrivals',
    'https://via.placeholder.com/1200x400?text=Slide+3+Special+Offers',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <Header />
      {/* Banner Slider */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[70vh] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out transform ${index === currentSlide
              ? 'opacity-100 scale-100 z-10'
              : 'opacity-0 scale-95 z-0'
              }`}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
            {/* Slide Content */}
            <div className="absolute top-1/4 left-6 md:left-12 lg:left-16 text-white z-20">
              {/* <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                {index === 0 && 'Exclusive Charger Deals'}
                {index === 1 && 'Discover New Arrivals'}
                {index === 2 && 'Special Offers Today'}
              </h1>
              <p className="text-sm md:text-base lg:text-lg mt-2 max-w-md drop-shadow-md">
                {index === 0 && 'Get up to 30% off on fast chargers!'}
                {index === 1 && 'Explore the latest tech innovations.'}
                {index === 2 && 'Limited time offers on top accessories.'}
              </p> */}
              {/* <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:scale-105">
                Shop Now
              </button> */}
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-100 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-2 md:p-3 rounded-full hover:bg-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-100 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-2 md:p-3 rounded-full hover:bg-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentSlide
                ? 'w-10 h-3 bg-white/80 shadow-md'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
          Featured Products
        </h2>
        <div>
          <Product/>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;