import {createAction, props} from '@ngrx/store';
import {LogEntry} from './log.entry';
import {DialogEntry} from '../model/dialog-entry.model';

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
    '[Log Entry Dialog Component] Update Log Entry',
    props<LogEntry>()
);

export const processDialogEntry = createAction(
    '[Log Entry Dialog Component] Process Dialog Entry',
    props<DialogEntry>()
);

export const storeLogEntryError = createAction(
    '[Log Effects] Error Storing Log Entry',
    props<{ message: string }>()
);
