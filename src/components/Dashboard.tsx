import React from "react";

export default function Dashboard({ user, civicCoins }: { user: any; civicCoins: number }) {
  if (!user) return null;
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-indigo-700">Welcome, {user.name || user.email}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg bg-yellow-400 text-white font-semibold">
            Civic Coins: <span className="font-bold">{civicCoins}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
