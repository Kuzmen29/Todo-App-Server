export interface ICalendarEventPerson {

    href?: string | null,

    birthday?: boolean,

    image?: {
        src: string | null,
        alt: string | null,
    },

    years?: {
        birth: string | null,
        death: string | null,
    },

    title?: {
        text: string | null,
        description: string | null,
    },

    description?: {
        text: string | null,
        href: string | null,
    },

}