import { ICalendarEventHoliday } from "./calendar.event.holiday.type";
import { ICalendarEventThisDay } from "./calendar.event.this.day.type";
import { ICalendarEventHomiesCal } from "./calendar.event.homies.cal.type";
import { ICalendarEventNameDay } from "./calendar.event.name.day.type";
import { ICalendarEventKnownDate } from "./calendar.event.known.date.type";
import { ICalendarEventPerson } from "./calendar.event.person.type";

export const HOLIDAYS_TYPE = "Праздники" as const;

export const THIS_DAY_TYPE = "А также в этот день" as const;

export const HOMIES_CAL_TYPE = "Народный календарь" as const;

export const NAME_DAY_TYPE = "Именины" as const;

export const KNOWN_DATES_TYPE = "Хроника" as const;

export const PERSONS_TYPE = "Персоны" as const;

export type ICalendarEventType = {

    href: string,

    type: typeof HOLIDAYS_TYPE,

    events: ICalendarEventHoliday[],

} | {

    type: typeof THIS_DAY_TYPE,

    description: string | null,

    events: ICalendarEventThisDay[],

} | {

    href: string,

    type: typeof HOMIES_CAL_TYPE,

    events: ICalendarEventHomiesCal[],

} | {

    href?: string | null,

    type: typeof NAME_DAY_TYPE,

    events: ICalendarEventNameDay[],

} | {

    href?: string | null,

    type: typeof KNOWN_DATES_TYPE,

    description: string | null,

    events: ICalendarEventKnownDate[],

} | {

    href?: string | null,

    type: typeof PERSONS_TYPE,

    events: ICalendarEventPerson[],

};