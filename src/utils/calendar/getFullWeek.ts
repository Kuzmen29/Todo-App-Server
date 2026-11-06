import { removeTimezoneOffset } from "../date";
import { MILLISECONDS_ONE_DAY } from "../date/constants";

export function getFullWeek(date: Date = new Date()) {

    const days: Date[] = [];

    const currentDay = removeTimezoneOffset(date);

    if (currentDay.getDay() === 0) {

        let count = 0;

        while (count < 7) {

            days.unshift(new Date(currentDay.getTime() - (count * MILLISECONDS_ONE_DAY)));

            ++count;
        }

    } else {

        let countDays = currentDay.getDay();

        let count = 0;

        while (countDays > 0) {

            days.unshift(new Date(currentDay.getTime() - (count * MILLISECONDS_ONE_DAY)));

            --countDays;
            ++count;
        }

        countDays = currentDay.getDay() + 1;

        count = 1;

        while (countDays <= 7) {

            // ! Мы берем количество дней с этой недели плюс один день со следующей, 
            // ! так как неделя за бугром начинается с воскресенья.

            days.push(new Date(currentDay.getTime() + (count * MILLISECONDS_ONE_DAY)));

            ++countDays;
            ++count;
        }

    }

    return days;
}