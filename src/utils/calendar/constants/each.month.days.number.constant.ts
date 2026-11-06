export const EACH_MONTH_DAYS_NUMBER = [
    31,
    new Date().getFullYear() % 4 !== 0
        ? 28
        : 29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
];