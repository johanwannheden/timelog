import {createReducer, on} from '@ngrx/store';
import {storeLogEntry, storeLogEntryError} from '../log/state/log.actions';
import {StatusState} from './status.selectors';

export const initialState: StatusState = {
    message: ''
};

export const statusReducer = createReducer<StatusState>(
    initialState,
    on(storeLogEntryError, (state, {message}) => ({...state, message})),
    on(storeLogEntry, state => ({...state, message: ''})),
);
