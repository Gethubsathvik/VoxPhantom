// components/Navbar.tsx
import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-dark-900 border-b border-gray-800">
      <Link href="/" className="flex items-center space-x-2 text-white">
        <Phone className="w-6 h-6 text-blue-400" />
        <span className="font-bold text-lg">VoxPhantom</span>
      </Link>
      <p className="text-sm text-gray-400">Make free international calls</p>
    </nav>
  );
}
