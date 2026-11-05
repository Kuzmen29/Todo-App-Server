
/**
 * 
 * @param date 
 * @returns "31.12.2000 12:30"
 * 
 */

export function getRussianStringDateAndTime(date: Date = new Date()) {

    const year = date.getFullYear();

    let [day, month, hours, minutes]: [
        day: number | string,
        month: number | string,
        hours: number | string,
        minutes: number | string,
    ] = [date.getDate(), date.getMonth() + 1, date.getHours(), date.getMinutes()];

    day = (day < 10) ? "0" + day : day;

    month = ((month < 10) ? "0" + month : month);


    hours = ((hours < 10) ? "0" + hours : hours);

    minutes = ((minutes < 10) ? "0" + minutes : minutes);

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}