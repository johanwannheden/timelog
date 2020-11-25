import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LogState} from './log.state';
import {LogEntry} from '../model/log-entry';
import {parseDuration} from '../../shared/time-utils';

export const selectLogState = createFeatureSelector<LogState>('log');

export const selectLogEntries = createSelector(
    selectLogState,
    state => {
        const logEntryStates = Object.values(state.logEntries);
        return logEntryStates.map(it => ({
            date: it.date,
            comment: it.comment,
            dateAdded: new Date(Date.parse(it.dateAdded)),
            dateUpdated: it.dateUpdated && new Date(Date.parse(it.dateUpdated)),
            duration: parseDuration(it.duration)
        }) as LogEntry);
    }
);
