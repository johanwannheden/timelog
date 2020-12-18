import {Duration} from './duration';
import * as moment from 'moment';

export class TimeOfDay {
    constructor(private hour: number, private minute: number) {
    }

    static getDuration(startTime: TimeOfDay, endTime: TimeOfDay): Duration {
        const from = moment.duration(startTime.hour, 'hours').add(startTime.minute, 'minutes');
        const to = moment.duration(endTime.hour, 'hours').add(endTime.minute, 'minutes');

        const duration = to.subtract(from);

        return {
            hours: duration.hours(),
            minutes: duration.minutes()
        };
    }

    formatted(): string {
        const hourFormatted = String(this.hour).padStart(2, '0');
        const minuteFormatted = String(this.minute).padStart(2, '0');
        return `${hourFormatted}:${minuteFormatted}`;
    }

}
