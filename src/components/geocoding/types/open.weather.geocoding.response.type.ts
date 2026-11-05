import { IOpenWeatherGeocodingData } from "./open.weather.geocoding.data.type";

export type IOpenWeatherGeocodingResponse = IOpenWeatherGeocodingData[] | {

    // ! code - Шестизначный код ошибки. 
    // !     Первые три цифры обозначают HTTP-код, 
    // !     вторые - специальный код ошибки.

    // ! message - Описание ошибки.

    code: number,

    message: string,

};