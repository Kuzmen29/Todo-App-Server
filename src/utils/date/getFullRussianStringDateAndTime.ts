
/**
 * 
 * @param date 
 * @returns "31.12.2000 12:30:10"
 * 
 */

export function getFullRussianStringDateAndTime(date: Date = new Date()) {

    const year = date.getFullYear();

    let [day, month, hours, minutes, seconds]: [
        day: number | string,
        month: number | string,
        hours: number | string,
        minutes: number | string,
        seconds: number | string
    ] = [date.getDate(), date.getMonth() + 1, date.getHours(), date.getMinutes(), date.getSeconds()];

    day = (day < 10) ? "0" + day : day;

    month = ((month < 10) ? "0" + month : month);


    hours = ((hours < 10) ? "0" + hours : hours);

    minutes = ((minutes < 10) ? "0" + minutes : minutes);

    seconds = ((seconds < 10) ? "0" + seconds : seconds);

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}