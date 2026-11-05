const OPENWEATHER_KEY_API = process.env.OPENWEATHER_KEY_API;

interface IGetOpenWeatherByCityUrl {
    city: string,
    limit?: number,
}

export function getOpenWeatherByCityUrl({
    city,
    limit = 5,
}: IGetOpenWeatherByCityUrl) {

    return OPENWEATHER_KEY_API !== undefined
        ? `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${OPENWEATHER_KEY_API}`
        : null;

}