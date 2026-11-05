import { readFileSync } from "fs";
import { isPlainObject } from "@utils/object";
import { GEOCODING_STORAGE_BY_COORDINATES_PATH } from "./constants";
import { writeGeocodingStorageByCoordinates } from "./writeGeocodingStorageByCoordinates";

type IReadGeocodingStorageByCoordinatesReturn<T> = {
    success: true,
    storage: T,
} | {
    success: false,
    error: {
        message: string,
    },
};

export function readGeocodingStorageByCoordinates<T>(

): IReadGeocodingStorageByCoordinatesReturn<T> {

    try {

        const stringifiedStorage = readFileSync(
            GEOCODING_STORAGE_BY_COORDINATES_PATH,
            "utf-8"
        );

        const parsedStorage = JSON.parse(stringifiedStorage);

        if (!isPlainObject(parsedStorage)) {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при чтении хранилища геокодинга по координатам из базы данных.",
                        "Структура хранилища нарушена, хранилище не является объектом.",
                    ].join(" ---> "),
                },
            };

        }

        return {
            success: true,
            storage: parsedStorage,
        };

    } catch (error: any) {

        if ((error.message as string).includes('no such file or directory')) {

            try {

                const writeGeocodingStorageByCoordinatesReturn = writeGeocodingStorageByCoordinates({});

                if (writeGeocodingStorageByCoordinatesReturn.success) {

                    const stringifiedStorage = readFileSync(
                        GEOCODING_STORAGE_BY_COORDINATES_PATH,
                        "utf-8"
                    );

                    const parsedStorage = JSON.parse(stringifiedStorage);

                    return {
                        success: true,
                        storage: parsedStorage,
                    };

                } else {

                    return {
                        success: false,
                        error: {
                            message: [
                                "Ошибка при чтении хранилища геокодинга по координатам из базы данных.",
                                writeGeocodingStorageByCoordinatesReturn.error.message,
                            ].join(" ---> "),
                        },
                    };

                }

            } catch (error: any) {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при чтении хранилища геокодинга по координатам из базы данных.",
                            error.message,
                        ].join(" ---> "),
                    },
                };

            }

        } else {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при чтении хранилища геокодинга по координатам из базы данных.",
                        error.message,
                    ].join(" ---> "),
                },
            };

        }
    }
}