import { IServerOptions } from "@types";
import { writeRequestLogs } from "@components/logs";

export default function logsAPI({
    app,
}: IServerOptions) {

    app.use((request, _response, next) => {

        writeRequestLogs({
            url: request.url,
            method: request.method,
            hostname: request.hostname,
        });

        next();

    });

}