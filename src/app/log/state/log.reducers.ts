import {createReducer, on} from '@ngrx/store';
import {LogState} from './log.state';
import {storeLogEntry} from './log.actions';

const initialState: LogState = {logEntries: {}};

export const logReducer = createReducer(
    initialState,
    on(storeLogEntry, (state, {date, comment, dateAdded, dateUpdated, duration}) => ({
        logEntries: {
            ...state.logEntries,
            [date]: {
                date,
                comment,
                dateAdded,
                dateUpdated,
                duration,
            }
        }
    }))
);
