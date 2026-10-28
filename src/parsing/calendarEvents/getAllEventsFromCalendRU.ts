import puppeteer from "puppeteer";
import { ICalendarEvents } from "./types";
import { getEventsFromOneCalendarDayFromCalendRU } from "./getEventsFromOneCalendarDayFromCalendRU";
import { IResponse } from "../../types";

// ! Парсинг ВСЕХ событий календаря ЦЕЛОГО года с сайта https://www.calend.ru/day .

// ! Извлекается общая информация о событиях каждого календарного дня
// ! типа "Праздники", "А также в этот день", "Народный календарь", 
// ! "Именины", "Хроника", "Персоны" со страницы /day .

// ! Данные хранятся в /data/calendarEvents/calendarEvents.json .

// ! Последнее извлечение ВСЕХ событий - 28.10.2026 .

const EACH_MONTH_DAYS_NUMBER = [31, new Date().getFullYear() % 4 !== 0 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export async function getAllEventsFromCalendRU(): Promise<IResponse<ICalendarEvents>> {

    try {

        const browser = await puppeteer.launch();

        // const page = await browser.newPage();

        // await page.setRequestInterception(true);

        // page.on('request', (request) => {

        //     const resourceType = request.resourceType();

        //     const url = request.url().toLowerCase();

        //     // ! Блокируем «мусорные» скрипты по доменам

        //     if (resourceType === 'script') {

        //         if (
        //             url.includes('google-analytics') ||
        //             url.includes('doubleclick') ||
        //             url.includes('yandex-metrica') ||
        //             url.includes('hotjar') ||
        //             url.includes('matomo')
        //         ) {

        //             return request.abort();

        //         }
        //     }

        //     // Дальше обычная логика по типам

        //     if (
        //         [
        //             'image',
        //             'stylesheet',
        //             'font',
        //             'media',
        //             'beacon',
        //             'csp_report',
        //             'texttrack',
        //             'manifest',
        //             'eventsource',
        //             'websocket'
        //         ].includes(resourceType)) {

        //         return request.abort();

        //     }

        //     return request.continue();

        // });

        const calendarEvents: ICalendarEvents = [];

        console.log("Начало работы...");

        let count = 0;

        const seconds = [];

        for (let m = 0; m < EACH_MONTH_DAYS_NUMBER.length; m++) {

            const month = m + 1;

            for (let d = 0; d < EACH_MONTH_DAYS_NUMBER[m]; d++) {

                const day = d + 1;

                const t0 = performance.now();

                calendarEvents.push(
                    await getEventsFromOneCalendarDayFromCalendRU(browser, month, day)
                );

                const t1 = performance.now();

                const timeDifference = Number(((t1 - t0) / 1000).toFixed(3));

                seconds.push(timeDifference);

                console.log(
                    ++count,
                    "из",
                    EACH_MONTH_DAYS_NUMBER.reduce((prev, current) => prev + current, 0),
                    ":",
                    "День -",
                    day,
                    "Месяц -",
                    month,
                    "---",
                    "Время -",
                    timeDifference, 'Секунды.'
                );

            }

        }

        console.log("Завершено!");
        console.log(
            "Среднее время вычисления -",
            Number(((seconds.reduce((prev, current) => prev + current, 0)) / seconds.length).toFixed(2)),
            "Секунды."
        );

        await browser.close();

        return {

            success: true,

            status: 200,

            data: calendarEvents,

        };

    } catch (error: any) {

        return {

            success: false,

            status: 500,

            error: {
                message: ["Ошибка при парсинге сайта.", error.message].join(" "),
            },

        };

    }

}