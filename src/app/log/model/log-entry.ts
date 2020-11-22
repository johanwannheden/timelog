import {Duration} from '../../model/duration';

export interface LogEntry {
    date: Date;
    duration: Duration;
    comment?: string;

    dateAdded: Date;
    dateUpdated?: Date;
}
