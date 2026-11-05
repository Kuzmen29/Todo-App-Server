export function getGeocodingStorageByCoordinatesStorageKey({
    latitude,
    longitude,
}: {
    latitude: number,
    longitude: number,
}) {

    return `lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}`;
}