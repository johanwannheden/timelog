import {createReducer, on} from '@ngrx/store';
import {deleteLogEntryError, storeLogEntry, storeLogEntryError} from '../log/state/log.actions';
import {StatusState} from './status.selectors';
import {setSelectedMonth} from '../log/select-month/select-month.actions';
import {setInitialSelectedMonth} from './status.actions';

export const initialState: StatusState = {
    message: '<empty>',
    year: undefined,
    month: undefined,
    loading: false,
};

export const statusReducer = createReducer<StatusState>(
    initialState,
    on(setInitialSelectedMonth, (state, {year, month}) => ({...state, year, month})),
    on(
        storeLogEntryError,
        deleteLogEntryError,
        (state, {message}) => ({...state, message})
    ),
    on(
        setSelectedMonth,
        (state, {year, month}) => ({...state, year, month})
    ),
    on(storeLogEntry, state => ({...state, message: ''})),
);
