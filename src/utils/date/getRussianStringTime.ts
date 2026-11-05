
/**
 * 
 * @param date 
 * @returns "12:30"
 * 
 */

export function getRussianStringTime(date: Date = new Date()) {

    let [hours, minutes]: [
        hours: number | string,
        minutes: number | string,
    ] = [date.getHours(), date.getMinutes()];

    hours = ((hours < 10) ? "0" + hours : hours);

    minutes = ((minutes < 10) ? "0" + minutes : minutes);

    return `${hours}:${minutes}`;
}