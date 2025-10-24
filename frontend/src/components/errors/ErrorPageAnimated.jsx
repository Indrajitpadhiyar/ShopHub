// src/components/errors/ErrorPageAnimated.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ErrorPageAnimated = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-9xl mb-6"
        >
        </motion.div>

        <h1 className="text-5xl font-bold text-gray-800 mb-4">System Error</h1>
        <p className="text-gray-600 mb-8">
          Something went wrong. Our team has been notified.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
        >
          Retry
        </motion.button>

        <div className="mt-12 text-xs text-gray-400">
          <p>Error Code: 0xFATAL-404</p>
          <p>Time: {new Date().toLocaleString()}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPageAnimated;