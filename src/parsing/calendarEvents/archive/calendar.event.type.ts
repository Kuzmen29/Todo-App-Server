export interface ICalendarEvent {

    href?: string | null,

    title?: {
        text: string | null,
        description: string | null,
    },

    image?: string | null,

    type?: {
        title: string | null,
        link: string | null,
        typeImage: string | null,
    },

    description?: {
        text: string | null,
        href: string | null,
    },

}