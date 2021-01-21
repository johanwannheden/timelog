export interface LogEntry {
    id?: number;
    userId?: string;
    date: string;
    dateAdded: string;
    dateUpdated: string;
    startTime: string;
    endTime: string;
    comment?: string;
}
