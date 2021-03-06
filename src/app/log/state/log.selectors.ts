import {createFeatureSelector, createSelector} from '@ngrx/store';
import {logAdapter, LogEntryState} from './log.adapter';
import {LogEntry} from './log.entry';
import * as moment from 'moment';

export const selectLogEntryState = createFeatureSelector<LogEntryState>('logEntries');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = logAdapter.getSelectors();

export const selectLogEntryById = (id: number) => createSelector(
    selectLogEntryState,
    logEntryState => Object.values(logEntryState.entities).find(e => e?.id === id)
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
                id: entry.id,
                date: entry.date,
                startTime: entry.startTime,
                endTime: entry.endTime,
                comment: entry.comment,
                dateAdded: entry.dateAdded,
                dateUpdated: entry.dateUpdated,
                userId: entry.userId
            }) as LogEntry;
        });
    }
);

export const selectLogEntryKeys = createSelector(
    selectLogEntryState,
    (logState: LogEntryState): string[] => logState.ids
);

export const selectMonths = createSelector(
    selectLogEntries,
    (entries: LogEntry[]) => {
        const uniqueStringValues = new Set(entries
            .map(e => {
                const date = moment(e.date);
                return ({year: date.year(), month: date.month()});
            })
            .map(o => JSON.stringify(o))
        );
        return Array.from(uniqueStringValues).map(o => JSON.parse(o));
    }
);
