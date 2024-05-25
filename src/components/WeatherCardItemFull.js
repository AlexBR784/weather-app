import React from "react";
import { GoLocation } from "react-icons/go";

export default function WeatherCardItemFull({ weather, saveLocation }) {
  return (
    <>
      <div
        id="weatherDisplay"
        className="text-[#748cab] bg-[#0d1321] rounded w-96 z-10 shadow-black/20 shadow-lg"
      >
        <div className="rounded-t p-2 flex justify-between border-b-4 border-slate-800">
          <div className="flex flex-row items-center">
            <GoLocation />
            <p className="ml-2">{weather?.name}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold ml-8 mr-4">{weather?.day}</p>
            <p className="font-bold">{weather?.hour}</p>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-10">
          <div>
            <p className="text-5xl font-bold mb-4 text-[#8b91a1]">
              {weather?.temp} °C
            </p>
            <p className="mb-4 text-xs">
              Velocidad Viento:{" "}
              <span className="text-md text-[#8b91a1] font-bold">
                {weather?.windKm} Kmh
              </span>
            </p>

            <p className="mb-4 text-xs">
              Estado:{" "}
              <span className="text-md text-[#8b91a1] font-bold">
                {weather?.state}
              </span>
            </p>
          </div>
          <div className="relative">
            <img
              className="h-16 w-16 hover:animate-pulse"
              src={weather.icon}
              alt="weather icon"
            ></img>
            <p className="text-xs mb-4">
              Dirección del Viento:{" "}
              <span className="text-md text-[#8b91a1] font-bold">
                {weather?.windDir}
              </span>
            </p>
            <p className="text-xs">
              Humedad:{" "}
              <span className="text-md text-[#8b91a1] font-bold">
                {weather?.humidity} %
              </span>
            </p>

            <div className="absolute right-0 bottom-0 ">
              <button
                onClick={saveLocation}
                className="bg-slate-500 text-white rounded p-2 h-10 w-10 hover:bg-slate-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
