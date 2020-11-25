import {TimeOfDay} from '../../model/time-of-day.model';

export interface DialogEntry {
    date: Date;
    startTime: TimeOfDay;
    endTime: TimeOfDay;
    comment?: string;
}

export const enum DialogCloseEvent {
    CONFIRMED, CANCELED
}

export interface DialogCloseResult {
    event: DialogCloseEvent;
    result: DialogEntry | undefined;
}
