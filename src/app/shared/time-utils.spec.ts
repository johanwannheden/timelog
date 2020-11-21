import {DAY_OF_WEEK, getCurrentDayOfWeek, getTimeOfDay, isValidFormat, getMinuteOfDay} from './time-utils';

describe('Tests Time Util Functions', () => {
    describe('Get Current Day of Week', () => {
        expect(getCurrentDayOfWeek(new Date(Date.parse('2020-11-21')))).toEqual(DAY_OF_WEEK.SATURDAY);
    });
    describe('Is Valid Time', () => {
        it('should detect invalid time', () => {
            expect((isValidFormat(':'))).toBeFalsy();
            expect((isValidFormat(':59'))).toBeFalsy();
            expect((isValidFormat('12:'))).toBeFalsy();
            expect((isValidFormat('12:0'))).toBeFalsy();
            expect((isValidFormat('1:'))).toBeFalsy();
        });
        it('should detect valid time', () => {
            expect((isValidFormat('12'))).toBeTruthy();
            expect((isValidFormat('01'))).toBeTruthy();
            expect((isValidFormat('12:00'))).toBeTruthy();
            expect((isValidFormat('1200'))).toBeTruthy();
            expect((isValidFormat('12.00'))).toBeTruthy();
            expect((isValidFormat('12-00'))).toBeTruthy();
        });
    });
    describe('Minute of Day', () => {
        it('should handle empty input', () => {
            expect(() => getMinuteOfDay('')).toThrowError();
        });
        it('should calculate correct minute for valid time', () => {
            expect((getMinuteOfDay('23:59'))).toEqual(23 * 60 + 59);
        });
    });
    describe('Time of Day', () => {
        it('should handle empty input', () => {
            expect(() => getTimeOfDay('')).toThrowError();
        });
        it('should handle foo input', () => {
            expect(() => getTimeOfDay('foo')).toThrowError();
        });
        it('should detect invalid time in valid format', () => {
            expect(() => getTimeOfDay('25:99')).toThrowError();
        });
        it('should calculate correct object for valid time', () => {
            expect((getTimeOfDay('23:59'))).toEqual({hour: 23, minute: 59});
        });
        it('should calculate correct object for valid time with hour only', () => {
            expect((getTimeOfDay('23'))).toEqual({hour: 23, minute: 0});
        });
        it('should calculate correct object for midnight', () => {
            expect((getTimeOfDay('00'))).toEqual({hour: 0, minute: 0});
        });
    });
});
