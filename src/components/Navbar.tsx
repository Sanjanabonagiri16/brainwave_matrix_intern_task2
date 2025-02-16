'use client'

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation items
  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/categories', label: 'Categories' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            BlogApp
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <>
                <Link href="/editor" className="text-gray-300 hover:text-white transition">
                  Editor
                </Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300">{user.name}</span>
                <button 
                  onClick={() => signOut()}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden px-4 pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block py-2 text-gray-300 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
        {user && (
          <>
            <Link href="/editor" className="block py-2 text-gray-300 hover:text-white transition">
              Editor
            </Link>
            <Link href="/dashboard" className="block py-2 text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
          </>
        )}
        {user ? (
          <>
            <span className="block py-2 text-gray-300">{user.name}</span>
            <button 
              onClick={() => signOut()}
              className="block w-full text-left py-2 text-gray-300 hover:text-white transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link 
            href="/signin"
            className="block py-2 text-gray-300 hover:text-white transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
} 