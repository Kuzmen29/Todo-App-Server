import puppeteer from 'puppeteer';
import { IParsingResponse } from '@types';
import { ISettlement } from './types';

// ! Получение списка ВСЕХ населённых пунктов мира из Википедии по алфавиту - 
// ! - https://ru.wikipedia.org/wiki/Категория:Населённые_пункты_по_алфавиту 
// ! на 30.07.2026 332710 населенных пунктов в мире.
// ! на 29.10.2026 333424 населенных пунктов в мире.

// ! Данные хранятся в /data/settlements/settlements.json

interface IEvaluteResult {

    followingPageLink: string | null,

    data: ISettlement[],

    error: string[],
}

export async function getSettlementsAlphabeticallyFromWikipedia(): Promise<
    IParsingResponse<{
        total: number | null,
        settlements: ISettlement[],
        errors: string[],
    }>
> {

    try {

        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        await page.goto('https://ru.wikipedia.org/wiki/Категория:Населённые_пункты_по_алфавиту');

        const settlements: ISettlement[] = [];

        let isFollowingPageLink = true;

        const errors: string[] = [];

        // ! Доработать

        const settlementsNumber = await page.evaluate(() => {

            const settlementsNumberSections: NodeListOf<HTMLAnchorElement> = document
                .querySelectorAll("a[title^='Википедия:Категоризация/FAQ']");

            for (const section of settlementsNumberSections) {

                const p = section.parentElement;

                if (p && p.textContent) {

                    const numbers = p.textContent.match(/из (.+?), находящихся в данной категории./);

                    if (numbers && numbers.length === 1) {

                        return Number(
                            numbers[1]
                                .split("")
                                .filter((digit) => {
                                    if (
                                        digit === "0" || digit === "1" || digit === "2" || digit === "3" || digit === "4" ||
                                        digit === "5" || digit === "6" || digit === "7" || digit === "8" || digit === "9"
                                    ) {

                                        return true;
                                    } else {

                                        return false;
                                    }
                                })
                                .join("")
                        );

                    } else {

                        return null;
                    }

                } else {

                    return null;
                }

            }

            return null;
        });

        const programStartTime = performance.now();

        console.log("Начало работы...");

        let count = 0;

        const seconds = [];

        while (isFollowingPageLink) {

            const t0 = performance.now();

            const evaluteResult = await page.evaluate(() => {

                const evaluteResult: IEvaluteResult = {
                    data: [],
                    followingPageLink: null,
                    error: [],
                };

                // ! Получаем все группы букв на странице (Например, группа слов, начинающихся на А и т.д.)
                // ! Класс каждой группы - .mw-category-group

                const allLetterGroups = document.querySelectorAll('.mw-category-group');

                if (allLetterGroups) {

                    for (const letterGroup of allLetterGroups) {

                        const ul = letterGroup.getElementsByTagName('UL');

                        if (ul && ul.length > 0) {

                            for (const li of ul[0].children) {

                                const item: HTMLAnchorElement | null = li.querySelector("li > a");

                                if (item) {

                                    if (item.textContent) {

                                        const name = item.textContent;

                                        if (item.href) {

                                            const href = item.href;

                                            evaluteResult.data.push({
                                                name,
                                                href,
                                            });

                                        } else {

                                            evaluteResult.error.push(`Для населённого пункта '${name}' не найдена ссылка.`);
                                        }

                                    } else {

                                        evaluteResult.error.push(`Не найдено название населённого пункта в элементе списка.`);
                                    }

                                } else {

                                    evaluteResult.error.push('Не найден элемент списка.');
                                }

                            }
                        } else {

                            evaluteResult.error.push('Не найден список в группе буквы.');
                        }
                    }
                } else {

                    evaluteResult.error.push('Не найдены группы букв на странице.');
                }

                let followingPageButtons: NodeListOf<HTMLAnchorElement> = document
                    .querySelectorAll("a[title^='Категория:Населённые пункты по алфавиту']");

                for (const button of followingPageButtons) {

                    if (button.textContent) {

                        if (button.textContent.includes('Следующая страница')) {

                            evaluteResult.followingPageLink = button.href;

                            break;

                        } else {

                            evaluteResult.followingPageLink = null;
                        }

                    }
                }

                return evaluteResult;

            });

            settlements.push(...evaluteResult.data);

            errors.push(...evaluteResult.error);

            if (evaluteResult.followingPageLink !== null) {

                await page.goto(evaluteResult.followingPageLink);

            } else {

                isFollowingPageLink = false;

            }

            const t1 = performance.now();

            const timeDifference = Number(((t1 - t0) / 1000).toFixed(3));

            seconds.push(timeDifference);

            console.log(
                ++count,
                "страница",
                "из",
                settlementsNumber ? Math.ceil(settlementsNumber / 200) : 0,
                "страниц",
                "Время -",
                timeDifference, 'Секунды.'
            );

        }

        const programEndTime = performance.now();

        const programTimeDifference = Number(((programEndTime - programStartTime) / 1000).toFixed(3));

        console.log("Завершено!");

        console.log("Найдено количество населённых пунктов -", settlements.length);

        console.log(
            "Программа выполнилась за",
            programTimeDifference > 60
                ? Number((programTimeDifference / 60).toFixed(3))
                : Number(programTimeDifference),
            programTimeDifference > 60
                ? "Минут"
                : "Секунд."
        );

        console.log(
            "Среднее время вычисления -",
            Number(((seconds.reduce((prev, current) => prev + current, 0)) / seconds.length).toFixed(2)),
            "Секунды."
        );

        await browser.close();

        return {
            success: true,
            data: {
                total: settlementsNumber,
                settlements,
                errors,
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