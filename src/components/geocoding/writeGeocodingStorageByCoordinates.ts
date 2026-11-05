import { writeFileSync } from "fs";
import { GEOCODING_STORAGE_BY_COORDINATES_PATH } from "./constants";

type IWriteGeocodingStorageByCoordinatesReturn = {
    success: true,
} | {
    success: false,
    error: {
        message: string,
    },
};

export function writeGeocodingStorageByCoordinates<T>(
    storage: T
): IWriteGeocodingStorageByCoordinatesReturn {

    try {

        const stringifiedStorage = JSON.stringify(storage);

        writeFileSync(
            GEOCODING_STORAGE_BY_COORDINATES_PATH,
            stringifiedStorage
        );

        return {
            success: true,
        };

    } catch (error: any) {

        return {
            success: false,
            error: {
                message: [
                    "Ошибка при сохранении хранилища геокодинга по координатам в базу данных.",
                    error.message,
                ].join(" ---> "),
            },
        };

    }
}