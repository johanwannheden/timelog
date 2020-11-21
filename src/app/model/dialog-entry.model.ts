import {TimeOfDay} from './time-of-day.model';

export interface DialogEntry {
    date: Date;
    startTime: TimeOfDay;
    endTime: TimeOfDay;
    comment?: string;
}
