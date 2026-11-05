import { writeFileSync } from "fs";
import { GEOCODING_STORAGE_BY_CITIES_PATH } from "./constants";

type IWriteGeocodingStorageByCitiesReturn = {
    success: true,
} | {
    success: false,
    error: {
        message: string,
    },
};

export function writeGeocodingStorageByCities<T>(
    storage: T
): IWriteGeocodingStorageByCitiesReturn {

    try {

        const stringifiedStorage = JSON.stringify(storage);

        writeFileSync(
            GEOCODING_STORAGE_BY_CITIES_PATH,
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
                    "Ошибка при сохранении хранилища геокодинга по городам в базу данных.",
                    error.message,
                ].join(" ---> "),
            },
        };

    }
}