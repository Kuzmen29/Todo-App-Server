import puppeteer from 'puppeteer';
import { IParsingResponse } from '@types';
import { IRussianCityInRussianAndEnglish } from './types';

// ! Получение ограниченного количества населенных пунктов России 
// ! из английской Википедии по алфавиту - 
// ! - https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Russia
// ! c названиями на русском и английском языках.

// ! На 30.07.2026 1115 населенных пунктов России в таблице.
// ! На 29.10.2026 1116 населенных пунктов России в таблице.

// ! Данные хранятся в /data/settlements/citiesAndTownsInRussia.json

interface IEvaluteResult {

    data: IRussianCityInRussianAndEnglish[],

    error: string[],

}

export async function getCitiesAndTownsInRussiaFromWikipedia(): Promise<
    IParsingResponse<{
        total: number | null,
        citiesAndTownsInRussia: IRussianCityInRussianAndEnglish[],
        errors: string[],
    }>
> {

    try {

        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        console.log("Начало работы...");

        const programStartTime = performance.now();

        await page.goto(
            'https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Russia',
            {
                timeout: 60000,
            }
        );

        let citiesAndTownsInRussia: IRussianCityInRussianAndEnglish[] = [];

        let evaluteResult = await page.evaluate(() => {

            const evaluteResult: IEvaluteResult = {
                data: [],
                error: [],
            };

            const wikitable = document.querySelector('.wikitable');

            if (wikitable) {

                const body = wikitable.getElementsByTagName('TBODY');

                if (body && body.length) {

                    const list = body[0];

                    for (const tr of list.children) {

                        const firstTD = tr.children[0];

                        const firstTDAnchorElement = firstTD.getElementsByTagName('A') as HTMLCollectionOf<HTMLAnchorElement>;

                        const city = firstTDAnchorElement.length > 0 && firstTDAnchorElement[0].textContent
                            ? firstTDAnchorElement[0].textContent
                            : firstTD.textContent
                                ? firstTD.textContent
                                : null;

                        const cityHref = firstTDAnchorElement.length > 0 && firstTDAnchorElement[0].href
                            ? firstTDAnchorElement[0].href
                            : null;

                        const secondTD = tr.children[1];

                        const russianName = secondTD && secondTD.textContent
                            ? secondTD.textContent
                            : null;

                        const thirdTD = tr.children[2];

                        const thirdTDAnchorElement = thirdTD.getElementsByTagName('A') as HTMLCollectionOf<HTMLAnchorElement>;

                        const federalSubject = thirdTDAnchorElement.length > 0 && thirdTDAnchorElement[0].textContent
                            ? thirdTDAnchorElement[0].textContent
                            : thirdTD.textContent
                                ? thirdTD.textContent
                                : null;

                        const federalSubjectHref = thirdTDAnchorElement.length > 0 && thirdTDAnchorElement[0].href
                            ? thirdTDAnchorElement[0].href
                            : null;

                        evaluteResult.data.push({
                            city,
                            cityHref,
                            federalSubject,
                            federalSubjectHref,
                            russianName,
                        });

                    }

                } else {

                    evaluteResult.error.push("Тело таблицы отсутствует.");
                }

            } else {

                evaluteResult.error.push("Таблица отсутствует.");
            }

            return evaluteResult;

        })

        const citiesNumber = evaluteResult.data.length;

        citiesAndTownsInRussia.push(...evaluteResult.data);

        const programEndTime = performance.now();

        const programTimeDifference = Number(((programEndTime - programStartTime) / 1000).toFixed(3));

        console.log("Завершено!");

        console.log("Найдено количество населённых пунктов -", citiesAndTownsInRussia.length);

        console.log(
            "Программа выполнилась за",
            programTimeDifference > 60
                ? Number((programTimeDifference / 60).toFixed(3))
                : Number(programTimeDifference),
            programTimeDifference > 60
                ? "Минут"
                : "Секунд."
        );

        await browser.close();

        return {
            success: true,
            data: {
                total: citiesNumber,
                citiesAndTownsInRussia,
                errors: evaluteResult.error,
            },
        };

    } catch (error: any) {

        return {
            success: false,
            error: {
                message: error.message,
            },
        };
    }
}