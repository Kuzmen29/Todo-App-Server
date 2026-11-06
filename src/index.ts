import express from "express";
import formidableMiddleware from "express-formidable";
import cors from "cors";
import 'dotenv/config';
import {
    calendarEventsAPI,
    geocodingAPI,
    logsAPI,
    settlementsAPI,
    weatherAPI
} from "@api";

const app = express();

app.use(cors());

app.use(formidableMiddleware());

const options = {
    app,
};

settlementsAPI(options);

logsAPI(options);

geocodingAPI(options);

weatherAPI(options);

calendarEventsAPI(options);

const PORT = process.env.PORT ?? 3000;

const HOST = process.env.HOST ?? "http://localhost:";

app.listen(
    PORT,
    () => console.log('Сервер стартовал на', `${HOST}${PORT}`)
);