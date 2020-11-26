import {createAction, props} from '@ngrx/store';
import {LogEntryState} from './log-entry.state';
import {DialogEntry} from '../model/dialog-entry.model';

export const loadLogEntries = createAction('[Log List Component] Load Log Entries');

export const storeLogEntry = createAction(
    '[Log List Component] Store Log Entry',
    props<LogEntryState>()
);

export const processDialogEntry = createAction(
    '[Log Entry Dialog Component] Process Dialog Entry',
    props<DialogEntry>()
);
