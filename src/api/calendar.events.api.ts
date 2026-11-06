import path from "path";
import fs from "fs";
import {
    IServerOptions,
    IServerResponse
} from "@types";
import { DATA_PATH } from "@paths";
import {
    ICalendarDay,
    ICalendarEvents
} from "@parsing/calendarEvents/types";
import { getFullMonth } from "@utils/calendar";
import { EACH_MONTH_DAYS_NUMBER } from "@utils/calendar/constants";

export function calendarEventsAPI({
    app,
}: IServerOptions) {

    const calendarEvents: ICalendarEvents = JSON.parse(
        fs.readFileSync(
            path.resolve(
                DATA_PATH,
                "calendarEvents",
                "calendarEvents.json"
            ),
            "utf-8"
        )
    );

    app.get("/api/calendarEvents", async (request, response) => {

        try {

            const day = request.query.day !== undefined
                ? Number(request.query.day)
                : null;

            const month = request.query.month !== undefined
                ? Number(request.query.month)
                : new Date().getMonth() + 1;

            const week = request.query.week !== undefined
                ? Number(request.query.week)
                : null;

            if (day !== null && month !== null) {

                if (month > 0 && month <= 12) {

                    if (day > 0 && day <= EACH_MONTH_DAYS_NUMBER[month - 1]) {

                        const calendarDay = calendarEvents.find((calendarEvent) => (
                            calendarEvent.day === day && calendarEvent.month === month
                        ));

                        if (calendarDay) {

                            const result: IServerResponse<{ calendarDay: ICalendarDay }> = {
                                success: true,
                                status: 200,
                                data: {
                                    calendarDay,
                                },
                            };

                            response.json(result);

                        } else {

                            const result: IServerResponse<void> = {
                                success: false,
                                status: 500,
                                error: {
                                    message: "Календарный день отсутствует в базе данных.",
                                },
                            };

                            response.json(result);

                        }

                    } else {

                        const result: IServerResponse<void> = {
                            success: false,
                            status: 500,
                            error: {
                                message: "Календарный день выходит за рамки допустимого диапазона.",
                            },
                        };

                        response.json(result);

                    }

                } else {

                    const result: IServerResponse<void> = {
                        success: false,
                        status: 500,
                        error: {
                            message: "Календарный месяц выходит за рамки допустимого диапазона.",
                        },
                    };

                    response.json(result);

                }

            } else if (month !== null && week !== null) {

                if (month > 0 && month <= 12) {

                    if (week > 0 && week <= 6) {

                        const specifiedMonthWeeks = getFullMonth(new Date(`2026-${month}-01`));

                        const specifiedWeek = specifiedMonthWeeks[week - 1];

                        if (specifiedWeek) {

                            const daysSpecifiedWeek = specifiedWeek
                                .filter((day) => (
                                    (
                                        week === 1 && day.getDate() >= 1 && day.getDate() <= 7
                                    ) || (
                                        week === specifiedMonthWeeks.length && day.getDate() >= 22
                                    ) || (
                                        week > 1 && week < specifiedMonthWeeks.length && day.getDate()
                                    )
                                ))
                                .map((day) => (
                                    day.getDate()
                                ));

                            const calendarWeek = calendarEvents.filter((calendarEvent) => (
                                calendarEvent.month === month &&
                                daysSpecifiedWeek.includes(calendarEvent.day)
                            ));

                            if (calendarWeek.length > 0) {

                                const result: IServerResponse<{ calendarWeek: ICalendarDay[] }> = {
                                    success: true,
                                    status: 200,
                                    data: {
                                        calendarWeek,
                                    },
                                };

                                response.json(result);

                            } else {

                                const result: IServerResponse<void> = {
                                    success: false,
                                    status: 500,
                                    error: {
                                        message: "Календарная неделя отсутствует в базе данных.",
                                    },
                                };

                                response.json(result);

                            }

                        } else {

                            const result: IServerResponse<void> = {
                                success: false,
                                status: 500,
                                error: {
                                    message: "Календарная неделя отсутствует в базе данных.",
                                },
                            };

                            response.json(result);

                        }

                    } else {

                        const result: IServerResponse<void> = {
                            success: false,
                            status: 500,
                            error: {
                                message: "Календарная неделя выходит за рамки допустимого диапазона.",
                            },
                        };

                        response.json(result);

                    }

                } else {

                    const result: IServerResponse<void> = {
                        success: false,
                        status: 500,
                        error: {
                            message: "Календарный месяц выходит за рамки допустимого диапазона.",
                        },
                    };

                    response.json(result);

                }

            } else {

                const result: IServerResponse<{ calendarEvents: ICalendarEvents }> = {
                    success: true,
                    status: 200,
                    data: {
                        calendarEvents,
                    },
                };

                response.json(result);

            }

        } catch (error) {

            console.log(error);

            const result: IServerResponse<void> = {
                success: false,
                status: 500,
                error: {
                    message: "Ошибка при получении календарных событий из базы данных.",
                },
            };

            response.json(result);

        }

    });

    app.get("/api/calendarEvents/today", async (_request, response) => {

        try {

            const day = new Date().getDate();

            const month = new Date().getMonth() + 1;

            const calendarDay = calendarEvents.find((calendarEvent) => (
                calendarEvent.day === day && calendarEvent.month === month
            ));

            if (calendarDay) {

                const result: IServerResponse<{ calendarDay: ICalendarDay }> = {
                    success: true,
                    status: 200,
                    data: {
                        calendarDay,
                    },
                };

                response.json(result);

            } else {

                const result: IServerResponse<void> = {
                    success: false,
                    status: 500,
                    error: {
                        message: "Сегодняшний календарный день отсутствует в базе данных.",
                    },
                };

                response.json(result);

            }

        } catch (error: any) {

            console.log(error);

            const result: IServerResponse<void> = {
                success: false,
                status: 500,
                error: {
                    message: "Ошибка при получении сегодняшнего календарного дня из базы данных.",
                },
            };

            response.json(result);
        }

    });

    app.get("/api/calendarEvents/month", async (request, response) => {

        try {

            const month = request.query.month !== undefined
                ? Number(request.query.month)
                : new Date().getMonth() + 1;

            const calendarMonth = calendarEvents.filter((calendarEvent) => (
                calendarEvent.month === month
            ));

            if (calendarMonth) {

                const result: IServerResponse<{ calendarMonth: ICalendarDay[] }> = {
                    success: true,
                    status: 200,
                    data: {
                        calendarMonth,
                    },
                };

                response.json(result);

            } else {

                const result: IServerResponse<void> = {
                    success: false,
                    status: 500,
                    error: {
                        message: "Календарный месяц отсутствует в базе данных.",
                    },
                };

                response.json(result);

            }

        } catch (error: any) {

            console.log(error);

            const result: IServerResponse<void> = {
                success: false,
                status: 500,
                error: {
                    message: "Ошибка при получении календарного месяца из базы данных.",
                },
            };

            response.json(result);

        }

    });

}