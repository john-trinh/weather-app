"use client";

import { useEffect, useState } from "react";

import { getWeatherByLocation } from "@/lib/weatherApi";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { Weather } from "@/types/Weather";
import useWeatherStore from "@/stores/weatherStore";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const { setWeather, setSearchHistory } = useWeatherStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setWeatherList([]);
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const getGeoCode = async (search: string) => {
      setIsLoading(true);
      try {
        const weatherList = await getWeatherByLocation(search);
        setWeatherList(weatherList.list);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearch) {
      getGeoCode(debouncedSearch);
    }
  }, [debouncedSearch]);

  const showWeatherToView = (weather: Weather) => {
    setWeather(weather);
    setSearchHistory(weather);
  };

  return (
    <div className="p-4 pt-6 md:max-w-[700px] md:mx-auto">
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1">
          <div className="flex items-center gap-3 bg-white/20 dark:bg-[#1a1a1a]/30 rounded-lg lg:rounded-2xl">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[40px] lg:h-[60px] text-xs lg:text-base dark:bg-transparent"
              placeholder="Weather in your city"
            />
            {isLoading && (
              <div className="flex items-center h-full pr-3">
                <Loader2 className="size-4 animate-spin text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </div>
          <div className="absolute top-full left-0 w-full z-[10]">
            {weatherList.length > 0 && (
              <div className="flex flex-col gap-2 bg-white dark:bg-[#363636] rounded-lg lg:rounded-2xl  overflow-hidden">
                <ul>
                  {weatherList.map((item, index) => (
                    <li
                      className="flex justify-between items-center p-3 cursor-pointer transition-[background-color] duration-300 hover:bg-black/10 dark:hover:bg-[#1a1a1a]/60"
                      key={index}
                      onClick={() => {
                        showWeatherToView(item);
                        setWeatherList([]);
                      }}
                    >
                      <p className="text-md font-medium">
                        {item.name}, {item.sys.country}
                      </p>
                      <p className="text-sm text-gray-500">
                        {Math.round(item.main.temp)}°C {item.weather[0].main}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
