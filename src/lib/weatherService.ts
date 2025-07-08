import { getWeatherByCoordinates } from "./weatherApi";

import { Weather } from "@/types";

export const getCurrentLocationWeather = async (): Promise<Weather> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (!latitude || !longitude) {
          reject(new Error("Geolocation is not supported"));
          return;
        }

        const weather = await getWeatherByCoordinates(latitude, longitude);
        resolve(weather);
      },
      () => {
        reject(new Error("Geolocation is not supported"));
      }
    );
  });
};
