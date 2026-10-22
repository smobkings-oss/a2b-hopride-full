"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Car, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  type: "instant" | "scheduled";
  vehicle: string;
  scheduledFor?: string;
  estimatedFare: number;
  status: string;
  createdAt: string;
}

const VEHICLE_NAMES: Record<string, string> = {
  hop: "Hop",
  navigator: "Tesla Navigator",
  xl: "Hop XL",
};

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("hopride-rides");
    if (stored) setRides(JSON.parse(stored));
  }, []);

  const cancelRide = (id: string) => {
    const updated = rides.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r));
    setRides(updated);
    localStorage.setItem("hopride-rides", JSON.stringify(updated));
  };

  if (rides.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Car className="w-16 h-16 text-gold-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">No rides yet</h1>
        <p className="text-gray-400 mb-6">Hop on for your first ride across NW Ohio.</p>
        <Link href="/book" className="inline-block bg-gold-500 text-black font-semibold px-6 py-3 rounded-full">
          Book a Ride
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Rides</h1>
      <div className="space-y-4">
        {rides.map((ride) => (
          <div key={ride.id} className="bg-gray-900 border border-gold-600/20 rounded-xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                {ride.type === "instant" ? (
                  <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full">Instant</span>
                ) : (
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Scheduled</span>
                )}
                <span className="text-xs text-gray-500">{VEHICLE_NAMES[ride.vehicle] || ride.vehicle}</span>
              </div>
              <span className={`text-sm font-medium ${ride.status === "cancelled" ? "text-red-400" : "text-gold-400"}`}>
                {ride.status.replace("_", " ")}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span>{ride.pickup}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>{ride.dropoff}</span>
              </div>
              {ride.scheduledFor && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {format(new Date(ride.scheduledFor), "MMM d, yyyy · h:mm a")}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-800">
              <span className="font-semibold text-gold-400">${ride.estimatedFare.toFixed(2)}</span>
              <div className="flex gap-2">
                {ride.type === "instant" && ride.status !== "cancelled" && ride.status !== "completed" && (
                  <Link href={`/track?id=${ride.id}`} className="text-xs text-gold-400 hover:underline">
                    Track
                  </Link>
                )}
                {ride.status !== "cancelled" && ride.status !== "completed" && (
                  <button onClick={() => cancelRide(ride.id)} className="text-xs text-red-400 hover:underline">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
