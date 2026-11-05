import { IGeocodingData } from "./geocoding.data.type";

export interface IGeocodingStorageByCities {
    [city: string]: IGeocodingData,
}