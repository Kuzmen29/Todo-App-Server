import {
    IGeocodingStorageByCities,
    IGeocodingStorageByCoordinates
} from "./types";
import { getGeocodingStorageByCoordinatesStorageKey } from "./getGeocodingStorageByCoordinatesStorageKey";
import { getNormalizedCity } from "./getNormalizedCity";
import { getGeographicalDataByCityFromOpenWeather } from "./getGeographicalDataByCityFromOpenWeather";
import { readGeocodingStorageByCities } from "./readGeocodingStorageByCities";
import { readGeocodingStorageByCoordinates } from "./readGeocodingStorageByCoordinates";
import { writeGeocodingStorageByCities } from "./writeGeocodingStorageByCities";
import { writeGeocodingStorageByCoordinates } from "./writeGeocodingStorageByCoordinates";

// ! Функция по указанному названию населённого пункта обращается к хранилищу 
// ! и, не найдя запись в нём, делает запрос к другой функции.

// ! Все сохранения происходят в финальной ветке if, 
// ! чтобы при ошибках не делать ложные сохранения.

type IGetGeographicalCoordinatesByCityReturn = {
    success: true,
    coordinates: {
        latitude: number,
        longitude: number,
    },
} | {
    success: false,
    error: {
        message: string,
    },
};

export async function getGeographicalCoordinatesByCity(
    city: string
): Promise<IGetGeographicalCoordinatesByCityReturn> {

    if (city.length !== 0) {

        const normalizedCity = getNormalizedCity(city);

        const readGeocodingStorageByCitiesReturn = readGeocodingStorageByCities<
            IGeocodingStorageByCities
        >();

        if (readGeocodingStorageByCitiesReturn.success) {

            const geocodingStorageByCities = readGeocodingStorageByCitiesReturn.storage;

            if (geocodingStorageByCities[normalizedCity]) {

                return {
                    success: true,
                    coordinates: {
                        latitude: geocodingStorageByCities[normalizedCity].latitude,
                        longitude: geocodingStorageByCities[normalizedCity].longitude,
                    },
                };

            } else {

                const getGeographicalDataByCityFromOpenWeatherReturn =
                    await getGeographicalDataByCityFromOpenWeather(normalizedCity);

                if (getGeographicalDataByCityFromOpenWeatherReturn.success) {

                    const geographicalData = getGeographicalDataByCityFromOpenWeatherReturn.data;

                    geocodingStorageByCities[normalizedCity] = geographicalData;

                    const writeGeocodingStorageByCitiesReturn = writeGeocodingStorageByCities(
                        geocodingStorageByCities
                    );

                    if (writeGeocodingStorageByCitiesReturn.success) {

                        const readGeocodingStorageByCoordinatesReturn = readGeocodingStorageByCoordinates<
                            IGeocodingStorageByCoordinates
                        >();

                        if (readGeocodingStorageByCoordinatesReturn.success) {

                            const geocodingStorageByCoordinates = readGeocodingStorageByCoordinatesReturn.storage;

                            const geocodingStorageByCoordinatesStorageKey = getGeocodingStorageByCoordinatesStorageKey({
                                latitude: geographicalData.latitude,
                                longitude: geographicalData.longitude,
                            });

                            geocodingStorageByCoordinates[geocodingStorageByCoordinatesStorageKey] = geographicalData;

                            const writeGeocodingStorageByCoordinatesReturn = writeGeocodingStorageByCoordinates(
                                geocodingStorageByCoordinates
                            );

                            if (writeGeocodingStorageByCoordinatesReturn.success) {

                                return {
                                    success: true,
                                    coordinates: {
                                        latitude: geocodingStorageByCities[normalizedCity].latitude,
                                        longitude: geocodingStorageByCities[normalizedCity].longitude,
                                    },
                                };

                            } else {

                                return {
                                    success: false,
                                    error: {
                                        message: [
                                            "Ошибка при получении географических координат по городу.",
                                            "Хранилище геокодинга по городам сохранено, НО...",
                                            writeGeocodingStorageByCoordinatesReturn.error.message,
                                        ].join(" ---> "),
                                    },
                                };

                            }

                        } else {

                            return {
                                success: false,
                                error: {
                                    message: [
                                        "Ошибка при получении географических координат по городу.",
                                        "Хранилище геокодинга по городам сохранено, НО...",
                                        readGeocodingStorageByCoordinatesReturn.error.message,
                                    ].join(" ---> "),
                                },
                            };

                        }

                    } else {

                        return {
                            success: false,
                            error: {
                                message: [
                                    "Ошибка при получении географических координат по городу.",
                                    writeGeocodingStorageByCitiesReturn.error.message,
                                ].join(" ---> "),
                            },
                        };

                    }

                } else {

                    return {
                        success: false,
                        error: {
                            message: [
                                "Ошибка при получении географических координат по городу.",
                                getGeographicalDataByCityFromOpenWeatherReturn.error.message,
                            ].join(" ---> "),
                        },
                    };

                }

            }

        } else {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при получении географических координат по городу.",
                        readGeocodingStorageByCitiesReturn.error.message,
                    ].join(" ---> "),
                },
            };

        }

    } else {

        return {
            success: false,
            error: {
                message: [
                    "Ошибка при получении географических координат по городу.",
                    "Название населённого пункта отсутствует."
                ].join(" ---> "),
            },
        };

    }
}