import {createReducer, on} from '@ngrx/store';
import {initialState, logAdapter} from './log.adapter';
import {deleteLogEntry, loadLogEntries, storeLogEntry, updateLogEntry} from './log.actions';

export function logEntryReducer(state: any, action: any): any {
    return _logEntryReducer(state, action);
}

// tslint:disable-next-line:variable-name
export const _logEntryReducer = createReducer(
    initialState,
    on(loadLogEntries, (state, action) =>
        logAdapter.addMany(action.entries, state)
    ),
    on(storeLogEntry, (state, action) =>
        logAdapter.addOne(action, state)
    ),
    on(updateLogEntry, (state, action) =>
        logAdapter.upsertOne(action, state)
    ),
    on(deleteLogEntry, (state, action) =>
        logAdapter.removeOne(action.date, state)
    ),
);
