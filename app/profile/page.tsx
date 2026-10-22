"use client";

import { useEffect, useState } from "react";
import { User, Home, Briefcase, Phone, Mail, Save } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [home, setHome] = useState("");
  const [work, setWork] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = localStorage.getItem("hopride-profile");
    if (p) {
      const data = JSON.parse(p);
      setName(data.name || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
    }
    const places = localStorage.getItem("hopride-places");
    if (places) {
      const pl = JSON.parse(places);
      setHome(pl.home || "");
      setWork(pl.work || "");
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("hopride-profile", JSON.stringify({ name, phone, email }));
    localStorage.setItem("hopride-places", JSON.stringify({ home, work }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-gold-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <p className="text-gray-400 text-sm">Saved locally on this device</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 focus:border-gold-500 rounded-xl px-4 py-3 outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1"><Phone className="w-4 h-4" /> Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 focus:border-gold-500 rounded-xl px-4 py-3 outline-none"
            placeholder="419-555-0123"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1"><Mail className="w-4 h-4" /> Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 focus:border-gold-500 rounded-xl px-4 py-3 outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1"><Home className="w-4 h-4" /> Home</label>
          <input
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 focus:border-gold-500 rounded-xl px-4 py-3 outline-none"
            placeholder="Home address"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1"><Briefcase className="w-4 h-4" /> Work</label>
          <input
            value={work}
            onChange={(e) => setWork(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 focus:border-gold-500 rounded-xl px-4 py-3 outline-none"
            placeholder="Work address"
          />
        </div>

        <button type="submit" className="w-full bg-gold-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2">
          <Save className="w-5 h-5" /> {saved ? "Saved!" : "Save Profile"}
        </button>
      </form>

      <p className="text-xs text-gray-600 mt-8 text-center">
        A2B Rides / HopRide · NW Ohio focused · Driver-first platform
      </p>
    </div>
  );
}
