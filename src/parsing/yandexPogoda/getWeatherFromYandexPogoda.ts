import puppeteer from 'puppeteer';
import { IParsingResponse } from '@types';
import { IYandexPogoda } from './types';

export async function getWeatherFromYandexPogoda({
    latitude: lat,
    longitude: lon,
}: {
    latitude: number,
    longitude: number,
}): Promise<IParsingResponse<IYandexPogoda>> {

    try {

        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        await page.goto(`https://yandex.ru/pogoda/ru?lat=${lat}&lon=${lon}`);

        const result: IYandexPogoda = await page.evaluate(
            () => {

                // ***************

                const BASIC_TEMPERATURE_CLASS = "AppFactTemperature_content";

                const BASIC_TEMPERATURE_SIGN_CLASS = "AppFactTemperature_sign";
                const BASIC_TEMPERATURE_VALUE_CLASS = "AppFactTemperature_value";
                const BASIC_TEMPERATURE_DEGREE_CLASS = "AppFactTemperature_degree";

                // ***************

                const BASIC_CONDITION_CLASS = "AppFact_condition";

                const BASIC_WITHOUT_CHARACTER_CONDITION_CLASS = "FactWithoutCharacter_condition";

                const BASIC_CONDITION_STYLE_WEATHER_ICON_CLASS = "style_weatherIcon";

                // ***************

                const BASIC_FEELS_CLASS = "AppFact_feels__base";

                const BASIC_WITHOUT_CHARACTER_FEELS_CLASS = "FactWithoutCharacter_feels__base";

                // ***************

                const BASIC_YESTERDAY_CLASS = "AppFact_yesterday";

                const BASIC_WITHOUT_CHARACTER_YESTERDAY_CLASS = "FactWithoutCharacter_yesterday";

                const BASIC_YESTERDAY_SHORT_CLASS = "AppFact_yesterdayShort";

                const BASIC_WITHOUT_CHARACTER_YESTERDAY_SHORT_CLASS = "FactWithoutCharacter_yesterdayShort";


                // ***************

                const BASIC_WARNING_FIRST_TEXT_CLASS = "AppFact_warning__first_text";

                const BASIC_WITHOUT_CHARACTER_WARNING_FIRST_TEXT_CLASS = "FactWithoutCharacter_warning__first_text";

                const BASIC_WARNING_SECOND_CLASS = "AppFact_warning__second";

                const BASIC_WITHOUT_CHARACTER_WARNING_SECOND_CLASS = "FactWithoutCharacter_warning__second";

                // ***************

                const BASIC_DETAILS_CLASS = "AppFact_details";

                const BASIC_WITHOUT_CHARACTER_DETAILS_CLASS = "FactWithoutCharacter_details";

                // ***************

                const WARNINGS_WRAP_CLASS = "AppWarnings_wrap";

                const WARNINGS_ITEM_WARNING_TITLE_CLASS = "AppWarningsItemWarning_title";

                const WARNINGS_ITEM_WARNING_TEXT_CLASS = "AppWarningsItemWarning_text";

                const WARNINGS_ITEM_WARNING_ICON_CLASS = "style_weatherIcon";

                // ***************

                const HOURLY_LIST_CLASS = "AppHourly_list";

                const HOURLY_ITEM_CONTENT_CLASS = "AppHourlyItem_content";

                const HOURLY_ITEM_TIME_CLASS = "AppHourlyItem_time";

                const HOURLY_ITEM_STYLE_WEATHER_ICON_CLASS = "style_weatherIcon";

                const HOURLY_ITEM_STYLE_WEATHER_ICON_IMAGE_CLASS = "style_icon";

                const HOURLY_ITEM_SECONDARY_CLASS = "AppHourlyItem_secondary";

                const HOURLY_ITEM_MAIN_CLASS = "AppHourlyItem_main";

                const HOURLY_ITEM_TEMPERATURE_CLASS = HOURLY_ITEM_MAIN_CLASS;

                const HOURLY_ITEM_HUMIDITY_CLASS = HOURLY_ITEM_SECONDARY_CLASS;

                // ***************

                const EXTENDED_DETAILS_CONTAINER_CLASS = "AppWarningsItemWeather_container";

                const EXTENDED_DETAILS_PROP_CLASS = "AppWarningsItemWeather_prop";

                const EXTENDED_DETAILS_TITLE_CLASS = "AppWarningsItemWeather_title";

                const EXTENDED_DETAILS_VALUE_CLASS = "AppWarningsItemWeather_value";

                // ***************

                const WELL_BEING_CARDS_MAIN_CARDS_CLASS = "AppWellBeingCardsMain_cards";

                const WELL_BEING_CARD_DESCRIPTION_TITLE_CLASS = "AppWellBeingCard_description__title";

                const WELL_BEING_CARD_DESCRIPTION_SUBTITLE_CLASS = "AppWellBeingCard_description__subtitle";


                const MOON_IMAGE_CLASS = "AppMoonImage_image";


                const MAGNETIC_STORMS_RANGE_CLASS = "AppMagneticStormsRange_range";

                const MAGNETIC_STORMS_RANGE_NUMBER_CLASS = "AppMagneticStormsRange_range__number";

                const MAGNETIC_STORMS_RANGE_UNIT_CLASS = "AppMagneticStormsRange_range__unit";


                const UV_INDEX_RANGE_CLASS = "UvIndexRange_range";

                const UV_INDEX_RANGE_NUMBER_CLASS = "UvIndexRange_range__number";


                const ATMOSPHERIC_PRESSURE_RANGE_CLASS = "AppRangeWithSpace_chart";

                const ATMOSPHERIC_PRESSURE_RANGE_NUMBER_CLASS = "AppRangeWithSpace_chart__description";

                // ***************

                const SHORT_FORECAST_CLASS = "AppShortForecastContainer_days";

                const SHORT_FORECAST_DAY_CONTAINER_CLASS = "AppShortForecastDay_container";

                const SHORT_FORECAST_TEMPERATURE_CLASS = "AppShortForecastDay_temperature";

                const SHORT_FORECAST_HREF_CLASS = "AppLink_link";

                const SHORT_FORECAST_ICON_CLASS = "style_weatherIcon";

                const SHORT_FORECAST_TITLE_CLASS = "AppShortForecastDay_title";

                const SHORT_FORECAST_DATE_CLASS = "AppShortForecastDay_subtitle";

                // ***************

                const FORECAST_CLASS = "MainPage_appForecast";

                const FORECAST_DAY_CARD_CLASS = "AppForecastDay_dayCard";

                const FORECAST_DAY_CONTAINER_CLASS = "AppForecastDay_container";

                const FORECAST_WEATHER_ICON_CLASS = "style_weatherIcon";

                const FORECAST_DAY_TITLE_CLASS = "day-title";
                const FORECAST_FEELS_TITLE_CLASS = "feels-title";
                const FORECAST_WIND_TITLE_CLASS = "wind-title";
                const FORECAST_HUM_TITLE_CLASS = "hum-title";
                const FORECAST_PRESS_TITLE_CLASS = "press-title";

                const FORECAST_PART_MORNING_CLASS = "m-part";
                const FORECAST_TEXT_MORNING_CLASS = "m-text";
                const FORECAST_FEELS_MORNING_CLASS = "m-feels";
                const FORECAST_WIND_MORNING_CLASS = "m-wind";
                const FORECAST_HUM_MORNING_CLASS = "m-hum";
                const FORECAST_DIR_MORNING_CLASS = "m-dir";
                const FORECAST_TEMP_MORNING_CLASS = "m-temp";
                const FORECAST_PRESS_MORNING_CLASS = "m-press";

                const FORECAST_PART_DAY_CLASS = "d-part";
                const FORECAST_TEXT_DAY_CLASS = "d-text";
                const FORECAST_FEELS_DAY_CLASS = "d-feels";
                const FORECAST_WIND_DAY_CLASS = "d-wind";
                const FORECAST_HUM_DAY_CLASS = "d-hum";
                const FORECAST_DIR_DAY_CLASS = "d-dir";
                const FORECAST_TEMP_DAY_CLASS = "d-temp";
                const FORECAST_PRESS_DAY_CLASS = "d-press";

                const FORECAST_PART_EVENING_CLASS = "e-part";
                const FORECAST_TEXT_EVENING_CLASS = "e-text";
                const FORECAST_FEELS_EVENING_CLASS = "e-feels";
                const FORECAST_WIND_EVENING_CLASS = "e-wind";
                const FORECAST_HUM_EVENING_CLASS = "e-hum";
                const FORECAST_DIR_EVENING_CLASS = "e-dir";
                const FORECAST_TEMP_EVENING_CLASS = "e-temp";
                const FORECAST_PRESS_EVENING_CLASS = "e-press";

                const FORECAST_PART_NIGHT_CLASS = "n-part";
                const FORECAST_TEXT_NIGHT_CLASS = "n-text";
                const FORECAST_FEELS_NIGHT_CLASS = "n-feels";
                const FORECAST_WIND_NIGHT_CLASS = "n-wind";
                const FORECAST_HUM_NIGHT_CLASS = "n-hum";
                const FORECAST_DIR_NIGHT_CLASS = "n-dir";
                const FORECAST_TEMP_NIGHT_CLASS = "n-temp";
                const FORECAST_PRESS_NIGHT_CLASS = "n-press";


                const FORECAST_DAY_DURATION_INFO_CLASS = "AppForecastDayDuration_info";

                const FORECAST_DAY_DURATION_ITEM_CLASS = "AppForecastDayDuration_item";

                const FORECAST_DAY_DURATION_ITEM_TEXT_CLASS = "AppForecastDayDuration_text";

                const FORECAST_DAY_DURATION_ITEM_CAPTION_CLASS = "AppForecastDayDuration_caption";

                const FORECAST_DAY_DURATION_ITEM_VALUE_CLASS = "AppForecastDayDuration_value";

                const FORECAST_DAY_DURATION_ITEM_IMAGE_CLASS = "AppMoonImage_image";


                const FORECAST_DAY_DURATION_MOON_CLASS = "AppForecastDayDuration_moon";

                const FORECAST_DAY_DURATION_WATER_CLASS = "AppForecastDayDuration_water";

                // ***************

                function getBasicTemperature(): IYandexPogoda["basic"]["temperature"] {

                    const content = document.querySelector(
                        `[class^="${BASIC_TEMPERATURE_CLASS}"]`
                    );

                    const sign = content && content.querySelector(
                        `[class^="${BASIC_TEMPERATURE_SIGN_CLASS}"]`
                    );

                    const value = content && content.querySelector(
                        `[class^="${BASIC_TEMPERATURE_VALUE_CLASS}"]`
                    );

                    const degree = content && content.querySelector(`
                        [class^="${BASIC_TEMPERATURE_DEGREE_CLASS}"]`
                    );

                    return {
                        sign: sign && sign.textContent
                            ? sign.textContent.trim()
                            : null,

                        value: value && value.textContent
                            ? value.textContent.trim()
                            : null,

                        degree: degree && degree.textContent
                            ? degree.textContent.trim()
                            : null,
                    };

                }

                function getBasicConditionIcon(): IYandexPogoda["basic"]["icon"] {

                    const condition = document.querySelector(
                        `[class^="${BASIC_CONDITION_CLASS}"]`
                    ) || document.querySelector(
                        `[class^="${BASIC_WITHOUT_CHARACTER_CONDITION_CLASS}"]`
                    );

                    const weatherIcon = condition && condition.querySelector(
                        `[class^="${BASIC_CONDITION_STYLE_WEATHER_ICON_CLASS}"]`
                    );

                    // ! Иконка погодных условий задается с помощью переменной CSS, 
                    // ! которая потом используется в вычислениях, 
                    // ! которые сдвигают svg элемент с набором иконок к нужной иконке.

                    const icon = weatherIcon &&
                        getComputedStyle(weatherIcon).getPropertyValue('--icon');

                    return (
                        icon !== "" && icon !== null
                            ? Number(icon)
                            : null
                    );

                }

                function getBasicFeels(): IYandexPogoda["basic"]["feels"] {

                    const feels = document.querySelector(
                        `[class^="${BASIC_FEELS_CLASS}"]`
                    ) || document.querySelector(
                        `[class^="${BASIC_WITHOUT_CHARACTER_FEELS_CLASS}"]`
                    );

                    return feels && feels.textContent
                        ? feels.textContent.trim()
                        : null;
                }

                function getBasicYesterday(): IYandexPogoda["basic"]["yesterday"] {

                    const yesterdaySpans = ((): NodeListOf<Element> => {

                        let spans = document.querySelectorAll(
                            `[class^="${BASIC_YESTERDAY_CLASS}"]`
                        );

                        if (spans.length > 0) {

                            return spans;

                        }

                        spans = document.querySelectorAll(
                            `[class^="${BASIC_WITHOUT_CHARACTER_YESTERDAY_CLASS}"]`
                        );

                        if (spans.length > 0) {

                            return spans;

                        }

                        return spans;

                    })();

                    // ! В разметке два варианта:
                    // ! - короткая запись "Вчера было +7°"
                    // ! - длинная запись "Вчера в это время +7°"

                    // ! В зависимости от переменной isShort, выбираем нужное.

                    const yesterday = (() => {

                        if (yesterdaySpans.length > 0) {

                            for (const yesterdaySpan of yesterdaySpans) {

                                const classes = yesterdaySpan.classList;

                                let isShort = false;

                                for (const _class of classes) {

                                    if (
                                        _class.startsWith(BASIC_YESTERDAY_SHORT_CLASS) ||
                                        _class.startsWith(BASIC_WITHOUT_CHARACTER_YESTERDAY_SHORT_CLASS)
                                    ) {

                                        isShort = true;

                                    }

                                }

                                // ! Если инвертируем, то это длинная запись, 
                                // ! если не инвертируем - короткая запись.

                                if (!isShort) {

                                    return yesterdaySpan;
                                }

                            }

                            return null;

                        } else {

                            return null;
                        }

                    })();

                    return yesterday && yesterday.textContent
                        ? yesterday.textContent.trim()
                        : null;

                }

                function getBasicWarning(): IYandexPogoda["basic"]["warning"] {

                    const first = document.querySelector(
                        `[class^="${BASIC_WARNING_FIRST_TEXT_CLASS}"]`
                    ) || document.querySelector(
                        `[class^="${BASIC_WITHOUT_CHARACTER_WARNING_FIRST_TEXT_CLASS}"]`
                    );

                    const second = document.querySelector(
                        `[class^="${BASIC_WARNING_SECOND_CLASS}"]`
                    ) || document.querySelector(
                        `[class^="${BASIC_WITHOUT_CHARACTER_WARNING_SECOND_CLASS}"]`
                    );

                    return {

                        first: first && first.textContent
                            ? first.textContent.trim()
                            : null,

                        second: second && second.textContent
                            ? second.textContent.trim()
                            : null,
                    };

                }

                function getBasicDetails(): IYandexPogoda["basic"]["details"] {

                    const detailsUl = document.querySelector(
                        `[class^="${BASIC_DETAILS_CLASS}"]`
                    ) || document.querySelector(
                        `[class^="${BASIC_WITHOUT_CHARACTER_DETAILS_CLASS}"]`
                    );

                    const details: IYandexPogoda["basic"]["details"] = {
                        wind: null,
                        pressure: null,
                        humidity: null,
                        water: null,
                    };

                    if (detailsUl) {

                        for (const detailsLi of detailsUl.children) {

                            if (
                                detailsLi.nodeName === "LI" &&
                                detailsLi.textContent
                            ) {

                                if (detailsLi.textContent.includes("м/с")) {

                                    // ! Ветер

                                    details.wind = detailsLi.textContent.trim();

                                } else if (detailsLi.textContent.includes("°")) {

                                    // ! Температура воды

                                    details.water = detailsLi.textContent.trim();

                                } else if (detailsLi.textContent.includes("%")) {

                                    // ! Влажность

                                    details.humidity = detailsLi.textContent.trim();

                                } else {

                                    // ! Давление

                                    details.pressure = detailsLi.textContent.trim();

                                }

                            }

                        }

                    }

                    return details;
                }

                function getWarnings(): IYandexPogoda["warnings"] {

                    const warnings: IYandexPogoda["warnings"] = {

                        today: {

                            href: null,

                            icon: null,

                            title: null,

                            description: null,

                        },

                        tomorrow: {

                            href: null,

                            icon: null,

                            title: null,

                            description: null,

                        },

                        forThisWeek: {

                            href: null,

                            icon: null,

                            title: null,

                            description: null,

                        },

                        onWeekends: {

                            href: null,

                            icon: null,

                            title: null,

                            description: null,

                        },

                    };

                    const warningsWrap = document.querySelector(
                        `[class^="${WARNINGS_WRAP_CLASS}"]`
                    );

                    if (warningsWrap) {

                        for (const warning of warningsWrap.children) {

                            const warningTitle = warning.querySelector(
                                `[class^="${WARNINGS_ITEM_WARNING_TITLE_CLASS}"]`
                            );

                            const title = warningTitle && warningTitle.querySelector("span");

                            if (
                                title &&
                                title.textContent &&
                                (
                                    title.textContent.includes("Сегодня") ||
                                    title.textContent.includes("Завтра") ||
                                    title.textContent.includes("На этой неделе") ||
                                    title.textContent.includes("В выходные")
                                )
                            ) {
                                const weatherIcon = warning.querySelector(
                                    `[class^="${WARNINGS_ITEM_WARNING_ICON_CLASS}"]`
                                );

                                const icon = weatherIcon &&
                                    getComputedStyle(weatherIcon).getPropertyValue('--icon');

                                const description = warning.querySelector(
                                    `[class^="${WARNINGS_ITEM_WARNING_TEXT_CLASS}"]`
                                );

                                if ((title.textContent.includes("Сегодня"))) {

                                    warnings.today.href = (warning as HTMLAnchorElement).href
                                        ? (warning as HTMLAnchorElement).href
                                        : null;

                                    warnings.today.icon = icon !== "" &&
                                        icon !== null
                                        ? Number(icon)
                                        : null;

                                    warnings.today.title = title && title.textContent
                                        ? title.textContent.trim()
                                        : null;

                                    warnings.today.description = description && description.textContent
                                        ? description.textContent.trim()
                                        : null;

                                } else if (title.textContent.includes("Завтра")) {

                                    warnings.tomorrow.href = (warning as HTMLAnchorElement).href
                                        ? (warning as HTMLAnchorElement).href
                                        : null;

                                    warnings.tomorrow.icon = icon !== "" &&
                                        icon !== null
                                        ? Number(icon)
                                        : null;

                                    warnings.tomorrow.title = title && title.textContent
                                        ? title.textContent.trim()
                                        : null;

                                    warnings.tomorrow.description = description && description.textContent
                                        ? description.textContent.trim()
                                        : null;

                                } else if (title.textContent.includes("На этой неделе")) {

                                    warnings.forThisWeek.href = (warning as HTMLAnchorElement).href
                                        ? (warning as HTMLAnchorElement).href
                                        : null;

                                    warnings.forThisWeek.icon = icon !== "" &&
                                        icon !== null
                                        ? Number(icon)
                                        : null;

                                    warnings.forThisWeek.title = title && title.textContent
                                        ? title.textContent.trim()
                                        : null;

                                    warnings.forThisWeek.description = description && description.textContent
                                        ? description.textContent.trim()
                                        : null;

                                } else if (title.textContent.includes("В выходные")) {

                                    warnings.onWeekends.href = (warning as HTMLAnchorElement).href
                                        ? (warning as HTMLAnchorElement).href
                                        : null;

                                    warnings.onWeekends.icon = icon !== "" &&
                                        icon !== null
                                        ? Number(icon)
                                        : null;

                                    warnings.onWeekends.title = title && title.textContent
                                        ? title.textContent.trim()
                                        : null;

                                    warnings.onWeekends.description = description && description.textContent
                                        ? description.textContent.trim()
                                        : null;

                                }

                            }

                        }

                    }

                    return warnings;

                }

                function getHourly(): IYandexPogoda["hourly"] {

                    const hourlyList = document.querySelector(
                        `[class^="${HOURLY_LIST_CLASS}"]`
                    );

                    const hourly: IYandexPogoda["hourly"] = [];

                    if (hourlyList) {

                        for (const hourlyItem of hourlyList.children) {

                            const content = hourlyItem.querySelector(
                                `[class^="${HOURLY_ITEM_CONTENT_CLASS}"]`
                            );

                            if (content) {

                                const time: HTMLTimeElement | null = content.querySelector(
                                    `[class^="${HOURLY_ITEM_TIME_CLASS}"]`
                                );

                                const weatherIcon = content &&
                                    content.querySelector(
                                        `[class^="${HOURLY_ITEM_STYLE_WEATHER_ICON_CLASS}"]`
                                    );

                                const image: HTMLImageElement | null = content &&
                                    content.querySelector(
                                        `[class^="${HOURLY_ITEM_STYLE_WEATHER_ICON_IMAGE_CLASS}"]`
                                    );

                                // ! Иконка погодных условий задается с помощью переменной CSS, 
                                // ! которая потом используется в вычислениях, 
                                // ! которые сдвигают svg элемент с набором иконок к нужной иконке.

                                const icon = weatherIcon && getComputedStyle(weatherIcon).getPropertyValue('--icon');

                                const temperature = content.querySelector(
                                    `[class^="${HOURLY_ITEM_TEMPERATURE_CLASS}"]`
                                );

                                const humidity = content.querySelector(
                                    `[class^="${HOURLY_ITEM_HUMIDITY_CLASS}"]`
                                );

                                hourly.push({

                                    time: time && time.textContent
                                        ? time.textContent.trim()
                                        : null,

                                    datetime: time && time.dateTime
                                        ? time.dateTime
                                        : null,

                                    icon: icon !== "" && icon !== null
                                        ? Number(icon)
                                        : null,

                                    iconSrc: image && image.src
                                        ? image.src
                                        : null,

                                    humidity: humidity && humidity.textContent
                                        ? humidity.textContent.trim()
                                        : null,

                                    temperature: temperature && temperature.textContent
                                        ? temperature.textContent.trim()
                                        : null,

                                });

                            }
                        }

                        return hourly;

                    }

                    return hourly;

                }

                function getExtendedDetails(): IYandexPogoda["extendedDetails"] {

                    const extendedDetails: IYandexPogoda["extendedDetails"] = {

                        href: null,

                        details: {
                            wind: null,
                            pressure: null,
                            humidity: null,
                            water: null,
                        },

                    };

                    const container = document.querySelector(
                        `[class^="${EXTENDED_DETAILS_CONTAINER_CLASS}"]`
                    );

                    const a = container && container.parentElement as HTMLAnchorElement | null;

                    const href = a && a.href
                        ? a.href
                        : null;

                    extendedDetails.href = href;

                    const extendedDetailsProps = container && container.querySelectorAll(
                        `[class^="${EXTENDED_DETAILS_PROP_CLASS}"]`
                    );

                    if (extendedDetailsProps) {

                        for (const prop of extendedDetailsProps) {

                            const title = prop.querySelector(
                                `[class^="${EXTENDED_DETAILS_TITLE_CLASS}"]`
                            );

                            const value = prop.querySelector(
                                `[class^="${EXTENDED_DETAILS_VALUE_CLASS}"]`
                            );

                            if (value && value.textContent) {

                                if (value.textContent.includes("м/с")) {

                                    // ! Ветер

                                    extendedDetails.details.wind = {

                                        title: title && title.textContent
                                            ? title.textContent.trim()
                                            : null,

                                        value: value.textContent.trim(),

                                    };

                                } else if (value.textContent.includes("°")) {

                                    // ! Температура воды

                                    extendedDetails.details.water = {

                                        title: title && title.textContent
                                            ? title.textContent.trim()
                                            : null,

                                        value: value.textContent.trim(),

                                    };

                                } else if (value.textContent.includes("%")) {

                                    // ! Влажность

                                    extendedDetails.details.humidity = {

                                        title: title && title.textContent
                                            ? title.textContent.trim()
                                            : null,

                                        value: value.textContent.trim(),

                                    };

                                } else if (value.textContent.includes("мм рт.")) {

                                    // ! Давление

                                    extendedDetails.details.pressure = {

                                        title: title && title.textContent
                                            ? title.textContent.trim()
                                            : null,

                                        value: value.textContent.trim(),

                                    };

                                }

                            }

                        }

                    }

                    return extendedDetails;

                }

                function getMoon(): IYandexPogoda["moon"] {

                    const wellBeingCards = document.querySelector(
                        `[class^="${WELL_BEING_CARDS_MAIN_CARDS_CLASS}"]`
                    );

                    const image: HTMLImageElement | null = wellBeingCards &&
                        wellBeingCards.querySelector(
                            `[class^="${MOON_IMAGE_CLASS}"]`
                        );

                    const card = image &&
                        image.parentElement &&
                        image.parentElement.parentElement;

                    const title: HTMLAnchorElement | null = card && card.querySelector(
                        `[class^="${WELL_BEING_CARD_DESCRIPTION_TITLE_CLASS}"] > a`
                    );

                    const description = card && card.querySelector(
                        `[class^="${WELL_BEING_CARD_DESCRIPTION_SUBTITLE_CLASS}"]`
                    );

                    return {

                        href: title && title.href
                            ? title.href
                            : null,

                        src: image && image.src
                            ? image.src
                            : null,

                        title: title && title.textContent
                            ? title.textContent.trim()
                            : null,

                        description: description && description.textContent
                            ? description.textContent.trim()
                            : null,

                    };

                }

                function getMagneticStorms(): IYandexPogoda["magneticStorms"] {

                    const wellBeingCards = document.querySelector(
                        `[class^="${WELL_BEING_CARDS_MAIN_CARDS_CLASS}"]`
                    );

                    const magneticStormsRange = wellBeingCards &&
                        wellBeingCards.querySelector(
                            `[class^="${MAGNETIC_STORMS_RANGE_CLASS}"]`
                        );

                    const card = magneticStormsRange &&
                        magneticStormsRange.parentElement &&
                        magneticStormsRange.parentElement.parentElement;

                    const number = card && card.querySelector(
                        `[class^="${MAGNETIC_STORMS_RANGE_NUMBER_CLASS}"]`
                    );

                    const unit = card && card.querySelector(
                        `[class^="${MAGNETIC_STORMS_RANGE_UNIT_CLASS}"]`
                    );

                    const title: HTMLAnchorElement | null = card && card.querySelector(
                        `[class^="${WELL_BEING_CARD_DESCRIPTION_TITLE_CLASS}"] > a`
                    );

                    const description = card && card.querySelector(
                        `[class^="${WELL_BEING_CARD_DESCRIPTION_SUBTITLE_CLASS}"]`
                    );

                    return {

                        href: title && title.href
                            ? title.href
                            : null,

                        title: title && title.textContent
                            ? title.textContent.trim()
                            : null,

                        description: description && description.textContent
                            ? description.textContent.trim()
                            : null,

                        number: number && number.textContent
                            ? number.textContent.trim()
                            : null,

                        unit: unit && unit.textContent
                            ? unit.textContent.trim()
                            : null,

                    };

                }

                function getUvIndex(): IYandexPogoda["uvIndex"] {

                    const wellBeingCards = document.querySelector(
                        `[class^="${WELL_BEING_CARDS_MAIN_CARDS_CLASS}"]`
                    );

                    const uvIndexRange = wellBeingCards &&
                        wellBeingCards.querySelector(
                            `[class^="${UV_INDEX_RANGE_CLASS}"]`
                        );

                    const card = uvIndexRange &&
                        uvIndexRange.parentElement &&
                        uvIndexRange.parentElement.parentElement;

                    const number = card &&
                        card.querySelector(
                            `[class^="${UV_INDEX_RANGE_NUMBER_CLASS}"]`
                        );

                    const title: HTMLAnchorElement | null = card &&
                        card.querySelector(
                            `[class^="${WELL_BEING_CARD_DESCRIPTION_TITLE_CLASS}"] > a`
                        );

                    const description = card &&
                        card.querySelector(
                            `[class^="${WELL_BEING_CARD_DESCRIPTION_SUBTITLE_CLASS}"]`
                        );

                    return {

                        href: title && title.href
                            ? title.href
                            : null,

                        title: title && title.textContent
                            ? title.textContent.trim()
                            : null,

                        description: description && description.textContent
                            ? description.textContent.trim()
                            : null,

                        number: number && number.textContent
                            ? number.textContent.trim()
                            : null,

                    };

                }

                function getAtmosphericPressure(): IYandexPogoda["atmosphericPressure"] {

                    const wellBeingCards = document.querySelector(
                        `[class^="${WELL_BEING_CARDS_MAIN_CARDS_CLASS}"]`
                    );

                    const atmosphericPressureRange = wellBeingCards &&
                        wellBeingCards.querySelector(
                            `[class^="${ATMOSPHERIC_PRESSURE_RANGE_CLASS}"]`
                        );

                    const card = atmosphericPressureRange &&
                        atmosphericPressureRange.parentElement &&
                        atmosphericPressureRange.parentElement.parentElement;

                    const number = card &&
                        card.querySelector(
                            `[class^="${ATMOSPHERIC_PRESSURE_RANGE_NUMBER_CLASS}"]`
                        );

                    const title: HTMLAnchorElement | null = card &&
                        card.querySelector(
                            `[class^="${WELL_BEING_CARD_DESCRIPTION_TITLE_CLASS}"] > a`
                        );

                    const description = card &&
                        card.querySelector(
                            `[class^="${WELL_BEING_CARD_DESCRIPTION_SUBTITLE_CLASS}"]`
                        );

                    return {

                        href: title && title.href
                            ? title.href
                            : null,

                        title: title && title.textContent
                            ? title.textContent.trim()
                            : null,

                        description: description && description.textContent
                            ? description.textContent.trim()
                            : null,

                        number: number && number.textContent
                            ? number.textContent.trim()
                            : null,

                    };

                }

                function getShortForecast(): IYandexPogoda["shortForecast"] {

                    const shortForecast: IYandexPogoda["shortForecast"] = [];

                    const shortForecastContainer = document.querySelector(
                        `[class^="${SHORT_FORECAST_CLASS}"]`
                    );

                    const shortForecastList = shortForecastContainer && shortForecastContainer.querySelectorAll(
                        `[class^="${SHORT_FORECAST_DAY_CONTAINER_CLASS}"]`
                    );

                    if (shortForecastList) {

                        for (const shortForecastItem of shortForecastList) {

                            const temperatures = shortForecastItem.querySelectorAll(
                                `[class^="${SHORT_FORECAST_TEMPERATURE_CLASS}"]`
                            );

                            const day = temperatures[0] &&
                                temperatures[0].textContent
                                ? temperatures[0].textContent.trim()
                                : null;

                            const night = temperatures[1] &&
                                temperatures[1].textContent
                                ? temperatures[1].textContent.trim()
                                : null;

                            const href: HTMLAnchorElement | null = shortForecastItem.querySelector(
                                `[class^="${SHORT_FORECAST_HREF_CLASS}"]`
                            );

                            const title = shortForecastItem.querySelector(
                                `[class^="${SHORT_FORECAST_TITLE_CLASS}"]`
                            );

                            const date = shortForecastItem.querySelector(
                                `[class^="${SHORT_FORECAST_DATE_CLASS}"]`
                            );

                            const weatherIcon = shortForecastItem.querySelector(
                                `[class^="${SHORT_FORECAST_ICON_CLASS}"]`
                            );

                            const icon = weatherIcon && getComputedStyle(weatherIcon).getPropertyValue('--icon');

                            shortForecast.push({

                                href: href && href.href
                                    ? href.href
                                    : null,

                                title: title && title.textContent
                                    ? title.textContent.trim()
                                    : null,

                                date: date && date.textContent
                                    ? date.textContent.trim()
                                    : null,

                                icon: icon !== "" && icon !== null
                                    ? Number(icon)
                                    : null,

                                temperature: {
                                    day,
                                    night,
                                },

                            });

                        }

                    }

                    return shortForecast;

                }

                function getForecast(): IYandexPogoda["forecast"] {

                    function getHref(card: Element): IYandexPogoda["forecast"][number]["href"] {

                        const a: HTMLAnchorElement | null = card
                            && card.querySelector("li > a");

                        return a && a.href
                            ? a.href
                            : null;

                    }

                    function getTitles(content: Element): IYandexPogoda["forecast"][number]["titles"] {

                        const dayTitle = content.querySelector(
                            `[style$="${FORECAST_DAY_TITLE_CLASS}"]`
                        );

                        const feelsTitle = content.querySelector(
                            `[style$="${FORECAST_FEELS_TITLE_CLASS}"]`
                        );

                        const windTitle = content.querySelector(
                            `[style$="${FORECAST_WIND_TITLE_CLASS}"]`
                        );

                        const humTitle = content.querySelector(
                            `[style$="${FORECAST_HUM_TITLE_CLASS}"]`
                        );

                        const pressTitle = content.querySelector(
                            `[style$="${FORECAST_PRESS_TITLE_CLASS}"]`
                        );

                        return {

                            day: dayTitle && dayTitle.textContent
                                ? dayTitle.textContent.trim()
                                : null,

                            feels: feelsTitle && feelsTitle.textContent
                                ? feelsTitle.textContent.trim()
                                : null,

                            wind: windTitle && windTitle.textContent
                                ? windTitle.textContent.trim()
                                : null,

                            humidity: humTitle && humTitle.textContent
                                ? humTitle.textContent.trim()
                                : null,

                            pressure: pressTitle && pressTitle.textContent
                                ? pressTitle.textContent.trim()
                                : null,

                        };
                    }

                    function getParts(content: Element): IYandexPogoda["forecast"][number]["parts"] {

                        const mPart = content.querySelector(
                            `[style$="${FORECAST_PART_MORNING_CLASS}"]`
                        );

                        const mText = content.querySelector(
                            `[style$="${FORECAST_TEXT_MORNING_CLASS}"]`
                        );

                        const mFeels = content.querySelector(
                            `[style$="${FORECAST_FEELS_MORNING_CLASS}"]`
                        );

                        const mWind = content.querySelector(
                            `[style$="${FORECAST_WIND_MORNING_CLASS}"]`
                        );

                        const mHum = content.querySelector(
                            `[style$="${FORECAST_HUM_MORNING_CLASS}"]`
                        );

                        const mDir = content.querySelector(
                            `[style$="${FORECAST_DIR_MORNING_CLASS}"] > div`
                        );

                        const mTemp = content.querySelector(
                            `[style$="${FORECAST_TEMP_MORNING_CLASS}"]`
                        );

                        const mPress = content.querySelector(
                            `[style$="${FORECAST_PRESS_MORNING_CLASS}"]`
                        );


                        const dPart = content.querySelector(
                            `[style$="${FORECAST_PART_DAY_CLASS}"]`
                        );

                        const dText = content.querySelector(
                            `[style$="${FORECAST_TEXT_DAY_CLASS}"]`
                        );

                        const dFeels = content.querySelector(
                            `[style$="${FORECAST_FEELS_DAY_CLASS}"]`
                        );

                        const dWind = content.querySelector(
                            `[style$="${FORECAST_WIND_DAY_CLASS}"]`
                        );

                        const dHum = content.querySelector(
                            `[style$="${FORECAST_HUM_DAY_CLASS}"]`
                        );

                        const dDir = content.querySelector(
                            `[style$="${FORECAST_DIR_DAY_CLASS}"] > div`
                        );

                        const dTemp = content.querySelector(
                            `[style$="${FORECAST_TEMP_DAY_CLASS}"]`
                        );

                        const dPress = content.querySelector(
                            `[style$="${FORECAST_PRESS_DAY_CLASS}"]`
                        );


                        const ePart = content.querySelector(
                            `[style$="${FORECAST_PART_EVENING_CLASS}"]`
                        );

                        const eText = content.querySelector(
                            `[style$="${FORECAST_TEXT_EVENING_CLASS}"]`
                        );

                        const eFeels = content.querySelector(
                            `[style$="${FORECAST_FEELS_EVENING_CLASS}"]`
                        );

                        const eWind = content.querySelector(
                            `[style$="${FORECAST_WIND_EVENING_CLASS}"]`
                        );

                        const eHum = content.querySelector(
                            `[style$="${FORECAST_HUM_EVENING_CLASS}"]`
                        );

                        const eDir = content.querySelector(
                            `[style$="${FORECAST_DIR_EVENING_CLASS}"] > div`
                        );

                        const eTemp = content.querySelector(
                            `[style$="${FORECAST_TEMP_EVENING_CLASS}"]`
                        );

                        const ePress = content.querySelector(
                            `[style$="${FORECAST_PRESS_EVENING_CLASS}"]`
                        );


                        const nPart = content.querySelector(
                            `[style$="${FORECAST_PART_NIGHT_CLASS}"]`
                        );

                        const nText = content.querySelector(
                            `[style$="${FORECAST_TEXT_NIGHT_CLASS}"]`
                        );

                        const nFeels = content.querySelector(
                            `[style$="${FORECAST_FEELS_NIGHT_CLASS}"]`
                        );

                        const nWind = content.querySelector(
                            `[style$="${FORECAST_WIND_NIGHT_CLASS}"]`
                        );

                        const nHum = content.querySelector(
                            `[style$="${FORECAST_HUM_NIGHT_CLASS}"]`
                        );

                        const nDir = content.querySelector(
                            `[style$="${FORECAST_DIR_NIGHT_CLASS}"] > div`
                        );

                        const nTemp = content.querySelector(
                            `[style$="${FORECAST_TEMP_NIGHT_CLASS}"]`
                        );

                        const nPress = content.querySelector(
                            `[style$="${FORECAST_PRESS_NIGHT_CLASS}"]`
                        );

                        return {

                            morning: {

                                icon: null,

                                part: mPart && mPart.textContent
                                    ? mPart.textContent.trim()
                                    : null,

                                description: mText && mText.textContent
                                    ? mText.textContent.trim()
                                    : null,

                                temperature: mTemp && mTemp.textContent
                                    ? mTemp.textContent.trim()
                                    : null,

                                feels: mFeels && mFeels.textContent
                                    ? mFeels.textContent.trim()
                                    : null,

                                wind: mWind && mWind.textContent
                                    ? mWind.textContent.trim()
                                    : null,

                                direction: mDir && mDir.textContent
                                    ? mDir.textContent.trim()
                                    : null,

                                humidity: mHum && mHum.textContent
                                    ? mHum.textContent.trim()
                                    : null,

                                pressure: mPress && mPress.textContent
                                    ? mPress.textContent.trim()
                                    : null,

                            },

                            day: {

                                icon: null,

                                part: dPart && dPart.textContent
                                    ? dPart.textContent.trim()
                                    : null,

                                description: dText && dText.textContent
                                    ? dText.textContent.trim()
                                    : null,

                                temperature: dTemp && dTemp.textContent
                                    ? dTemp.textContent.trim()
                                    : null,

                                feels: dFeels && dFeels.textContent
                                    ? dFeels.textContent.trim()
                                    : null,

                                wind: dWind && dWind.textContent
                                    ? dWind.textContent.trim()
                                    : null,

                                direction: dDir && dDir.textContent
                                    ? dDir.textContent.trim()
                                    : null,

                                humidity: dHum && dHum.textContent
                                    ? dHum.textContent.trim()
                                    : null,

                                pressure: dPress && dPress.textContent
                                    ? dPress.textContent.trim()
                                    : null,

                            },

                            evening: {

                                icon: null,

                                part: ePart && ePart.textContent
                                    ? ePart.textContent.trim()
                                    : null,

                                description: eText && eText.textContent
                                    ? eText.textContent.trim()
                                    : null,

                                temperature: eTemp && eTemp.textContent
                                    ? eTemp.textContent.trim()
                                    : null,

                                feels: eFeels && eFeels.textContent
                                    ? eFeels.textContent.trim()
                                    : null,

                                wind: eWind && eWind.textContent
                                    ? eWind.textContent.trim()
                                    : null,

                                direction: eDir && eDir.textContent
                                    ? eDir.textContent.trim()
                                    : null,

                                humidity: eHum && eHum.textContent
                                    ? eHum.textContent.trim()
                                    : null,

                                pressure: ePress && ePress.textContent
                                    ? ePress.textContent.trim()
                                    : null,

                            },

                            night: {

                                icon: null,

                                part: nPart && nPart.textContent
                                    ? nPart.textContent.trim()
                                    : null,

                                description: nText && nText.textContent
                                    ? nText.textContent.trim()
                                    : null,

                                temperature: nTemp && nTemp.textContent
                                    ? nTemp.textContent.trim()
                                    : null,

                                feels: nFeels && nFeels.textContent
                                    ? nFeels.textContent.trim()
                                    : null,

                                wind: nWind && nWind.textContent
                                    ? nWind.textContent.trim()
                                    : null,

                                direction: nDir && nDir.textContent
                                    ? nDir.textContent.trim()
                                    : null,

                                humidity: nHum && nHum.textContent
                                    ? nHum.textContent.trim()
                                    : null,

                                pressure: nPress && nPress.textContent
                                    ? nPress.textContent.trim()
                                    : null,

                            },

                        };

                    }

                    function getDaylightHours(content: Element): IYandexPogoda["forecast"][number]["daylightHours"] {

                        const durationTextItems = content.querySelectorAll(
                            `[class^="${FORECAST_DAY_DURATION_ITEM_CLASS}"] > [class^="${FORECAST_DAY_DURATION_ITEM_TEXT_CLASS}"]`
                        );

                        return {

                            sunrise: durationTextItems &&
                                durationTextItems[0] &&
                                durationTextItems[0].textContent &&
                                durationTextItems[0].textContent.trim(),

                            duration: durationTextItems &&
                                durationTextItems[1] &&
                                durationTextItems[1].textContent &&
                                durationTextItems[1].textContent.trim(),

                            sunset: durationTextItems &&
                                durationTextItems[2] &&
                                durationTextItems[2].textContent &&
                                durationTextItems[2].textContent.trim(),

                        };

                    }

                    function getMoon(content: Element) {

                        const durationMoon = content.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_MOON_CLASS}"]`
                        );

                        const moon = durationMoon &&
                            durationMoon.parentElement &&
                            durationMoon.parentElement.parentElement;

                        const caption = moon && moon.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_ITEM_CAPTION_CLASS}"]`
                        );

                        const description = moon && moon.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_ITEM_TEXT_CLASS}"]`
                        );

                        const image: HTMLImageElement | null = moon && moon.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_ITEM_IMAGE_CLASS}"]`
                        );

                        return {

                            caption: caption && caption.textContent
                                ? caption.textContent.trim()
                                : null,

                            description: description && description.textContent
                                ? description.textContent.trim()
                                : null,

                            src: image && image.src
                                ? image.src
                                : null,

                        };

                    }

                    function getWater(content: Element): IYandexPogoda["forecast"][number]["water"] {

                        const durationWater = content.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_WATER_CLASS}"]`
                        );

                        const water = durationWater &&
                            durationWater.parentElement &&
                            durationWater.parentElement.parentElement;

                        const waterCaption = water && water.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_ITEM_CAPTION_CLASS}"]`
                        );

                        const waterTemperature = water && water.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_ITEM_TEXT_CLASS}"]`
                        );

                        return {

                            caption: waterCaption && waterCaption.textContent
                                ? waterCaption.textContent.trim()
                                : null,

                            temperature: waterTemperature && waterTemperature.textContent
                                ? waterTemperature.textContent.trim()
                                : null,

                        };

                    }

                    function getUvIndex(content: Element): IYandexPogoda["forecast"][number]["uvIndex"] {

                        const durationInfo = content.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_INFO_CLASS}"]`
                        );

                        if (durationInfo) {

                            for (const item of durationInfo.children) {

                                const caption = item.querySelector(
                                    `[class^="${FORECAST_DAY_DURATION_ITEM_CAPTION_CLASS}"]`
                                );

                                if (caption && caption.textContent) {

                                    if (caption.textContent.includes("УФ-индекс")) {

                                        const description = item.querySelector(
                                            `[class^="${FORECAST_DAY_DURATION_ITEM_TEXT_CLASS}"]`
                                        );

                                        return {

                                            caption: caption.textContent.trim(),

                                            description: description && description.textContent
                                                ? description.textContent.trim()
                                                : null,

                                        };

                                    }
                                }
                            }

                        }

                        return {

                            caption: null,

                            description: null,

                        };

                    }

                    function getMagneticfield(content: Element): IYandexPogoda["forecast"][number]["magneticfield"] {

                        const durationInfo = content.querySelector(
                            `[class^="${FORECAST_DAY_DURATION_INFO_CLASS}"]`
                        );

                        if (durationInfo) {

                            for (const item of durationInfo.children) {

                                const caption = item.querySelector(
                                    `[class^="${FORECAST_DAY_DURATION_ITEM_CAPTION_CLASS}"]`
                                );

                                if (caption && caption.textContent) {

                                    if (caption.textContent.includes("Магнитное поле")) {

                                        const description = item.querySelector(
                                            `[class^="${FORECAST_DAY_DURATION_ITEM_VALUE_CLASS}"]`
                                        );

                                        return {

                                            caption: caption.textContent.trim(),

                                            description: description && description.textContent
                                                ? description.textContent.trim()
                                                : null,

                                        };

                                    }
                                }
                            }

                        }

                        return {

                            caption: null,

                            description: null,

                        };

                    }

                    function getConditionIcons(card: Element, day: IYandexPogoda["forecast"][number]) {

                        const icons = card.querySelectorAll(`[class^="${FORECAST_WEATHER_ICON_CLASS}"]`);

                        for (const icon of icons) {

                            const gridArea = icon && getComputedStyle(icon).getPropertyValue('grid-area');

                            const iconNumber = icon && getComputedStyle(icon).getPropertyValue('--icon');

                            if (gridArea.startsWith('m')) {

                                day.parts.morning.icon = iconNumber !== "" && iconNumber !== null
                                    ? Number(iconNumber)
                                    : null;

                            } else if (gridArea.startsWith('d')) {

                                day.parts.day.icon = iconNumber !== "" && iconNumber !== null
                                    ? Number(iconNumber)
                                    : null;

                            } else if (gridArea.startsWith('e')) {

                                day.parts.evening.icon = iconNumber !== "" && iconNumber !== null
                                    ? Number(iconNumber)
                                    : null;

                            } else if (gridArea.startsWith('n')) {

                                day.parts.night.icon = iconNumber !== "" && iconNumber !== null
                                    ? Number(iconNumber)
                                    : null;

                            }

                        }

                    }

                    const forecast: IYandexPogoda["forecast"] = [];

                    const forecastDaysList = document.querySelector(
                        `[class^="${FORECAST_CLASS}"]`
                    );

                    if (forecastDaysList) {

                        for (const card of forecastDaysList.children) {

                            const content = card.querySelector(
                                `[class^="${FORECAST_DAY_CONTAINER_CLASS}"]`
                            );

                            if (content) {

                                const day: IYandexPogoda["forecast"][number] = {

                                    href: getHref(card),

                                    title: getTitles(content).day,

                                    titles: getTitles(content),

                                    parts: getParts(content),

                                    daylightHours: getDaylightHours(content),

                                    moon: getMoon(content),

                                    uvIndex: getUvIndex(content),

                                    magneticfield: getMagneticfield(content),

                                    water: getWater(content),

                                };

                                getConditionIcons(card, day);

                                forecast.push(day);

                            }
                        }

                        return forecast;

                    }

                    return forecast;

                }

                // ! В Яндекс Погода если lat или lon некорректны 
                // ! (строка или невменяемое числовое значение), 
                // ! то отображается прогноз погоды населённого пункта по геолокации
                // ! (даже при запрещенном определении геолокации для страницы).

                const result: IYandexPogoda = {

                    basic: {

                        temperature: getBasicTemperature(),

                        feels: getBasicFeels(),

                        yesterday: getBasicYesterday(),

                        warning: getBasicWarning(),

                        details: getBasicDetails(),

                        icon: getBasicConditionIcon(),

                    },

                    warnings: getWarnings(),

                    extendedDetails: getExtendedDetails(),

                    hourly: getHourly(),

                    moon: getMoon(),

                    magneticStorms: getMagneticStorms(),

                    uvIndex: getUvIndex(),

                    atmosphericPressure: getAtmosphericPressure(),

                    shortForecast: getShortForecast(),

                    forecast: getForecast(),

                };

                return result;

            });

        await browser.close();

        return {

            success: true,

            data: result,

        };

    } catch (error: any) {

        return {

            success: false,

            error: {
                message: ["Ошибка при парсинге.", error.message].join(" "),
            },

        };

    }

}