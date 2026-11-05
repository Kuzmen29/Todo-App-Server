import { IYandexPogoda } from "@parsing/yandexPogoda/types";

export interface IWeather extends IYandexPogoda {
    city: string,
    latitude: number,
    longitude: number,
}