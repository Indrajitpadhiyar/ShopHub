'use client';

import React from 'react';
import { Home, AlertCircle } from 'lucide-react';

const ErrorBoundary = ({
  errorCode = '404',
  errorMessage = 'Page Not Found'
}) => {

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 blur-3xl opacity-30">
            <div className="w-32 h-32 bg-red-200 rounded-full animate-ping mx-auto"></div>
          </div>
          <AlertCircle className="w-24 h-24 mx-auto text-red-500 animate-bounce" />
        </div>

        {/* Error Code */}
        <h1 className="text-9xl font-extrabold text-gray-800 mb-4 tracking-tight">
          {errorCode}
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          {errorMessage}
        </h2>
        <p className="text-gray-600 mb-8">
          {`Sorry, the page you are looking for does not exist or an unexpected error has occurred.`}
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;