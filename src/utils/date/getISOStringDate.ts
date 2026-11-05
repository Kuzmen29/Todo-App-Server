
/**
 * 
 * @param date 
 * @returns "2000-12-31"
 * 
 */

export function getISODate(date: Date = new Date()) {

    const year = date.getFullYear();

    let [day, month]: [
        day: number | string,
        month: number | string
    ] = [date.getDate(), date.getMonth() + 1];

    day = (day < 10) ? "0" + day : day;

    month = ((month < 10) ? "0" + month : month);

    return `${year}-${month}-${day}`;
}