import { MILLISECONDS_ONE_HOUR } from "./constants";
import { getISOStringDate } from "./getISOStringDate";

export function removeTimezoneOffset(date: Date) {

    // ! ГГГГ-ММ-ДД
    const ISODate = getISOStringDate(date);

    // ! Создаем объект Date, 
    // ! отправляя дату в формате ГГГГ-ММ-ДД, 
    // ! чтобы получить время начала дня даты.

    const ISODateStart = new Date(ISODate);

    // ! Так как присутствует сдвиг в часах в связи со временной зоной, 
    // ! то сдвигаем время назад на количество часов сдвига временной зоны.

    const timezoneOffsetHours = ISODateStart.getTimezoneOffset() < 0
        ? ISODateStart.getTimezoneOffset() / 60 * (-1)
        : ISODateStart.getTimezoneOffset() > 0
            ? ISODateStart.getTimezoneOffset() / 60
            : 0;

    const dateStart = new Date(
        ISODateStart.getTime() -
        MILLISECONDS_ONE_HOUR * timezoneOffsetHours
    );

    return dateStart;
}