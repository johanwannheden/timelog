import {TimeOfDay} from '../../model/time-of-day.model';
import {Moment} from 'moment';

export interface DialogEntry {
    date: Moment;
    startTime: TimeOfDay;
    endTime: TimeOfDay;
    comment?: string;
}
