import {
    IGeocodingData,
    IOpenWeatherGeocodingResponse
} from "./types";
import { getOpenWeatherByCoordinatesUrl } from "./urls";

// ! OpenWeather API предоставляет:
// ! вызовов API в минуту (не более) 60, вызовов API в месяц 1_000_000 .

// ! Обратное геокодирование позволяет получить название местоположения (города или района) 
// ! по географическим координатам (широте и долготе).

// ! Параметр limit в запросе к API позволяет ограничить количество названий местоположений,
// ! которые вы увидите в ответе API.

type IGetGeographicalDataByCoordinatesFromOpenWeatherReturn = {
    success: true,
    data: IGeocodingData,
} | {
    success: false,
    error: {
        message: string,
    },
};

export async function getGeographicalDataByCoordinatesFromOpenWeather({
    latitude,
    longitude,
}: {
    latitude: number,
    longitude: number,
}): Promise<IGetGeographicalDataByCoordinatesFromOpenWeatherReturn> {

    try {

        const OPENWEATHER_BY_COORDINATES_URL = getOpenWeatherByCoordinatesUrl({
            coordinates: {
                latitude,
                longitude,
            },
        });

        if (OPENWEATHER_BY_COORDINATES_URL) {

            const response = await fetch(
                OPENWEATHER_BY_COORDINATES_URL
            );

            const json: IOpenWeatherGeocodingResponse = await response.json();

            if (!Array.isArray(json) || !response.ok) {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при получении географических данных по координатам из OpenWeatherGeocoding.",
                            "fetch ответ не был успешно получен.",
                            "Ошибка от OpenWeatherGeocoding.",
                            !Array.isArray(json) ? json.message : null,
                        ].join(" ---> "),
                    },
                };

            }

            const results = json;

            // ! Массив НЕ может содержать несколько совпадений.

            if (results.length === 0) {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при получении географических данных по координатам из OpenWeatherGeocoding.",
                            "Список пуст.",
                            "Неправильно указаны координаты, или местоположение по таким координатам отсутствует.",
                        ].join(" ---> "),
                    },
                };

            } else if (results.length > 1) {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при получении географических данных по координатам из OpenWeatherGeocoding.",
                            "Найдено несколько совпадений, НО координаты должны указывать только на ОДНО местоположение.",
                        ].join(" ---> "),
                    },
                };

            } else {

                const result = json[0];

                return {
                    success: true,
                    data: {
                        name: result.local_names && result.local_names.ru
                            ? result.local_names.ru
                            : result.name,
                        country: result.country,
                        state: result.state,
                        localNames: {
                            ru: result.local_names && result.local_names.ru
                                ? result.local_names.ru
                                : null,
                            en: result.local_names && result.local_names.en
                                ? result.local_names.en
                                : null,
                        },
                        latitude: result.lat,
                        longitude: result.lon,
                    },
                };

            }

        } else {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при получении географических данных по координатам из OpenWeatherGeocoding.",
                        "URL не найден или недоступен.",
                    ].join(" ---> "),
                },
            };

        }

    } catch (error: any) {

        return {
            success: false,
            error: {
                message: [
                    "Ошибка при получении географических данных по координатам из OpenWeatherGeocoding.",
                    error.message,
                ].join(" ---> "),
            },
        };

    }

}