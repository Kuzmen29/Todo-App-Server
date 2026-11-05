const OPENWEATHER_KEY_API = process.env.OPENWEATHER_KEY_API;

interface IGetOpenWeatherByCoordinatesUrl {
    coordinates: {
        latitude: number,
        longitude: number,
    },
    limit?: number,
}

export function getOpenWeatherByCoordinatesUrl({
    coordinates: { latitude, longitude },
    limit = 5,
}: IGetOpenWeatherByCoordinatesUrl) {

    return OPENWEATHER_KEY_API !== undefined
        ? `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${OPENWEATHER_KEY_API}`
        : null;

}