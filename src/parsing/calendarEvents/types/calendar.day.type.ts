import { ICalendarEventType } from "./calendar.event.type.type";

export interface ICalendarDay {

    month: number,

    day: number,

    events: ICalendarEventType[],

}