import React from "react";

export default function SavedLocations({
  location,
  deleteLocation,
  searchLocation,
}) {
  return (
    <div className="relative ">
      <button
        className="relative flex flex-row bg-[#0d1321] p-4 rounded mr-4 cursor-pointer hover:bg-slate-900"
        onClick={() => searchLocation(location)}
      >
        {location}
      </button>
      <button
        className="absolute right-2 top-[0] rounded bg-red-500 h-4 w-4 text-center text-white hover:bg-slate-700 transition-colors"
        onClick={() => deleteLocation(location)}
      >
        x
      </button>
    </div>
  );
}
