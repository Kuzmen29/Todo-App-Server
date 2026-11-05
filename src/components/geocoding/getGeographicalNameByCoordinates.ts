import {
    IGeocodingStorageByCities,
    IGeocodingStorageByCoordinates
} from "./types";
import { getGeocodingStorageByCoordinatesStorageKey } from "./getGeocodingStorageByCoordinatesStorageKey";
import { getNormalizedCity } from "./getNormalizedCity";
import { getGeographicalDataByCoordinatesFromOpenWeather } from "./getGeographicalDataByCoordinatesFromOpenWeather";
import { readGeocodingStorageByCities } from "./readGeocodingStorageByCities";
import { readGeocodingStorageByCoordinates } from "./readGeocodingStorageByCoordinates";
import { writeGeocodingStorageByCities } from "./writeGeocodingStorageByCities";
import { writeGeocodingStorageByCoordinates } from "./writeGeocodingStorageByCoordinates";

type IGetGeographicalNameByCoordinatesReturn = {
    success: true,
    name: string,
} | {
    success: false,
    error: {
        message: string,
    },
};

export async function getGeographicalNameByCoordinates({
    latitude,
    longitude,
}: {
    latitude: number,
    longitude: number,
}): Promise<IGetGeographicalNameByCoordinatesReturn> {

    if (
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180
    ) {

        const geocodingStorageByCoordinatesStorageKey = getGeocodingStorageByCoordinatesStorageKey({
            latitude,
            longitude,
        });

        const readGeocodingStorageByCoordinatesReturn = readGeocodingStorageByCoordinates<
            IGeocodingStorageByCoordinates
        >();

        if (readGeocodingStorageByCoordinatesReturn.success) {

            const geocodingStorageByCoordinates = readGeocodingStorageByCoordinatesReturn.storage;

            if (geocodingStorageByCoordinates[geocodingStorageByCoordinatesStorageKey]) {

                return {
                    success: true,
                    name: geocodingStorageByCoordinates[geocodingStorageByCoordinatesStorageKey].localNames.ru
                        ? geocodingStorageByCoordinates[geocodingStorageByCoordinatesStorageKey].localNames.ru
                        : geocodingStorageByCoordinates[geocodingStorageByCoordinatesStorageKey].name,
                };

            } else {

                const getGeographicalDataByCoordinatesFromOpenWeatherReturn =
                    await getGeographicalDataByCoordinatesFromOpenWeather({
                        latitude,
                        longitude,
                    });

                if (getGeographicalDataByCoordinatesFromOpenWeatherReturn.success) {

                    const geographicalData = getGeographicalDataByCoordinatesFromOpenWeatherReturn.data;

                    geocodingStorageByCoordinates[geocodingStorageByCoordinatesStorageKey] = geographicalData;

                    const writeGeocodingStorageByCoordinatesReturn = writeGeocodingStorageByCoordinates(
                        geocodingStorageByCoordinates
                    );

                    if (writeGeocodingStorageByCoordinatesReturn.success) {

                        const readGeocodingStorageByCitiesReturn = readGeocodingStorageByCities<IGeocodingStorageByCities>();

                        if (readGeocodingStorageByCitiesReturn.success) {

                            const geocodingStorageByCities = readGeocodingStorageByCitiesReturn.storage;

                            const normalizedCity = getNormalizedCity(
                                geographicalData.localNames.ru
                                    ? geographicalData.localNames.ru
                                    : geographicalData.localNames.en
                                        ? geographicalData.localNames.en
                                        : geographicalData.name
                            );

                            geocodingStorageByCities[normalizedCity] = geographicalData;

                            const writeGeocodingStorageByCitiesReturn = writeGeocodingStorageByCities(
                                geocodingStorageByCities
                            );

                            if (writeGeocodingStorageByCitiesReturn.success) {

                                return {
                                    success: true,
                                    name: geographicalData.localNames.ru
                                        ? geographicalData.localNames.ru
                                        : geographicalData.name,
                                };

                            } else {

                                return {
                                    success: false,
                                    error: {
                                        message: [
                                            "Ошибка при получении географического наименования по координатам.",
                                            "Хранилище геокодинга по координатам сохранено, НО...",
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
                                        "Ошибка при получении географического наименования по координатам.",
                                        "Хранилище геокодинга по координатам сохранено, НО...",
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
                                    "Ошибка при получении географического наименования по координатам.",
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
                                "Ошибка при получении географического наименования по координатам.",
                                getGeographicalDataByCoordinatesFromOpenWeatherReturn.error.message,
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
                        "Ошибка при получении географического наименования по координатам.",
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
                    "Ошибка при получении географического наименования по координатам.",
                    "Указанные широта или долгота выходят за допустимые пределы.",
                ].join(" ---> "),
            },
        };

    }

}