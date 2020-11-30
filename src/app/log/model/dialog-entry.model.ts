import {TimeOfDay} from '../../model/time-of-day.model';
import {Moment} from 'moment';
import {ModificationKind} from './log-entry.modification';

export interface DialogEntry {
    date: Moment;
    startTime: TimeOfDay;
    endTime: TimeOfDay;
    comment?: string;
    action: ModificationKind;
}
