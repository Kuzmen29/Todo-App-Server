// ! Нормализованное название населённого пункта 
// ! без пробелов слева и справа 
// ! с заглавной первой буквой, например, "Лямбирь" .

export function getNormalizedCity(city: string) {

    const trimmedCity = city.trim();

    const lowerCaseCity = trimmedCity.toLowerCase();

    const normalizedCity = lowerCaseCity[0].toUpperCase() + lowerCaseCity.slice(1);

    return normalizedCity;

}