import {
    getGeographicalCoordinatesByCity,
    getNormalizedCity
} from '@components/geocoding';
import { getWeatherFromYandexPogoda } from '@parsing/yandexPogoda';
import {
    IWeather,
    IWeatherResponse
} from './types';

export async function getWeatherByCity(
    city: string,
): Promise<IWeatherResponse> {

    try {

        if (city.length !== 0) {

            const normalizedCity = getNormalizedCity(city);

            const getGeographicalCoordinatesByCityReturn = await getGeographicalCoordinatesByCity(
                normalizedCity
            );

            if (getGeographicalCoordinatesByCityReturn.success) {

                const geographicalCoordinates = getGeographicalCoordinatesByCityReturn.coordinates;

                const getWeatherFromYandexPogodaReturn = await getWeatherFromYandexPogoda(
                    geographicalCoordinates
                );

                if (getWeatherFromYandexPogodaReturn.success) {

                    const weather: IWeather = {
                        city: normalizedCity,
                        latitude: geographicalCoordinates.latitude,
                        longitude: geographicalCoordinates.longitude,
                        ...getWeatherFromYandexPogodaReturn.data,
                    };

                    return {
                        success: true,
                        weather,
                    };

                } else {

                    return {
                        success: false,
                        error: {
                            message: [
                                "Ошибка при получении данных о погоде по населённому пункту.",
                                getWeatherFromYandexPogodaReturn.error.message,
                            ].join(" ---> "),
                        },
                    };

                }

            } else {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при получении данных о погоде по населённому пункту.",
                            getGeographicalCoordinatesByCityReturn.error.message,
                        ].join(),
                    },
                };

            }

        } else {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при получении данных о погоде по населённому пункту.",
                        "Название населённого пункта отсутствует.",
                    ].join(" ---> "),
                },
            };

        }

    } catch (error: any) {

        return {
            success: false,
            error: {
                message: [
                    "Ошибка при получении данных о погоде по населённому пункту.",
                    error.message,
                ].join(" ---> "),
            },
        };

    }

}