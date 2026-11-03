export interface IYandexPogoda {

    basic: {

        temperature: {

            sign: string | null,

            value: string | null,

            degree: string | null,

        },

        feels: string | null,

        icon: number | null,

        yesterday: string | null,

        warning: {

            first: string | null,

            second: string | null,

        },

        details: {

            wind: string | null,

            pressure: string | null,

            humidity: string | null,

            water: string | null,

        },

    },

    warnings: {

        today: {

            href: string | null,

            icon: number | null,

            title: string | null,

            description: string | null,

        },

        tomorrow: {

            href: string | null,

            icon: number | null,

            title: string | null,

            description: string | null,

        },

        forThisWeek: {

            href: string | null,

            icon: number | null,

            title: string | null,

            description: string | null,

        },

        onWeekends: {

            href: string | null,

            icon: number | null,

            title: string | null,

            description: string | null,

        },

    },

    extendedDetails: {

        href: string | null,

        details: {

            wind: {

                title: string | null,

                value: string | null,

            } | null,

            pressure: {

                title: string | null,

                value: string | null,

            } | null,

            humidity: {

                title: string | null,

                value: string | null,

            } | null,

            water: {

                title: string | null,

                value: string | null,

            } | null,

        },

    },

    hourly: {

        datetime: string | null,

        icon: number | null,

        time: string | null,

        humidity: string | null,

        temperature: string | null,

        iconSrc: string | null,

    }[],

    moon: {

        href: string | null,

        src: string | null,

        title: string | null,

        description: string | null,

    },

    magneticStorms: {

        href: string | null,

        number: string | null,

        unit: string | null,

        title: string | null,

        description: string | null,

    },

    uvIndex: {

        href: string | null,

        number: string | null,

        title: string | null,

        description: string | null,

    },

    atmosphericPressure: {

        href: string | null,

        number: string | null,

        title: string | null,

        description: string | null,

    },

    shortForecast: {

        href: string | null,

        title: string | null,

        date: string | null,

        icon: number | null,

        temperature: {

            day: string | null,

            night: string | null,

        },

    }[],

    forecast: {

        title: string | null,

        href: string | null,

        titles: {

            day: string | null,

            feels: string | null,

            wind: string | null,

            humidity: string | null,

            pressure: string | null,

        },

        parts: {

            morning: {

                icon: number | null,

                part: string | null,

                temperature: string | null,

                description: string | null,

                feels: string | null,

                wind: string | null,

                direction: string | null,

                humidity: string | null,

                pressure: string | null,

            },

            day: {

                icon: number | null,

                part: string | null,

                temperature: string | null,

                description: string | null,

                feels: string | null,

                wind: string | null,

                direction: string | null,

                humidity: string | null,

                pressure: string | null,

            },

            evening: {

                icon: number | null,

                part: string | null,

                temperature: string | null,

                description: string | null,

                feels: string | null,

                wind: string | null,

                direction: string | null,

                humidity: string | null,

                pressure: string | null,

            },

            night: {

                icon: number | null,

                part: string | null,

                temperature: string | null,

                description: string | null,

                feels: string | null,

                wind: string | null,

                direction: string | null,

                humidity: string | null,

                pressure: string | null,

            },

        },

        daylightHours: {

            sunrise: string | null,

            sunset: string | null,

            duration: string | null,

        },

        water: {

            caption: string | null,

            temperature: string | null,

        },

        moon: {

            src: string | null,

            caption: string | null,

            description: string | null,

        },

        uvIndex: {

            caption: string | null,

            description: string | null,

        },

        magneticfield: {

            caption: string | null,

            description: string | null,

        },

    }[],

}