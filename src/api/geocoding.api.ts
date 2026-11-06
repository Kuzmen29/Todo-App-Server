import {
    IServerOptions,
    IServerResponse
} from "@types";
import {
    ICoordinates,
    IGeocodingData
} from "@components/geocoding/types";
import {
    getGeographicalCoordinatesByCity,
    getGeographicalDataByCityFromOpenWeather,
    getGeographicalDataByCoordinatesFromOpenWeather,
    getGeographicalNameByCoordinates
} from "@components/geocoding";

export function geocodingAPI({
    app,
}: IServerOptions) {

    app.get("/api/geocoding/coordinates/:city", async (request, response) => {

        const city = request.params.city;

        const getGeographicalCoordinatesByCityReturn = await getGeographicalCoordinatesByCity(
            city
        );

        if (getGeographicalCoordinatesByCityReturn.success) {

            const result: IServerResponse<{ coordinates: ICoordinates }> = {
                success: true,
                status: 200,
                data: {
                    coordinates: getGeographicalCoordinatesByCityReturn.coordinates,
                },
            };

            response.json(result);

        } else {

            const result: IServerResponse<void> = {
                success: false,
                status: 500,
                error: {
                    message: "Ошибка при получении географических координат по городу.",
                },
            };

            response.json(result);

        }

    });

    app.get('/api/geocoding/name', async (request, response) => {

        const latitude = request.query.latitude !== undefined
            ? Number(request.query.latitude)
            : null;

        const longitude = request.query.longitude !== undefined
            ? Number(request.query.longitude)
            : null;

        if (latitude !== null && longitude !== null) {

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

                    const result: IServerResponse<{ name: string }> = {
                        success: true,
                        status: 200,
                        data: {
                            name: getGeographicalNameByCoordinatesReturn.name,
                        },
                    };

                    response.json(result);

                } else {

                    const result: IServerResponse<void> = {
                        success: false,
                        status: 500,
                        error: {
                            message: "Ошибка при получении географического наименования по координатам.",
                        },
                    };

                    response.json(result);

                }

            } else {

                const result: IServerResponse<void> = {
                    success: false,
                    status: 500,
                    error: {
                        message: [
                            "Ошибка при получении географического наименования по координатам.",
                            "Указанные широта или долгота выходят за допустимые пределы.",
                        ].join(" ---> "),
                    },
                };

                response.json(result);

            }

        } else {

            const result: IServerResponse<void> = {
                success: false,
                status: 500,
                error: {
                    message: "Географические координаты не указаны.",
                },
            };

            response.json(result);

        }

    });

    app.get('/api/geocoding/:city', async (request, response) => {

        const city = request.params.city;

        const getGeographicalDataByCityFromOpenWeatherReturn = await getGeographicalDataByCityFromOpenWeather(city);

        if (getGeographicalDataByCityFromOpenWeatherReturn.success) {

            const result: IServerResponse<{ geocodingData: IGeocodingData }> = {
                success: true,
                status: 200,
                data: {
                    geocodingData: getGeographicalDataByCityFromOpenWeatherReturn.data,
                },
            };

            response.json(result);

        } else {

            const result: IServerResponse<void> = {
                success: false,
                status: 500,
                error: {
                    message: "Ошибка при получении географических данных по городу.",
                },
            };

            response.json(result);

        }

    });

    app.get('/api/geocoding', async (request, response) => {

        const latitude = request.query.latitude !== undefined
            ? Number(request.query.latitude)
            : null;

        const longitude = request.query.longitude !== undefined
            ? Number(request.query.longitude)
            : null;

        if (latitude !== null && longitude !== null) {

            if (
                latitude >= -90 &&
                latitude <= 90 &&
                longitude >= -180 &&
                longitude <= 180
            ) {

                const getGeographicalDataByCoordinatesFromOpenWeatherReturn = await getGeographicalDataByCoordinatesFromOpenWeather({
                    latitude: latitude,
                    longitude: longitude,
                });

                if (getGeographicalDataByCoordinatesFromOpenWeatherReturn.success) {

                    const result: IServerResponse<{ geocodingData: IGeocodingData }> = {
                        success: true,
                        status: 200,
                        data: {
                            geocodingData: getGeographicalDataByCoordinatesFromOpenWeatherReturn.data,
                        },
                    };

                    response.json(result);

                } else {

                    const result: IServerResponse<void> = {
                        success: false,
                        status: 500,
                        error: {
                            message: "Ошибка при получении географических данных по координатам.",
                        },
                    };

                    response.json(result);

                }

            } else {

                const result: IServerResponse<void> = {
                    success: false,
                    status: 500,
                    error: {
                        message: [
                            "Ошибка при получении географических данных по координатам.",
                            "Указанные широта или долгота выходят за допустимые пределы.",
                        ].join(" ---> "),
                    },
                };

                response.json(result);

            }

        } else {

            const result: IServerResponse<void> = {
                success: false,
                status: 500,
                error: {
                    message: "Географические координаты не указаны.",
                },
            };

            response.json(result);

        }

    });

}