import {createAction, props} from '@ngrx/store';
import {LogEntry} from './log.entry';

export const loadLogEntries = createAction(
    '[Log Effects] Log Entries Loaded',
    props<{ entries: LogEntry[] }>()
);

export const storeLogEntry = createAction(
    '[Log Entry Dialog Component] Store Log Entry',
    props<LogEntry>()
);

export const deleteLogEntry = createAction(
    '[Log List Component] Delete Log Entry',
    props<{ date: string }>()
);

export const updateLogEntry = createAction(
    '[Log Entry Log Component] Update Log Entry',
    props<LogEntry>()
);

export const triggerLogEntryCreation = createAction(
    '[Log Entry Dialog Component] Create Log Entry',
    props<LogEntry>()
);

export const triggerLogEntryUpdate = createAction(
    '[Log Entry Dialog Component] Update Log Entry',
    props<LogEntry>()
);

export const triggerLogEntryDeletion = createAction(
    '[Log Entry Dialog Component] Delete Log Entry',
    props<LogEntry>()
);

export const storeLogEntryError = createAction(
    '[Log Effects] Error Storing Log Entry',
    props<{ message: string }>()
);

export const deleteLogEntryError = createAction(
    '[Log Effects] Error Deleting Log Entry',
    props<{ message: string }>()
);
