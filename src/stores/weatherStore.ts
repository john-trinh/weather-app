import { getItem, setItem, removeItem } from "@/lib/localstorage";
import { create } from "zustand";
import { Weather } from "@/types/Weather";

export type SearchHistory = Pick<Weather, "name" | "coord" | "sys">;

type WeatherStore = {
  weather: Weather | null;
  searchHistory: SearchHistory[];
  setWeather: (weather: Weather) => void;
  setSearchHistory: (weather: SearchHistory) => void;
  removeFromHistory: (index: number) => void;
  clearHistory: () => void;
  loadHistoryFromStorage: () => void;
};

const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  searchHistory: getItem<SearchHistory[]>("searchHistory") || [],
  setWeather: (weather) => set({ weather }),
  setSearchHistory: (weather) => {
    set((state) => {
      const { coord, name } = weather;
      // remove duplicate
      const uniqueHistory = state.searchHistory.filter(
        (item) => item.name !== name || item.sys.country !== weather.sys.country
      );
      const history: SearchHistory[] = [
        ...uniqueHistory,
        { coord, name, sys: weather.sys },
      ].slice(-10);

      setItem("searchHistory", history);
      return {
        searchHistory: history,
      };
    });
  },
  removeFromHistory: (index: number) => {
    set((state) => {
      const history = state.searchHistory.filter((_, i) => i !== index);
      setItem("searchHistory", history);
      return {
        searchHistory: history,
      };
    });
  },
  clearHistory: () => {
    removeItem("searchHistory");
    set({ searchHistory: [] });
  },
  loadHistoryFromStorage: () => {
    const history = getItem<SearchHistory[]>("searchHistory") || [];
    set({ searchHistory: history });
  },
}));

export default useWeatherStore;
