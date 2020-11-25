import {createAction, props} from '@ngrx/store';
import {LogEntryState} from './log-entry.state';

export const loadLogEntries = createAction('[Log List Component] Load Log Entries');

export const storeLogEntry = createAction(
    '[Log Create Component] Store Log Entry',
    props<LogEntryState>()
);
