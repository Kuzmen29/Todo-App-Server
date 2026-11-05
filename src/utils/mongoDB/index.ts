import { MongoClient } from "mongodb";

const MONGO_DB_URL = process.env.MONGO_DB_URL;

let mongoClient: MongoClient | null = null;

try {

    if (MONGO_DB_URL) {
        mongoClient = new MongoClient(MONGO_DB_URL);
    }

} catch (error) {

    console.log(error);

}

export const mongoDB = mongoClient;