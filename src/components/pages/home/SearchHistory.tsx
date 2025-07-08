import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import useWeatherStore from "@/stores/weatherStore";
import type { SearchHistory } from "@/stores/weatherStore";
import { getWeatherByCoordinates } from "@/lib/weatherApi";

const SearchHistory = () => {
  const { searchHistory, removeFromHistory, setWeather } = useWeatherStore();

  const handleRemoveFromHistory = (index: number) => {
    removeFromHistory(index);
  };

  const handleSearchAgain = async (search: SearchHistory) => {
    const weather = await getWeatherByCoordinates(
      search.coord.lat,
      search.coord.lon
    );
    setWeather(weather);
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 p-3 lg:p-5 bg-white/20 rounded-3xl flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm lg:text-b ase">Search History</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => useWeatherStore.getState().clearHistory()}
          className="text-xs text-gray-500 hover:text-red-500"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {searchHistory.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="p-2 lg:p-4 bg-white/40 rounded-xl flex gap-2 items-center"
          >
            <div className="flex-1">
              <div className="font-medium text-sm lg:text-base">
                {item.name}, {item.sys.country}
              </div>
            </div>
            <Button
              variant="secondary"
              className="rounded-full size-8"
              onClick={() => handleSearchAgain(item)}
              title="Search again"
            >
              <Search className="size-4" />
            </Button>
            <Button
              variant="secondary"
              className="rounded-full size-8"
              onClick={() => handleRemoveFromHistory(index)}
              title="Remove from history"
            >
              <Trash className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
