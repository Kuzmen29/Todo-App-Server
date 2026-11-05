import fs from "fs";
import { getFullRussianStringDateAndTime } from "@utils/date";
import { REQUEST_LOGS_PATH } from "@paths";

export function writeRequestLogs({
    url,
    method,
    hostname,
}: {
    url: string,
    method: string,
    hostname: string,
}) {

    const message =
        `Запрос сделан по адресу ` + url + ` . `
        + `Методом ` + method + ' . '
        + 'Пользователем ' + hostname + ' . '
        + `Время: ` + getFullRussianStringDateAndTime() + ' . '
        + '\n\n';

    fs.appendFileSync(
        REQUEST_LOGS_PATH,
        message
    );

}