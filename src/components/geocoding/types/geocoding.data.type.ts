export interface IGeocodingData {

    name: string,

    localNames: {
        "en": string | null,
        "ru": string | null,
    },

    latitude: number,                       // latitude - широта

    longitude: number,                      // longitude - долгота

    country: string | null,                 // В формате "RU"

    state: string | null,                   // Если доступно

}