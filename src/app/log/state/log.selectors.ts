import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LogState} from './log.state';

export const selectLogState = createFeatureSelector<LogState>('log');

export const selectLogEntries = createSelector(
    selectLogState,
    state => Object.values(state.logEntries)
);
