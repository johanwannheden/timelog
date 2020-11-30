import {createReducer, on} from '@ngrx/store';
import {initialState, logAdapter} from './log.adapter';
import {deleteLogEntry, storeLogEntry, updateLogEntry} from './log.actions';

export const logEntryReducer = createReducer(
    initialState,
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
