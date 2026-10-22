import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Home, Car, Clock, User, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "HopRide | Instant & Scheduled Rides",
  description: "Premium rides across NW Ohio & SE Michigan. Hop on instantly or schedule ahead.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <header className="border-b border-gold-600/30 sticky top-0 bg-black/80 backdrop-blur z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              <span className="holographic">HopRide</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/book" className="hover:text-gold-400 transition flex items-center gap-1">
                <Car className="w-4 h-4" /> Book
              </Link>
              <Link href="/rides" className="hover:text-gold-400 transition flex items-center gap-1">
                <Clock className="w-4 h-4" /> My Rides
              </Link>
              <Link href="/track" className="hover:text-gold-400 transition flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Track
              </Link>
              <Link href="/profile" className="hover:text-gold-400 transition flex items-center gap-1">
                <User className="w-4 h-4" /> Profile
              </Link>
            </nav>
            <Link
              href="/book"
              className="md:hidden bg-gold-500 text-black font-semibold px-4 py-1.5 rounded-full text-sm"
            >
              Hop On
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 border-t border-gold-600/30 flex justify-around py-3 z-50">
          <Link href="/" className="flex flex-col items-center text-xs text-gray-400 hover:text-gold-400">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link href="/book" className="flex flex-col items-center text-xs text-gray-400 hover:text-gold-400">
            <Car className="w-5 h-5" /> Book
          </Link>
          <Link href="/rides" className="flex flex-col items-center text-xs text-gray-400 hover:text-gold-400">
            <Clock className="w-5 h-5" /> Rides
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-xs text-gray-400 hover:text-gold-400">
            <User className="w-5 h-5" /> Profile
          </Link>
        </nav>
        <div className="h-16 md:hidden" />
      </body>
    </html>
  );
}
