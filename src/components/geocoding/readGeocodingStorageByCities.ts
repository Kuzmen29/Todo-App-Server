import { readFileSync } from "fs";
import { isPlainObject } from "@utils/object";
import { GEOCODING_STORAGE_BY_CITIES_PATH } from "./constants";
import { writeGeocodingStorageByCities } from "./writeGeocodingStorageByCities";

type IReadGeocodingStorageByCitiesReturn<T> = {
    success: true,
    storage: T,
} | {
    success: false,
    error: {
        message: string,
    },
};

export function readGeocodingStorageByCities<T>(

): IReadGeocodingStorageByCitiesReturn<T> {

    try {

        const stringifiedStorage = readFileSync(
            GEOCODING_STORAGE_BY_CITIES_PATH,
            "utf-8"
        );

        const parsedStorage = JSON.parse(stringifiedStorage);

        if (!isPlainObject(parsedStorage)) {

            return {
                success: false,
                error: {
                    message: [
                        "Ошибка при чтении хранилища геокодинга по городам из базы данных.",
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

                const writeGeocodingStorageByCitiesReturn = writeGeocodingStorageByCities({});

                if (writeGeocodingStorageByCitiesReturn.success) {

                    const stringifiedStorage = readFileSync(
                        GEOCODING_STORAGE_BY_CITIES_PATH,
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
                                "Ошибка при чтении хранилища геокодинга по городам из базы данных.",
                                writeGeocodingStorageByCitiesReturn.error.message,
                            ].join(" ---> "),
                        },
                    };

                }

            } catch (error: any) {

                return {
                    success: false,
                    error: {
                        message: [
                            "Ошибка при чтении хранилища геокодинга по городам из базы данных.",
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
                        "Ошибка при чтении хранилища геокодинга по городам из базы данных.",
                        error.message,
                    ].join(" ---> "),
                },
            };

        }
    }
}