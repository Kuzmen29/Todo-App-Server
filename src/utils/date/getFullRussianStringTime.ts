
/**
 * 
 * @param date 
 * @returns "12:30:10"
 * 
 */

export function getFullRussianStringTime(date: Date = new Date()) {

    let [hours, minutes, seconds]: [
        hours: number | string,
        minutes: number | string,
        seconds: number | string
    ] = [date.getHours(), date.getMinutes(), date.getSeconds()];


    hours = ((hours < 10) ? "0" + hours : hours);

    minutes = ((minutes < 10) ? "0" + minutes : minutes);

    seconds = ((seconds < 10) ? "0" + seconds : seconds);

    return `${hours}:${minutes}:${seconds}`;
}