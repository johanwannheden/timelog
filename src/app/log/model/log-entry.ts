import {Duration} from '../../model/duration';

export interface LogEntry {
    date: string;
    duration: Duration;
    comment?: string;

    dateAdded: Date;
    dateUpdated?: Date;
}
