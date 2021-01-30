import {createReducer, on} from '@ngrx/store';
import {deleteLogEntryError, generateReportResult, storeLogEntry, storeLogEntryError} from '../log/state/log.actions';
import {StatusState} from './status.selectors';
import {setSelectedMonth} from '../shared/select-month.actions';
import {setCurrentUserId, setInitialSelectedMonth} from './status.actions';

export const initialState: StatusState = {
    userId: undefined,
    message: undefined,
    year: undefined,
    month: undefined,
    loading: false,
};

export const statusReducer = createReducer<StatusState>(
    initialState,
    on(setInitialSelectedMonth, (state, {year, month}) => ({...state, year, month})),
    on(
        storeLogEntryError,
        generateReportResult,
        deleteLogEntryError,
        (state, {message}) => ({...state, message})
    ),
    on(
        setSelectedMonth,
        (state, {year, month}) => ({...state, year, month})
    ),
    on(storeLogEntry, state => ({...state, message: ''})),
    on(setCurrentUserId, (state, data) => ({...state, userId: data.data}))
);
