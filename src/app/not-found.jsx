'use client';

import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center animate-fade-in">

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600">
          <AlertCircle className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-3">404</h1>

        <p className="text-lg text-gray-400 mb-2">
          Page Not Found
        </p>

        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white transition-all hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/40"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

      </div>
    </div>
  );
}