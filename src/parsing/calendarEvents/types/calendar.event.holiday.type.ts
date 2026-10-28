export interface ICalendarEventHoliday {

    href?: string | null,

    image?: {
        src: string | null,
        alt: string | null,
    },

    title?: {
        text: string | null,
    },

    mark?: {
        year: string | null,
        text: string[],
    },

    type?: {
        title: string | null,
        href: string | null,
        image: string | null,
    },

    description?: {
        text: string | null,
        href: string | null,
    },

}