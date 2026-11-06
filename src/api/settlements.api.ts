import path from "path";
import fs from "fs";
import {
    IServerOptions,
    IServerResponse
} from "@types";
import {
    IRussianCityInRussianAndEnglish,
    ISettlement
} from "@parsing/settlements/types";
import { DATA_PATH } from "@paths";

export function settlementsAPI({
    app,
}: IServerOptions) {

    const settlements: ISettlement[] = JSON.parse(
        fs.readFileSync(
            path.resolve(
                DATA_PATH,
                "settlements",
                "settlements.json"
            ),
            "utf-8"
        )
    );

    const citiesAndTownsInRussia: IRussianCityInRussianAndEnglish[] = JSON.parse(
        fs.readFileSync(
            path.resolve(
                DATA_PATH,
                "settlements",
                "citiesAndTownsInRussia.json"
            ),
            "utf-8"
        )
    );

    app.get("/api/settlements", async (request, response) => {

        try {

            const search = request.query.search !== undefined
                ? request.query.search as string
                : null;

            if (search !== null && search.length > 0) {

                const foundSettlements = settlements
                    .filter(settlement => (
                        settlement.name && settlement.name.toUpperCase().startsWith(search.toUpperCase())
                    ))
                    .slice(0, 10);

                const result: IServerResponse<{ settlements: ISettlement[] }> = {
                    success: true,
                    status: 200,
                    data: {
                        settlements: foundSettlements,
                    },
                };

                response.json(result);

            } else {

                const page = request.query.page !== undefined
                    ? Number(request.query.page)
                    : 1;

                const limit = 10;

                const result: IServerResponse<{ settlements: ISettlement[] }> = {
                    success: true,
                    status: 200,
                    data: {
                        settlements: settlements.slice(limit * page - limit, limit * page),
                    },
                };

                response.json(result);

            }

        } catch (error: any) {

            console.log(error);

            const result: IServerResponse<void> = {
                success: false,
                status: 404,
                error: {
                    message: "Ошибка при получении населённого пункта.",
                },
            };

            response.json(result);

        }

    });

    app.get("/api/settlements/russia", async (request, response) => {

        try {

            const search = request.query.search !== undefined
                ? request.query.search as string
                : null;

            if (search !== null && search.length > 0) {

                const foundCitiesAndTownsInRussia = citiesAndTownsInRussia
                    .filter(settlement => (
                        settlement.russianName && settlement.russianName.toUpperCase().startsWith(search.toUpperCase())
                    ))
                    .slice(0, 10);

                const result: IServerResponse<{ settlements: IRussianCityInRussianAndEnglish[] }> = {
                    success: true,
                    status: 200,
                    data: {
                        settlements: foundCitiesAndTownsInRussia,
                    },
                };

                response.json(result);

            } else {

                const page = request.query.page !== undefined
                    ? Number(request.query.page)
                    : 1;

                const limit = 10;

                const result: IServerResponse<{ settlements: IRussianCityInRussianAndEnglish[] }> = {
                    success: true,
                    status: 200,
                    data: {
                        settlements: citiesAndTownsInRussia.slice(limit * page - limit, limit * page),
                    },
                };

                response.json(result);

            }

        } catch (error: any) {

            const result: IServerResponse<void> = {
                success: false,
                status: 404,
                error: {
                    message: "Ошибка при получении российского населённого пункта.",
                },
            };

            response.json(result);

        }

    });

}