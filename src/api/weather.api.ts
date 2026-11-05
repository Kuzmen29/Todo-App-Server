import {  IServerOptions, IServerResponse } from "@types";
import { IWeather } from "@components/weather/types";
import { getWeatherByCity, getWeatherByCoordinates } from "@components/weather";

export default function weatherAPI({ 
    app,
}: IServerOptions) {

    app.get('/api/weather/:city', async (request, response) => {

        try {

            const city = request.params.city;

            const getWeatherByCityReturn = await getWeatherByCity(city);

            if (getWeatherByCityReturn.success) {

                const result: IServerResponse<{weather : IWeather}> = {
                    success: true,
                    status: 200,
                    data: {
                        weather: getWeatherByCityReturn.weather, 
                    },
                };

                response.json(result);

            } else {

                const result: IServerResponse<void> = {
                    success: false,
                    status: 500,
                    error: {
                        message: "Ошибка при получении данных о погоде по городу.", 
                    },
                };

                response.json(result);
            }

        } catch (error) {

            console.log(error);

        }

    });

    app.get('/api/weather', async (request, response) => {

        try {

            const latitude = request.query.latitude;

            const longitude = request.query.longitude;

            const getWeatherByCoordinatesReturn = await getWeatherByCoordinates({ 
                latitude: Number(latitude),
                longitude: Number(longitude),
            });

            if (getWeatherByCoordinatesReturn.success) {

                const result: IServerResponse<{weather : IWeather}> = {
                    success: true,
                    status: 200,
                    data: {
                        weather: getWeatherByCoordinatesReturn.weather,
                    },
                };

                response.json(result);

            } else {

                const result: IServerResponse<void> = {
                    success: false,
                    status: 500,
                    error: {
                        message: "Ошибка при получении данных о погоде по координатам.",
                    },
                };

                response.json(result);

            }

        } catch (error) {

            console.log(error);

        }
        
    });

}