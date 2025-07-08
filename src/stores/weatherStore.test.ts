import { Weather } from "@/types";
import weatherStore from "./weatherStore";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/lib/localstorage", () => ({
  getItem: jest.fn().mockReturnValue([]),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const weatherData = {
  name: "London",
  coord: {
    lat: 51.5074,
    lon: -0.1278,
  },
  sys: {
    country: "GB",
    sunrise: 1715200000,
    sunset: 1715200000,
  },
} as Weather;

describe("weatherStore", () => {
  it("should be defined", () => {
    const { result } = renderHook(() => weatherStore());
    expect(result.current.weather).toBeNull();
    expect(result.current.searchHistory).toEqual([]);
  });

  it("should set weather", () => {
    const { result } = renderHook(() => weatherStore());

    result.current.setWeather(weatherData);
    act(() => {
      result.current.setWeather(weatherData);
    });

    expect(result.current.weather).toEqual(weatherData);
  });

  it("should set search history", () => {
    const { result } = renderHook(() => weatherStore());
    act(() => {
      result.current.setSearchHistory(weatherData);
    });

    expect(result.current.searchHistory).toEqual([
      {
        coord: weatherData.coord,
        name: weatherData.name,
        sys: weatherData.sys,
      },
    ]);
  });

  it("should remove from search history", () => {
    const { result } = renderHook(() => weatherStore());
    result.current.setSearchHistory(weatherData);

    act(() => {
      result.current.removeFromHistory(0);
    });

    expect(result.current.searchHistory).toEqual([]);
  });
});
