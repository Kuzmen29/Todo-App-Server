import { Browser, Page } from "puppeteer";
import {
    ICalendarDay,
    ICalendarEventType,
    ICalendarEventHoliday,
    HOLIDAYS_TYPE,
    ICalendarEventThisDay,
    THIS_DAY_TYPE,
    ICalendarEventHomiesCal,
    HOMIES_CAL_TYPE,
    ICalendarEventNameDay,
    NAME_DAY_TYPE,
    ICalendarEventKnownDate,
    KNOWN_DATES_TYPE,
    ICalendarEventPerson,
    PERSONS_TYPE,
} from "./types";
import { CALEND_RU_URL } from "./urls";

// ! Парсинг событий одного календарного дня с сайта https://www.calend.ru/day .

// ! Извлекается общая информация о событиях 
// ! типа "Праздники", "А также в этот день", "Народный календарь", 
// ! "Именины", "Хроника", "Персоны" со страницы /day .

/**
 * 
 * @param page : Page
 * @param month : number
 * @param day : number
 * @returns Promise<ICalendarDay>
 * 
 */

export async function getEventsFromOneCalendarDayFromCalendRU(
    browser: Browser,
    month: number,
    day: number,
): Promise<ICalendarDay> {

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (request) => {

        const resourceType = request.resourceType();

        const url = request.url().toLowerCase();

        // ! Блокируем «мусорные» скрипты по доменам

        if (resourceType === 'script') {

            if (
                url.includes('google-analytics') ||
                url.includes('doubleclick') ||
                url.includes('yandex-metrica') ||
                url.includes('hotjar') ||
                url.includes('matomo')
            ) {

                return request.abort();

            }
        }

        // Дальше обычная логика по типам

        if (
            [
                'image',
                'stylesheet',
                'font',
                'media',
                'beacon',
                'csp_report',
                'texttrack',
                'manifest',
                'eventsource',
                'websocket'
            ].includes(resourceType)) {

            return request.abort();

        }

        return request.continue();

    });

    await page.goto(CALEND_RU_URL + "/" + month + "-" + day);

    const calendarEventTypes = await page.evaluate(() => {

        function getHolidays(holidaysInHTMLMarkup: string): Extract<
            ICalendarEventType,
            {
                type: typeof HOLIDAYS_TYPE,
            }
        > | null {

            const block = document.querySelector(`.${holidaysInHTMLMarkup}`);

            if (block) {

                const btntitle: HTMLAnchorElement | null = block.querySelector(`.${holidaysInHTMLMarkup} > .btntitle`);

                const type = btntitle && btntitle.textContent
                    ? btntitle.textContent.trim() as typeof HOLIDAYS_TYPE
                    : null;

                const href = btntitle && btntitle.href
                    ? btntitle.href
                    : null;

                if (type === null) {

                    throw new Error(`Название для '${HOLIDAYS_TYPE}' отсутствует.`);

                }

                if (href === null) {

                    throw new Error(`Ссылка на '${HOLIDAYS_TYPE}' отсутствует.`);

                }

                const itemsNet = block.querySelector(`.${holidaysInHTMLMarkup} > .itemsNet`);

                const itemsNetList = itemsNet
                    ? itemsNet.children
                    : null;

                if (itemsNetList === null) {

                    throw new Error(`События для '${HOLIDAYS_TYPE}' отсутствуют.`);

                }

                const events: ICalendarEventHoliday[] = [];

                for (const itemsNetItem of itemsNetList) {

                    const calendarHolidays: ICalendarEventHoliday = {};

                    const image = ((): ICalendarEventHoliday["image"] => {

                        const img: HTMLImageElement | null = itemsNetItem.querySelector(".image > a > img");

                        const src = img && img.src
                            ? img.src
                            : null;

                        const alt = img && img.alt
                            ? img.alt
                            : null;

                        return {
                            src,
                            alt,
                        };

                    })();

                    calendarHolidays.image = image;

                    const caption = itemsNetItem.querySelector(".caption");

                    if (caption !== null) {

                        const title = ((): ICalendarEventHoliday["title"] => {

                            const title = caption.querySelector('.caption > .title');

                            const a = title && title.querySelector('.title > a');

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            return {
                                text,
                            };

                        })();

                        calendarHolidays.title = title;

                        const mark = ((): ICalendarEventHoliday["mark"] => {

                            const hint = caption.querySelector('.caption > .title > .hint');

                            const year = hint && hint.textContent
                                ? hint.textContent.trim()
                                : null;

                            const hinted = caption.querySelector('.caption > .title > .hinted');

                            const text = [];

                            if (hinted) {

                                for (const elem of hinted.childNodes) {

                                    if (elem.nodeName === "#text" && elem.textContent) {

                                        text.push(elem.textContent.trim());

                                    }

                                }
                            }

                            return {
                                year,
                                text,
                            };

                        })();

                        calendarHolidays.mark = mark;

                        const type = ((): ICalendarEventHoliday["type"] => {

                            const link = caption.querySelector('.caption > .link');

                            const a: HTMLAnchorElement | null = link
                                ? link.querySelector(".link > a")
                                : null;

                            const title = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            const href = a && a.href
                                ? a.href
                                : null;

                            const img: HTMLImageElement | null = link
                                ? link.querySelector(".link > img")
                                : null;

                            const image = img && img.src
                                ? img.src
                                : null;

                            return {
                                title,
                                href,
                                image,
                            };

                        })();

                        calendarHolidays.type = type;

                        const description = ((): ICalendarEventHoliday["description"] => {

                            const descr = caption.querySelector('.caption > .descr');

                            const a: HTMLAnchorElement | null = descr
                                ? descr.querySelector(".descr > a")
                                : null;

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            const href = a && a.href
                                ? a.href
                                : null;

                            return {
                                text,
                                href,
                            };

                        })();

                        calendarHolidays.description = description;

                        calendarHolidays.href = description
                            ? description.href
                            : null;

                        events.push(calendarHolidays);

                    }
                }

                return {
                    href,
                    type,
                    events,
                };

            } else {

                return null;
            }

        }

        function getThisDay(thisDayInHTMLMarkup: string): Extract<
            ICalendarEventType,
            {
                type: typeof THIS_DAY_TYPE,
            }
        > | null {

            const block = document.querySelector(`.${thisDayInHTMLMarkup}`);

            if (block) {

                const btntitle = block.querySelector(`.${thisDayInHTMLMarkup} > .btntitle`);

                const type = btntitle && btntitle.textContent
                    ? btntitle.textContent.trim() as typeof THIS_DAY_TYPE
                    : null;

                if (type === null) {

                    throw new Error(`Название для '${THIS_DAY_TYPE}' отсутствует.`);

                }

                const p = block.querySelector(`.${thisDayInHTMLMarkup} > p`);

                const description = p && p.textContent
                    ? p.textContent.trim()
                    : null;

                const itemsNet = block.querySelector(`.${thisDayInHTMLMarkup} > .itemsNet`);

                const itemsNetList = itemsNet
                    ? itemsNet.children
                    : null;

                if (itemsNetList === null) {

                    throw new Error(`События для '${THIS_DAY_TYPE}' отсутствуют.`);
                }

                const events: ICalendarEventThisDay[] = [];

                for (const itemsNetItem of itemsNetList) {

                    const calendarEventThisDay: ICalendarEventThisDay = {};

                    const image = ((): ICalendarEventThisDay["image"] => {

                        const img: HTMLImageElement | null = itemsNetItem.querySelector(".image > a > img");

                        const src = img && img.src
                            ? img.src
                            : null;

                        const alt = img && img.alt
                            ? img.alt
                            : null;

                        return {
                            src,
                            alt,
                        };

                    })();

                    calendarEventThisDay.image = image;

                    const caption = itemsNetItem.querySelector(".caption");

                    if (caption !== null) {

                        const title = ((): ICalendarEventThisDay["title"] => {

                            const title = caption.querySelector('.caption > .title');

                            const a = title && title.querySelector('.title > a');

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            return {
                                text,
                            };

                        })();

                        calendarEventThisDay.title = title;

                        const type = ((): ICalendarEventThisDay["type"] => {

                            const type = caption.querySelector('.caption > .link');

                            const a: HTMLAnchorElement | null = type && type.querySelector(".link > a");

                            const title = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            const href = a && a.href
                                ? a.href
                                : null;

                            const img: HTMLImageElement | null = type && type.querySelector(".link > img");

                            const image = img && img.src
                                ? img.src
                                : null;

                            return {
                                title,
                                href,
                                image,
                            };

                        })();

                        calendarEventThisDay.type = type;

                        const description = ((): ICalendarEventThisDay["description"] => {

                            const descr = caption.querySelector('.caption > .descr');

                            const a: HTMLAnchorElement | null = descr && descr.querySelector(".descr > a");

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            const href = a && a.href
                                ? a.href
                                : null;

                            return {
                                text,
                                href,
                            };

                        })();

                        calendarEventThisDay.description = description;

                        calendarEventThisDay.href = description ? description.href : null;

                        events.push(calendarEventThisDay);

                    }
                }

                return {
                    type,
                    description,
                    events,
                };

            } else {

                return null;

            }

        }

        function getHomiesCal(homiesCalInHTMLMarkup: string):
            Extract<
                ICalendarEventType,
                {
                    type: typeof HOMIES_CAL_TYPE,
                }
            > | null {

            const block = document.querySelector(`.${homiesCalInHTMLMarkup}`);

            if (block) {

                const btntitle: HTMLAnchorElement | null = block.querySelector(`.${homiesCalInHTMLMarkup} > .btntitle`);

                const href = btntitle && btntitle.href
                    ? btntitle.href
                    : null;

                const type = btntitle && btntitle.textContent
                    ? btntitle.textContent.trim() as typeof HOMIES_CAL_TYPE
                    : null;

                if (type === null) {

                    throw new Error(`Название для '${HOMIES_CAL_TYPE}' отсутствует.`);

                }

                if (href === null) {

                    throw new Error(`Ссылка на '${HOMIES_CAL_TYPE}' отсутствует.`);

                }

                const itemsNet = block.querySelector(`.${homiesCalInHTMLMarkup} > .itemsNet`);

                const itemsNetList = itemsNet
                    ? itemsNet.children
                    : null;

                if (itemsNetList === null) {

                    throw new Error(`События для '${HOMIES_CAL_TYPE}' отсутствуют.`);

                }

                const events: ICalendarEventHomiesCal[] = [];

                for (const itemsNetItem of itemsNetList) {

                    const calendarHomiesCal: ICalendarEventHomiesCal = {};

                    const href = ((): ICalendarEventHomiesCal["href"] => {

                        const a: HTMLAnchorElement | null = itemsNetItem.querySelector("li > a");

                        return a && a.href
                            ? a.href
                            : null;

                    })();

                    calendarHomiesCal.href = href;

                    const image = ((): ICalendarEventHomiesCal["image"] => {

                        const img: HTMLImageElement | null = itemsNetItem.querySelector(".image > img");

                        const src = img && img.src
                            ? img.src
                            : null;

                        const alt = img && img.alt
                            ? img.alt
                            : null;

                        return {
                            src,
                            alt,
                        };

                    })();

                    calendarHomiesCal.image = image;

                    const caption = itemsNetItem.querySelector(".caption");

                    if (caption !== null) {

                        const title = ((): ICalendarEventHomiesCal["title"] => {

                            const title = caption.querySelector('.caption > .title');

                            return title && title.textContent
                                ? title.textContent.trim()
                                : null;

                        })();

                        calendarHomiesCal.title = title;

                        const description = ((): ICalendarEventHomiesCal["description"] => {

                            const descr = caption.querySelector('.caption > .descr');

                            const text = descr && descr.textContent
                                ? descr.textContent.trim()
                                : null;

                            const href = null;

                            return {
                                text,
                                href,
                            };

                        })();

                        calendarHomiesCal.description = description;

                        events.push(calendarHomiesCal);

                    }
                }

                return {
                    href,
                    type,
                    events,
                };

            } else {

                return null;

            }

        }

        function getNameDay(nameDayInHTMLMarkup: string):
            Extract<
                ICalendarEventType,
                {
                    type: typeof NAME_DAY_TYPE,
                }
            > | null {

            const block = document.querySelector(`.${nameDayInHTMLMarkup}`);

            if (block) {

                const btntitle: HTMLAnchorElement | null = block.querySelector(`.${nameDayInHTMLMarkup} > .btntitle`);

                const href = btntitle && btntitle.href
                    ? btntitle.href
                    : null;

                const type = btntitle && btntitle.textContent
                    ? btntitle.textContent.trim() as typeof NAME_DAY_TYPE
                    : null;

                if (type === null) {

                    throw new Error(`Название для '${NAME_DAY_TYPE}' отсутствует.`);

                }

                if (href === null) {

                    throw new Error(`Ссылка на '${NAME_DAY_TYPE}' отсутствует.`);

                }

                const itemsNet = block.querySelector(`.${nameDayInHTMLMarkup} > .itemsNet`);

                const itemsNetList = itemsNet
                    ? itemsNet.children
                    : null;

                if (itemsNetList === null) {

                    throw new Error(`События для '${NAME_DAY_TYPE}' отсутствуют.`);

                }

                const events: ICalendarEventNameDay[] = [];

                for (const itemsNetItem of itemsNetList) {

                    const calendarEventNameDay: ICalendarEventNameDay = {};

                    const image = ((): ICalendarEventNameDay["image"] => {

                        const img: HTMLImageElement | null = itemsNetItem.querySelector(".image > a > img");

                        const src = img && img.src
                            ? img.src
                            : null;

                        const alt = img && img.alt
                            ? img.alt
                            : null;

                        return {
                            src,
                            alt,
                        };

                    })();

                    calendarEventNameDay.image = image;

                    const caption = itemsNetItem.querySelector(".caption");

                    if (caption !== null) {

                        const title = ((): ICalendarEventNameDay["title"] => {

                            const title = caption.querySelector('.caption > .title');

                            const text = title && title.textContent
                                ? title.textContent.trim()
                                : null;

                            const p = caption.querySelector('.caption > p');

                            const description = p && p.textContent
                                ? p.textContent.trim()
                                : null;

                            return {
                                text,
                                description,
                            };

                        })();

                        calendarEventNameDay.title = title;

                        const href = ((): ICalendarEventNameDay["href"] => {

                            const a: HTMLAnchorElement | null = caption.querySelector('.caption > .title');

                            return a && a.href
                                ? a.href
                                : null;

                        })();

                        calendarEventNameDay.href = href;

                        events.push(calendarEventNameDay);

                    }
                }

                return {
                    href,
                    type,
                    events,
                };

            } else {

                return null;

            }

        }

        function getKnownDates(knownDatesInHTMLMarkup: string):
            Extract<
                ICalendarEventType,
                {
                    type: typeof KNOWN_DATES_TYPE,
                }
            > | null {

            const block = document.querySelector(`.${knownDatesInHTMLMarkup}`);

            if (block) {

                const btntitle: HTMLAnchorElement | null = block.querySelector(`.${knownDatesInHTMLMarkup} > .btntitle`);

                const href = btntitle && btntitle.href
                    ? btntitle.href
                    : null;

                const type = btntitle && btntitle.textContent
                    ? btntitle.textContent.trim() as typeof KNOWN_DATES_TYPE
                    : null;

                if (type === null) {

                    throw new Error(`Название для '${KNOWN_DATES_TYPE}' отсутствует.`);

                }

                if (href === null) {

                    throw new Error(`Ссылка на '${KNOWN_DATES_TYPE}' отсутствует.`);

                }

                const subtitle = block.querySelector(`.${knownDatesInHTMLMarkup} > .subtitle`);

                const description = subtitle && subtitle.textContent
                    ? subtitle.textContent.trim()
                    : null;

                const itemsNet = block.querySelector(`.${knownDatesInHTMLMarkup} > .itemsNet`);

                const itemsNetList = itemsNet
                    ? itemsNet.children
                    : null;

                if (itemsNetList === null) {

                    throw new Error(`События для '${KNOWN_DATES_TYPE}' отсутствуют.`);

                }

                const events: ICalendarEventKnownDate[] = [];

                for (const itemsNetItem of itemsNetList) {

                    const calendarEventKnownDate: ICalendarEventKnownDate = {};

                    const image = ((): ICalendarEventKnownDate["image"] => {

                        const img: HTMLImageElement | null = itemsNetItem.querySelector(".image > a > img");

                        const src = img && img.src
                            ? img.src
                            : null;

                        const alt = img && img.alt
                            ? img.alt
                            : null;

                        return {
                            src,
                            alt,
                        };

                    })();

                    calendarEventKnownDate.image = image;

                    const caption = itemsNetItem.querySelector(".caption");

                    if (caption !== null) {

                        const year = ((): ICalendarEventKnownDate["year"] => {

                            const year = caption.querySelector('.caption > .year');

                            return year && year.textContent
                                ? year.textContent.trim()
                                : null;

                        })();

                        calendarEventKnownDate.year = year;

                        const title = ((): ICalendarEventKnownDate["title"] => {

                            const title = caption.querySelector('.caption > .title');

                            const a = title && title.querySelector('.title > a');

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            return {
                                text,
                            };

                        })();

                        calendarEventKnownDate.title = title;

                        const description = ((): ICalendarEventKnownDate["description"] => {

                            const descr = caption.querySelector('.caption > .descr');

                            const a: HTMLAnchorElement | null = descr && descr.querySelector(".descr > a");

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            const href = a && a.href
                                ? a.href
                                : null;

                            return {
                                text,
                                href,
                            };

                        })();

                        calendarEventKnownDate.description = description;

                        calendarEventKnownDate.href = description
                            ? description.href
                            : null;

                        events.push(calendarEventKnownDate);

                    }
                }

                return {
                    type,
                    description,
                    events,
                };

            } else {

                return null;

            }

        }

        function getPersons(personsInHTMLMarkup: string):
            Extract<
                ICalendarEventType,
                {
                    type: typeof PERSONS_TYPE,
                }
            > | null {

            const block = document.querySelector(`.${personsInHTMLMarkup}`);

            if (block) {

                const btntitle: HTMLAnchorElement | null = block.querySelector(`.${personsInHTMLMarkup} > .btntitle`);

                const href = btntitle && btntitle.href
                    ? btntitle.href
                    : null;

                const type = btntitle && btntitle.textContent
                    ? btntitle.textContent.trim() as typeof PERSONS_TYPE
                    : null;

                if (type === null) {

                    throw new Error(`Название для '${PERSONS_TYPE}' отсутствует.`);

                }

                if (href === null) {

                    throw new Error(`Ссылка на '${PERSONS_TYPE}' отсутствует.`);

                }

                const itemsNet = block.querySelector(`.${personsInHTMLMarkup} > .itemsNet`);

                const itemsNetList = itemsNet
                    ? itemsNet.children
                    : null;

                if (itemsNetList === null) {

                    throw new Error(`События для '${PERSONS_TYPE}' отсутствуют.`);

                }

                const events: ICalendarEventPerson[] = [];

                for (const itemsNetItem of itemsNetList) {

                    const calendarEventPerson: ICalendarEventPerson = {};

                    const birthday = itemsNetItem.classList.contains("birth");

                    calendarEventPerson.birthday = birthday;

                    const image = ((): ICalendarEventPerson["image"] => {

                        const img: HTMLImageElement | null = itemsNetItem.querySelector(".image > a > img");

                        const src = img && img.src
                            ? img.src
                            : null;

                        const alt = img && img.alt
                            ? img.alt
                            : null;

                        return {
                            src,
                            alt,
                        };

                    })();

                    calendarEventPerson.image = image;

                    const caption = itemsNetItem.querySelector(".caption");

                    if (caption !== null) {

                        const years = ((): ICalendarEventPerson["years"] => {

                            const year1 = caption.querySelector('.caption > .year');

                            const birth = year1 && year1.textContent
                                ? year1.textContent.trim()
                                : null;

                            const year2 = caption.querySelector('.caption > .year2');

                            const death = year2 && year2.textContent
                                ? year2.textContent.trim()
                                : null;

                            return {
                                birth,
                                death,
                            };

                        })();

                        calendarEventPerson.years = years;

                        const title = ((): ICalendarEventPerson["title"] => {

                            const title = caption.querySelector('.caption > .title');

                            const a = title && title.querySelector('.title > a');

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            const span = title && title.querySelector(".title > span");

                            const description = span && span.textContent
                                ? span.textContent.trim()
                                : null;

                            return {
                                text,
                                description,
                            };

                        })();

                        calendarEventPerson.title = title;

                        const description = ((): ICalendarEventPerson["description"] => {

                            const descr = caption.querySelector('.caption > .descr');

                            const a: HTMLAnchorElement | null = descr && descr.querySelector(".descr > a");

                            const text = a && a.textContent
                                ? a.textContent.trim()
                                : null;

                            const href = a && a.href
                                ? a.href
                                : null;

                            return {
                                text,
                                href,
                            };

                        })();

                        calendarEventPerson.description = description;

                        calendarEventPerson.href = description
                            ? description.href
                            : null;

                        events.push(calendarEventPerson);

                    }
                }

                return {
                    href,
                    type,
                    events,
                };

            } else {

                return null;

            }

        }

        const calendarEventTypes: ICalendarEventType[] = [];

        const holidays = getHolidays("holidays");

        // ! Праздники

        if (holidays) {
            calendarEventTypes.push(holidays);
        } else {
            throw new Error(`Отсутствуют '${HOLIDAYS_TYPE}'.`);
        }

        // ! А также в этот день

        const thisDay = getThisDay("thisDay");

        if (thisDay) {
            calendarEventTypes.push(thisDay);
        }

        // ! Народный календарь

        const homiesCal = getHomiesCal("homiesCal");

        if (homiesCal) {
            calendarEventTypes.push(homiesCal);
        }

        // ! Именины

        const nameDay = getNameDay("nameDay");

        if (nameDay) {
            calendarEventTypes.push(nameDay);
        }

        // ! Хроника

        const knownDates = getKnownDates("knownDates");

        if (knownDates) {
            calendarEventTypes.push(knownDates);
        }

        // ! Персоны

        const persons = getPersons("persons");

        if (persons) {
            calendarEventTypes.push(persons);
        }

        return calendarEventTypes;

    });

    // ! Экспериментальная функция (Требует доработки)

    await (async function (page: Page) {

        for (const calendarEventType of calendarEventTypes) {

            for (const event of calendarEventType.events) {

                if (event.href) {

                    await page.goto(event.href);

                    const text = await page.evaluate(() => {

                        const maintext = document.querySelector('.maintext');

                        const children = maintext
                            ? maintext.children
                            : null;

                        if (children) {

                            let text = "";

                            for (const element of children) {

                                if (element.tagName === "H2") {

                                    break;
                                }

                                if (element.tagName === "P" && element.textContent) {

                                    text += element.textContent + " ";
                                }
                            }

                            return text;

                        } else {

                            return null;

                        }

                    });

                    if (text) {

                        if (event.description) {

                            event.description.text = text.trim();

                        } else {

                            event.description = {
                                text,
                                href: event.href,
                            };

                        }

                    }
                }

            }
        }

    })(page);

    const calendarDay: ICalendarDay = {
        month,
        day,
        events: calendarEventTypes,
    };

    await page.close();

    return calendarDay;

}