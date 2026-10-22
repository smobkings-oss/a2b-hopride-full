"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Car, Navigation, CheckCircle, Loader2 } from "lucide-react";

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  vehicle: string;
  estimatedFare: number;
  status: string;
}

const STEPS = ["matched", "enroute", "arrived", "in_progress", "completed"];

function TrackContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [ride, setRide] = useState<Ride | null>(null);
  const [step, setStep] = useState(0);
  const [eta, setEta] = useState(8);

  useEffect(() => {
    if (!id) return;
    const rides = JSON.parse(localStorage.getItem("hopride-rides") || "[]");
    const found = rides.find((r: Ride) => r.id === id);
    if (found) {
      setRide(found);
      const idx = STEPS.indexOf(found.status);
      if (idx >= 0) setStep(idx);
    }
  }, [id]);

  useEffect(() => {
    if (!ride || step >= STEPS.length - 1) return;
    const timer = setInterval(() => {
      setStep((s) => {
        const next = Math.min(s + 1, STEPS.length - 1);
        if (next !== s) {
          const rides = JSON.parse(localStorage.getItem("hopride-rides") || "[]");
          const idx = rides.findIndex((r: Ride) => r.id === ride.id);
          if (idx !== -1) {
            rides[idx].status = STEPS[next];
            localStorage.setItem("hopride-rides", JSON.stringify(rides));
          }
        }
        return next;
      });
      setEta((e) => Math.max(1, e - 1.5));
    }, 4000);
    return () => clearInterval(timer);
  }, [ride, step]);

  if (!ride) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">No active ride found. Book one first.</p>
      </div>
    );
  }

  const statusLabel = STEPS[step] || ride.status;

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Live Tracking</h1>
      <p className="text-gray-400 mb-6">Simulated driver progress — ready for real Supabase realtime.</p>

      <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gold-600/20">
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-950 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-gold-500 rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gold-400 rounded-full" />
          </div>
          <div className="text-center z-10">
            <Car className="w-12 h-12 text-gold-500 mx-auto mb-2" />
            <div className="text-sm text-gold-400">Driver en route</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xs text-gray-500">Status</div>
            <div className="font-semibold capitalize">{statusLabel.replace("_", " ")}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">ETA</div>
            <div className="text-2xl font-bold text-gold-400">{Math.round(eta)} min</div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex gap-2">
            <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
            <span>{ride.pickup}</span>
          </div>
          <div className="flex gap-2">
            <MapPin className="w-4 h-4 text-gold-400 mt-0.5" />
            <span>{ride.dropoff}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {STEPS.map((s, i) => (
          <div key={s} className={`flex items-center gap-3 ${i <= step ? "text-gold-400" : "text-gray-600"}`}>
            {i < step ? <CheckCircle className="w-5 h-5" /> : i === step ? <Loader2 className="w-5 h-5 animate-spin" /> : <div className="w-5 h-5 border border-gray-700 rounded-full" />}
            <span className="capitalize text-sm">{s.replace("_", " ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading track...</div>}>
      <TrackContent />
    </Suspense>
  );
}
