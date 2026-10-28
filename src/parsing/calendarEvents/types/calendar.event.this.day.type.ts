export interface ICalendarEventThisDay {

    href?: string | null,

    image?: {
        src: string | null,
        alt: string | null,
    },

    title?: {
        text: string | null,
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