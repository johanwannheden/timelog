import {createFeatureSelector, createSelector} from '@ngrx/store';
import {logAdapter, LogEntryState} from './log.adapter';
import {LogEntry} from './log.entry';

export const selectLogEntryState = createFeatureSelector<LogEntryState>('logEntries');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = logAdapter.getSelectors();

export const selectLogEntryById = (logEntryId: string) => createSelector(
    selectLogEntryState,
    logEntryState => {
        const entry = logEntryState.entities[logEntryId];
        if (entry) {
            return ({
                date: entry.date,
                startTime: entry.startTime,
                endTime: entry.endTime,
                duration: entry.duration,
                comment: entry.comment,
                dateAdded: entry.dateAdded,
                dateUpdated: entry.dateUpdated,
            }) as LogEntry;
        }
        return undefined;
    }
);

export const selectLogEntries = createSelector(
    selectLogEntryState,
    (logState: LogEntryState) => {
        if (!logState?.ids?.length) {
            return [];
        }
        return Object.values(logState.entities).map(it => {
            // tslint:disable-next-line:no-non-null-assertion
            const entry = it!;
            return ({
                date: entry.date,
                startTime: entry.startTime,
                endTime: entry.endTime,
                duration: entry.duration,
                comment: entry.comment,
                dateAdded: entry.dateAdded,
                dateUpdated: entry.dateUpdated,
            }) as LogEntry;
        });
    }
);

export const selectLogEntryKeys = createSelector(
    selectLogEntryState,
    (logState: LogEntryState) => logState.ids
);
