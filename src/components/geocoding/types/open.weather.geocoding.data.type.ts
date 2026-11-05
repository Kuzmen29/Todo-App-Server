export interface IOpenWeatherGeocodingData {

    name: string,

    local_names: {
        "en": string | null,
        "ru": string | null,
        [key: string]: string | null,
    } | null,

    lat: number,                        // latitude - широта

    lon: number,                        // longitude - долгота

    country: string | null,             // В формате "RU"

    state: string | null,               // Если доступно

}