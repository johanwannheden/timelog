import {TimeOfDay} from '../model/time-of-day.model';
import {Duration} from '../model/duration';

export const TIME_FORMAT = /^([0-2][0-9])([:.-]?([0-5][0-9]))?$/;

export enum DAY_OF_WEEK {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

export function isValidFormat(value: string): boolean {
    return !!value && TIME_FORMAT.test(value);
}

export function getTimeOfDay(value: string): TimeOfDay {
    if (!isValidFormat(value)) {
        throw new Error('Invalid time: ' + value);
    }
    const res = TIME_FORMAT.exec(value) as RegExpExecArray;
    const hour = Number(res[1]);
    const minute = Number(res[3] || 0);

    if (hour > 23) {
        throw new Error('Invalid time (valid hours are 0-23: ' + value);
    }

    return {hour, minute};
}

export function getMinuteOfDay(value: string): number {
    if (!TIME_FORMAT.test(value)) {
        throw new Error('Invalid value passed to calculate minute of day: ' + value);
    }
    const res = TIME_FORMAT.exec(value) as RegExpExecArray;
    const hour = Number(res[1]);
    const minute = Number(res[3]);
    return hour * 60 + (minute || 0);
}

export function getCurrentDayOfWeek(date: Date = new Date()): DAY_OF_WEEK {
    switch (date?.getDay() ?? new Date().getDay()) {
        case 1:
            return DAY_OF_WEEK.MONDAY;
        case 2:
            return DAY_OF_WEEK.TUESDAY;
        case 3:
            return DAY_OF_WEEK.WEDNESDAY;
        case 4:
            return DAY_OF_WEEK.THURSDAY;
        case 5:
            return DAY_OF_WEEK.FRIDAY;
        case 6:
            return DAY_OF_WEEK.SATURDAY;
        default:
            return DAY_OF_WEEK.SUNDAY;
    }
}

export function getDefaultStartTime(day: DAY_OF_WEEK = getCurrentDayOfWeek()): string {
    if (day === DAY_OF_WEEK.MONDAY) {
        return '11:45';
    }
    if (day === DAY_OF_WEEK.THURSDAY || day === DAY_OF_WEEK.FRIDAY) {
        return '07:45';
    }
    return '';
}

export function getDefaultEndTime(day: DAY_OF_WEEK = getCurrentDayOfWeek()): string {
    if (day === DAY_OF_WEEK.MONDAY || day === DAY_OF_WEEK.THURSDAY || day === DAY_OF_WEEK.FRIDAY) {
        return '17:15';
    }
    return '';
}

export function getDuration(startTime: TimeOfDay, endTime: TimeOfDay): Duration {
    return {
        hours: endTime.hour - startTime.hour,
        minutes: endTime.minute - startTime.minute
    };
}

