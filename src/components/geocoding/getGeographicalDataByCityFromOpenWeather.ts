import {
    IGeocodingData,
    IOpenWeatherGeocodingResponse
} from "./types";
import { getOpenWeatherByCityUrl } from "./urls";

// ! OpenWeatherGeocoding API предоставляет:
// ! вызовов API в минуту (не более) 60, вызовов API в месяц 1_000_000 .

// ! Прямое геокодирование позволяет получить географические координаты (широта, долгота) 
// ! по названию местоположения (городу или району). 

// ! Если при вызове API использовать параметр limit, 
// ! можно ограничить количество местоположений с одинаковым названием, 
// ! которые будут отображаться в ответе API (например, Лондон в Великобритании и Лондон в США).

type IGetGeographicalDataByCityFromOpenWeatherReturn = {
    success: true,
    data: IGeocodingData,
} | {
    success: false,
    error: {
        message: string,
    },
};

export async function getGeographicalDataByCityFromOpenWeather(
    city: string
): Promise<IGetGeographicalDataByCityFromOpenWeatherReturn> {

    try {

        const OPENWEATHER_BY_CITY_URL = getOpenWeatherByCityUrl({ city });

        if (OPENWEATHER_BY_CITY_URL) {

            const response = await fetch(
                OPENWEATHER_BY_CITY_URL
            );

            const json: IOpenWeatherGeocodingResponse = await response.json();

            if (!Array.isArray(json) || !response.ok) {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при получении географических данных по городу из OpenWeatherGeocoding.",
                            "fetch ответ не был успешно получен.",
                            "Ошибка от OpenWeatherGeocoding.",
                            !Array.isArray(json) ? json.message : null,
                        ].join(" ---> "),
                    },
                };

            }

            const results = json;

            // ! Массив может содержать несколько совпадений.

            if (results.length === 0) {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при получении географических данных по городу из OpenWeatherGeocoding.",
                            "Список пуст.",
                            "Неправильно указан населённый пункт, или такого населённого пункта не существует.",
                        ].join(" ---> "),
                    },
                };

            } else if (results.length === 1) {

                const result = json[0];

                if (
                    (
                        result.local_names && result.local_names.ru
                    ) || (
                        result.name && city.toUpperCase().localeCompare(result.name.toUpperCase()) === 0
                    )
                ) {

                    return {
                        success: true,
                        data: {
                            name: city,
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

                } else {

                    return {
                        success: false,
                        error: {
                            message: [
                                "Ошибка при получении географических данных по городу из OpenWeatherGeocoding.",
                                "В единственном полученном результате отсутствует название на русском языке.",
                            ].join(" ---> "),
                        },
                    };

                }

            } else {

                for (const result of results) {

                    if (
                        (
                            result.local_names && result.local_names.ru
                        ) || (
                            result.name && result.name.toUpperCase().localeCompare(city.toUpperCase()) === 0
                        )
                    ) {

                        return {
                            success: true,
                            data: {
                                name: city,
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
                }

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при получении географических данных по городу из OpenWeatherGeocoding.",
                            "В полученных результатах отсутствует хотя бы один результат с названием на русском языке.",
                        ].join(" ---> "),
                    },
                };

            }

        } else {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при получении географических данных по городу из OpenWeatherGeocoding.",
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
                    "Ошибка при получении географических данных по городу из OpenWeatherGeocoding.",
                    error.message,
                ].join(" ---> "),
            },
        };

    }

}