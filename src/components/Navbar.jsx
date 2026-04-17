'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Users, Activity, BarChart3 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Users },
    { href: '/timeline', label: 'Timeline', icon: Activity },
    { href: '/stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-slate-900 to-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-30 h-30 overflow-hidden"> 
          <Image 
           src="/logo.png" 
           alt="KeenKeeper Logo" 
           fill
           className="object-contain group-hover:scale-110 transition-transform" 
           priority
    />
  </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all ${
                  isActive(href)
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}