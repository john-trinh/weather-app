import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { fetcher } from "./fetcher";

import type { Weather } from "@/types/Weather";
import type { Geocode } from "@/types/Geocode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getWeatherByCoordinates(
  latitude: number,
  longitude: number
) {
  const response = await fetcher<Weather>(
    `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}/data/2.5/weather`,
    {
      queryParams: {
        lat: latitude.toString(),
        lon: longitude.toString(),
        units: "metric",
        appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY || "",
      },
    }
  );
  return response;
}

export async function getWeatherByLocation(search: string) {
  const response = await fetcher<{ list: Weather[] }>(
    `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}/data/2.5/find`,
    {
      queryParams: {
        q: search,
        units: "metric",
        appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY || "",
      },
    }
  );
  return response;
}

export async function getCityGeocode(city: string) {
  const response = await fetcher<Geocode[]>(
    `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}/geo/1.0/direct`,
    {
      queryParams: {
        q: city,
        appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY || "",
      },
    }
  );
  return response;
}
