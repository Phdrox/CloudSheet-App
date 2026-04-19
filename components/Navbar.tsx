'use client'
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Image src={'/LogoCloud.png'} alt="Cloud Finance" width={100} height={40} />
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Cloud Finance
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sobre
            </a>
            <a href="#precos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Preços
            </a>
            <div className="flex gap-3">
              <Link href="auth/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                Login
              </Link>
              <Link href="auth/register" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all">
                Cadastrar
              </Link>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#sobre" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Sobre
            </a>
            <a href="#precos" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Preços
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
