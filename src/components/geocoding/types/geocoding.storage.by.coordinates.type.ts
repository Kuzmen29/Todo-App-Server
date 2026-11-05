import { IGeocodingData } from "./geocoding.data.type";

export interface IGeocodingStorageByCoordinates {
    [city: string]: IGeocodingData,
}