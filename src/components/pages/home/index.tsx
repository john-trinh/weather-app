"use client";

import useWeatherStore from "@/stores/weatherStore";
import SearchBar from "./SearchBar";
import SearchHistory from "./SearchHistory";
import { useEffect } from "react";
import { getWeatherByCoordinates } from "@/lib/utils";
import WeatherView from "./WeatherView";

const Home = () => {
  const { weather, setWeather, loadHistoryFromStorage } = useWeatherStore();

  useEffect(() => {
    // Load weather history from localStorage on component mount
    loadHistoryFromStorage();

    // get weather from user's current location
    const getWeatherFromLocation = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const weather = await getWeatherByCoordinates(latitude, longitude);
        setWeather(weather);
      });
    };

    getWeatherFromLocation();
  }, [loadHistoryFromStorage, setWeather]);

  return (
    <main className="">
      <SearchBar />

      <div className="p-4 pt-6 md:max-w-[700px] md:mx-auto">
        <div className="mt-12 border border-white/50 bg-white/20 dark:bg-[#1a1a1a]/30 backdrop-blur-[20px] rounded-[20px] lg:rounded-[40px] p-5 lg:p-8">
          {weather && <WeatherView weather={weather} />}
          <SearchHistory />
        </div>
      </div>
    </main>
  );
};

export default Home;
