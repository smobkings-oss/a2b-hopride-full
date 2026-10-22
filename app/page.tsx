import Link from "next/link";
import { ArrowRight, Clock, Zap, Shield, MapPin, Car } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm px-4 py-1 rounded-full mb-6">
          <MapPin className="w-4 h-4" /> NW Ohio & SE Michigan
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="holographic">Hop On.</span>
          <br />
          Instant or Scheduled.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Premium local rides. Transparent pricing. Better pay for drivers. Book a hop in seconds — now or later.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-black font-bold px-8 py-4 rounded-full text-lg transition gold-glow"
          >
            Book Instant Ride <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/book?type=scheduled"
            className="inline-flex items-center justify-center gap-2 border border-gold-500 text-gold-400 hover:bg-gold-500/10 font-semibold px-8 py-4 rounded-full text-lg transition"
          >
            Schedule Ahead
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20 text-left">
          <div className="bg-gray-900/70 border border-gold-600/20 rounded-2xl p-6 hover:border-gold-500/40 transition">
            <Zap className="w-8 h-8 text-gold-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Instant Rides</h3>
            <p className="text-gray-400">Request a hop and get matched with a nearby driver in minutes. Track live.</p>
          </div>
          <div className="bg-gray-900/70 border border-gold-600/20 rounded-2xl p-6 hover:border-gold-500/40 transition">
            <Clock className="w-8 h-8 text-gold-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Scheduled Rides</h3>
            <p className="text-gray-400">Lock in airport runs, medical appointments, or nights out hours or days ahead.</p>
          </div>
          <div className="bg-gray-900/70 border border-gold-600/20 rounded-2xl p-6 hover:border-gold-500/40 transition">
            <Car className="w-8 h-8 text-gold-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Tesla Navigator</h3>
            <p className="text-gray-400">Ride in a premium Tesla Model 3. Driver-first platform with transparent fares.</p>
          </div>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          Serving Toledo, Perrysburg, Findlay, Fremont, Tiffin, Bowling Green & surrounding areas
        </div>
      </div>
    </div>
  );
}
