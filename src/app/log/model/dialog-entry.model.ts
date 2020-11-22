import {TimeOfDay} from '../../model/time-of-day.model';

export interface DialogEntry {
    date: Date;
    startTime: TimeOfDay;
    endTime: TimeOfDay;
    comment?: string;
}
