
/**
 * 
 * @param date 
 * @returns
 *     
 * \{
 *      day : 1,
 *      month : 1,
 *      year : 2026,
 *      hours : 21,
 *      minutes : 59,
 *      seconds : 59,
 *      milliseconds : 755,
 *      time : 1769166973991,
 * }
 * 
 */

export function getFullObjectDate(date: Date = new Date()) {

    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),

        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),

        milliseconds: date.getMilliseconds(),

        time: date.getTime(),
    };
}