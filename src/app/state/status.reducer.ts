import {createReducer, on} from '@ngrx/store';
import {deleteLogEntryError, storeLogEntry, storeLogEntryError} from '../log/state/log.actions';
import {StatusState} from './status.selectors';
import {setSelectedMonth} from '../log/select-month/select-month.actions';
import {setInitialSelectedMonth} from './status.actions';

export const initialState: StatusState = {
    userId: 'e3a64823-324c-4aa0-8cff-436fcc9fdcb4', // FIXME do not hard code userId
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
        deleteLogEntryError,
        (state, {message}) => ({...state, message})
    ),
    on(
        setSelectedMonth,
        (state, {year, month}) => ({...state, year, month})
    ),
    on(storeLogEntry, state => ({...state, message: ''})),
);
