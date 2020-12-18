import {ActionReducerMap} from '@ngrx/store';
import {statusReducer} from './state/status.reducer';
import {logEntryReducer} from './log/state/log.reducer';
import {StatusState} from './state/status.selectors';
import {LogEntryState} from './log/state/log.adapter';

export interface AppState {
    status: StatusState;
    logEntries: LogEntryState;
}

export const appReducer: ActionReducerMap<AppState> = {
    status: statusReducer,
    logEntries: logEntryReducer,
};
