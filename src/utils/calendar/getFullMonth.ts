import { getFullObjectDate, removeTimezoneOffset } from "../date";
import { MILLISECONDS_ONE_WEEK } from "../date/constants";
import { getFullWeek } from "./getFullWeek";

export function getFullMonth(date: Date = new Date()) {

    const currentDay = removeTimezoneOffset(date);

    const currentObjectDay = getFullObjectDate(currentDay);

    const currentYear = currentObjectDay.year;

    const currentMonth = currentObjectDay.month;

    const beginningCurrentMonth = new Date(`${currentYear}-${currentMonth}-01`);

    const fullMonth: Date[][] = [];

    let week = getFullWeek(beginningCurrentMonth);

    fullMonth.push(week);

    let beginningWeek = week[0];

    let beginningNextWeek = new Date(beginningWeek.getTime() + MILLISECONDS_ONE_WEEK);

    let objectBeginningNextWeek = getFullObjectDate(beginningNextWeek);

    while (objectBeginningNextWeek.month === currentMonth) {

        week = getFullWeek(beginningNextWeek);

        fullMonth.push(week);

        beginningWeek = week[0];

        beginningNextWeek = new Date(beginningWeek.getTime() + MILLISECONDS_ONE_WEEK);

        objectBeginningNextWeek = getFullObjectDate(beginningNextWeek);
    }

    return fullMonth;
}