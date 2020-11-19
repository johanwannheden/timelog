import {LogEntry} from './log-entry';

export enum ModificationKind {
    'Add' = 'Add', 'Update' = 'Update', 'Delete' = 'Delete'
}

export interface LogEntryModification {
    kind: ModificationKind;
    data?: LogEntry;
}
