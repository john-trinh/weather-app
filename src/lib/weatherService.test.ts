import { Weather } from "@/types";
import { getCurrentLocationWeather } from "./weatherService";

jest.mock("./weatherApi", () => ({
  getWeatherByCoordinates: jest.fn().mockResolvedValue({
    main: {
      temp: 20,
    },
  } as Weather),
}));

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

// Setup global navigator mock
Object.defineProperty(global, "navigator", {
  value: {
    geolocation: mockGeolocation,
  },
  writable: true,
});

describe("getCurrentLocationWeather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Reset mocks after each test
    jest.resetAllMocks();
  });

  it("should return weather data", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success({
        coords: { latitude: 10, longitude: 20 },
      });
    });
    const weather = await getCurrentLocationWeather();
    expect(weather).toBeDefined();
  });

  it("should return error if geolocation is not supported", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
      error(new Error("Geolocation is not supported"));
    });
    await expect(getCurrentLocationWeather()).rejects.toThrow(
      "Geolocation is not supported"
    );
  });
});
