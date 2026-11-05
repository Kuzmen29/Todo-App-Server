import { getGeographicalNameByCoordinates } from "@components/geocoding";
import { getWeatherFromYandexPogoda } from "@parsing/yandexPogoda";
import {
    IWeather,
    IWeatherResponse
} from "./types";

export async function getWeatherByCoordinates({
    latitude,
    longitude,
}: {
    latitude: number,
    longitude: number,
}): Promise<IWeatherResponse> {

    try {

        if (
            latitude >= -90 &&
            latitude <= 90 &&
            longitude >= -180 &&
            longitude <= 180
        ) {

            const getGeographicalNameByCoordinatesReturn = await getGeographicalNameByCoordinates({
                latitude,
                longitude,
            });

            if (getGeographicalNameByCoordinatesReturn.success) {

                const city = getGeographicalNameByCoordinatesReturn.name;

                const getWeatherFromYandexPogodaReturn = await getWeatherFromYandexPogoda({
                    latitude,
                    longitude,
                });

                if (getWeatherFromYandexPogodaReturn.success) {

                    const weather: IWeather = {
                        city,
                        latitude,
                        longitude,
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
                                "Ошибка при получении данных о погоде по географическим координатам.",
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
                            "Ошибка при получении данных о погоде по географическим координатам.",
                            getGeographicalNameByCoordinatesReturn.error.message,
                        ].join(" ---> "),
                    },
                };

            }

        } else {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при получении данных о погоде по географическим координатам.",
                        "Указанные широта или долгота выходят за допустимые пределы.",
                    ].join(" ---> "),
                },
            };

        }

    } catch (error: any) {

        return {
            success: false,
            error: {
                message: [
                    "Ошибка при получении данных о погоде по географическим координатам.",
                    error.message,
                ].join(" ---> "),
            },
        };

    }

}