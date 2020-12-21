import {createReducer, on} from '@ngrx/store';
import {deleteLogEntryError, storeLogEntry, storeLogEntryError} from '../log/state/log.actions';
import {StatusState} from './status.selectors';

export const initialState: StatusState = {
    message: '',
    loading: false
};

export const statusReducer = createReducer<StatusState>(
    initialState,
    on(
        storeLogEntryError,
        deleteLogEntryError,
        (state, {message}) => ({...state, message})
    ),
    on(storeLogEntry, state => ({...state, message: ''})),
);
