export interface DialogEntry {
    date: Date;
    startTime: string;
    endTime: string;
    comment?: string;
}

export const enum DialogCloseEvent {
    CONFIRMED, CANCELED
}

export interface DialogCloseResult {
    event: DialogCloseEvent;
    result: DialogEntry | undefined;
}
