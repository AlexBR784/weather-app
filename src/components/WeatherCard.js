import React, { useCallback, useEffect, useState } from "react";
import useWeather from "../hooks/useWeather";
import WeatherCardItemFull from "./WeatherCardItemFull";
import { FaSearchLocation } from "react-icons/fa";
import Loading from "./Loading";
import SavedLocations from "./SavedLocations";

export default function WeatherCard() {
  const [location, setLocation] = useState("");
  const [searchBarShown, setsearchBarShown] = useState(true);
  const { weather, loading, error, fetchWeather } = useWeather();
  const [savedLocations, setSavedLocations] = useState([]);

  //check local storage for saved locations on first render
  useEffect(() => {
    const locations = JSON.parse(localStorage.getItem("locations"));
    if (locations) {
      setSavedLocations(locations);
    }
  }, []);

  const saveLocation = () => {
    //get locations from local storage
    let locations = JSON.parse(localStorage.getItem("locations"));
    //if locations is null, create an empty array
    if (locations === null) {
      locations = [];
    }
    //add the new location if is not already in the array
    if (!locations.includes(weather.name)) {
      locations.push(weather.name);
      //store saved locations in state
      setSavedLocations((prevLocations) => [...prevLocations, weather.name]);
    }

    //save the locations in local storage
    localStorage.setItem("locations", JSON.stringify(locations));

    console.log(JSON.parse(localStorage.getItem("locations")));
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "q") {
        setsearchBarShown((prev) => !prev);
        console.log(searchBarShown);
      }
    },
    [searchBarShown]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const keyPressed = (ev) => {
    if (ev.keyCode === 13) {
      if (ev.target.value.length > 0) {
        setLocation(ev.target.value);
        fetchWeather(ev.target.value);
      }
    }
  };

  //metodo para borrar una localizacion guardada
  const deleteLocation = (location) => {
    //get locations from local storage
    let locations = JSON.parse(localStorage.getItem("locations"));
    //remove the location from the array
    locations = locations.filter((loc) => loc !== location);
    //save the new array in local storage
    localStorage.setItem("locations", JSON.stringify(locations));
    //update the state
    setSavedLocations(locations);
  };

  //method that searches the weather of a saved location
  const searchLocation = (location) => {
    setLocation(location);
    fetchWeather(location);
  };
  return (
    <>
      {
        <div
          id="search"
          className={`${
            searchBarShown ? "opacity-100" : "opacity-0 pointer-events-none"
          } bg-[#0d1321] p-2 rounded w-96 absolute top-2 left-0 right-0 m-auto transition-opacity flex flex-row items-center`}
        >
          <FaSearchLocation className="text-[#748cab] opacity-25 ml-3" />
          <input
            className={`bg-transparent outline-none w-full text-[#748cab] placeholder:italic placeholder:opacity-25 placeholder:text-[#748cab] ml-4`}
            type="text"
            onKeyDown={keyPressed}
            placeholder="Berlin, Alemania p.e."
          />

          <div className="bg-[#748cab] text-sm p-1 opacity-25 text-[#0d1321] rounded">
            ctrl+q
          </div>
        </div>
      }

      <section className=" w-full h-full flex flex-col items-center justify-evenly">
        {loading && <Loading />}
        {error && (
          <div
            class="flex p-4 mb-4 text-sm text-red-800 rounded-lg dark:bg-slate-900 dark:text-red-400"
            role="alert"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Danger</span>
            <div>
              <span class="font-medium uppercase">
                ERROR. ¡Ha habido un problema al buscar la ubicación!
              </span>
              <ul class="mt-1.5 list-disc list-inside ">
                <li>
                  Por favor, asegurate de haber escrito correctamente el lugar.
                </li>
                <li>
                  En caso de haberlo escrito correctamente, intentalo de nuevo
                  más tarde.
                </li>
              </ul>
            </div>
          </div>
        )}
        {weather && (
          <WeatherCardItemFull weather={weather} saveLocation={saveLocation} />
        )}
      </section>

      <footer className="fixed text-[#748cab] text-xs mt-4 bottom-0 w-full h-20 flex flex-row justify-start items-center p-4 overflow-x-auto">
        {savedLocations?.map((location, index) => (
          <SavedLocations
            key={index}
            location={location}
            deleteLocation={deleteLocation}
            searchLocation={searchLocation}
          />
        ))}
      </footer>
    </>
  );
}
