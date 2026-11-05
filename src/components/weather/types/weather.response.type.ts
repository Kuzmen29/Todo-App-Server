import type { IWeather } from "./weather.type";

export type IWeatherResponse = {
    success: true,
    weather: IWeather,
} | {
    success: false,
    error: {
        message: string,
    },
};