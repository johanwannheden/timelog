export const TIME_FORMAT = /^([0-2][0-9])(:([0-5][0-9]))?$/;

export function minuteOfDay(value: string): number {
    if (!value) {
        return NaN;
    }
    if (!TIME_FORMAT.test(value)) {
        throw new Error('Invalid value passed to calculate minute of day: ' + value);
    }
    const res = TIME_FORMAT.exec(value) as RegExpExecArray;
    const hour = Number(res[1]);
    const minute = Number(res[3]);
    return hour * 60 + (minute || 0);
}
