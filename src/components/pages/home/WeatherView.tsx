import { Weather } from "@/types/Weather";
import Image from "next/image";

type Props = {
  weather: Weather;
};

const WeatherView = ({ weather }: Props) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-end">
        <div>
          <p>Today&apos;s weather</p>
          <p className="text-5xl lg:text-8xl font-bold text-[#6C40B5] dark:text-white">
            {Math.round(weather.main.temp)}°
          </p>
          <p>
            H: {Math.round(weather.main.temp_max)}°C L:{" "}
            {Math.round(weather.main.temp_min)}°C
          </p>

          <p className="font-bold text-[#666] dark:text-white">
            {weather.name}, {weather.sys.country}
          </p>
        </div>
        <div className="flex flex-col-reverse items-end lg:flex-row lg:items-center gap-2 lg:gap-8">
          <p className="text-sm text-[#666] dark:text-white">
            Humidity:{weather.main.humidity}%
          </p>
          <p className="text-sm text-[#666] dark:text-white">
            {weather.weather[0].main}
          </p>
        </div>
      </div>
      <div className="absolute bottom-[40%] lg:bottom-0 -right-5 lg:-right-6 w-[150px] h-[150px] lg:w-[300px] lg:h-[300px]">
        <Image
          src={
            weather.clouds.all > 50 ? "/images/cloud.png" : "/images/sun.png"
          }
          alt={weather.clouds.all > 50 ? "cloudy" : "sunny"}
          fill
          quality={100}
          priority
          className=" object-contain select-none"
          sizes="(max-width: 768px) 150px, 300px"
        />
      </div>
    </div>
  );
};

export default WeatherView;
