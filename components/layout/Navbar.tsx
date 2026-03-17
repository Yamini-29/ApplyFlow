"use client";
import AddApplicationModal from "../applications/AddApplicationModal";

export default function Navbar() {
  return (
    <div className="h-16 border-b border-neutral-800 flex items-center justify-between px-8 bg-black">

      <input
        type="text"
        placeholder="Search applications..."
        className="bg-neutral-900 text-white px-4 py-2 rounded-lg w-72 outline-none border border-neutral-800"
      />

      <div className="flex items-center gap-4">

        <AddApplicationModal />

        <div className="w-9 h-9 rounded-full bg-neutral-800"></div>

      </div>

    </div>
  );
}