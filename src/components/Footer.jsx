/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
// import { Github, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* About */}
          <div>
            <h3><img src="/assets/logo-xl.png" alt="logo" /> </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Keep your friendships alive by tracking meaningful connections and staying in touch with people who matter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/timeline" className="hover:text-emerald-400 transition-colors">
                  Timeline
                </Link>
              </li>

              <li>
                <Link href="/stats" className="hover:text-emerald-400 transition-colors">
                  Stats
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>

            <div className="flex gap-4">
<a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/assets/facebook.png" alt="Facebook" className="w-10 h-10 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/assets/twitter.png" alt="Twitter" className="w-10 h-10 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="/assets/instagram.png" alt="Instagram" className="w-10 h-10 object-contain" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} KeenKeeper. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}