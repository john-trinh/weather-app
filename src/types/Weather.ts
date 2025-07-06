export interface Coord {
  lon: number; // Longitude of the location
  lat: number; // Latitude of the location
}

export interface WeatherCondition {
  id: number; // Weather condition id
  main: string; // Group of weather parameters (Rain, Snow, Clouds etc.)
  description: string; // Weather condition within the group
  icon: string; // Weather icon id
}

export interface Main {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
  deg: number; // Wind direction, degrees (meteorological)
  gust: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
}

export interface Rain {
  "1h"?: number; // Precipitation, mm/h (where available)
}

export interface Snow {
  "1h"?: number; // Precipitation, mm/h (where available)
}

export interface Clouds {
  all: number; // Cloudiness, %
}

export interface Sys {
  type?: number; // Internal parameter
  id?: number; // Internal parameter
  message?: string; // Internal parameter
  country: string; // Country code (GB, JP etc.)
  sunrise: number; // Sunrise time, unix, UTC
  sunset: number; // Sunset time, unix, UTC
}

export interface Weather {
  coord: Coord;
  weather: WeatherCondition[];
  base: string; // Internal parameter
  main: Main;
  visibility: number; // Visibility, meter. The maximum value of the visibility is 10 km
  wind: Wind;
  rain?: Rain; // Optional as it may not always be present
  snow?: Snow; // Optional as it may not always be present
  clouds: Clouds;
  dt: number; // Time of data calculation, unix, UTC
  sys: Sys;
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Internal parameter
}
