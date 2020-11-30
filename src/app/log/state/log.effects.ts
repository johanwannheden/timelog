import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {processDialogEntry, storeLogEntry, updateLogEntry} from './log.actions';
import {switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LogEntry} from './log.entry';
import {of} from 'rxjs';
import {getDurationAsString, momentToId} from '../../shared/time-utils';
import {ModificationKind} from '../model/log-entry.modification';

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class LogEffects {

    transformDialogEntry$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(processDialogEntry),
                switchMap((action) => {
                    const logEntryState: LogEntry = {
                        date: momentToId(action.date),
                        dateAdded: new Date().toISOString(),
                        dateUpdated: new Date().toISOString(),
                        startTime: action.startTime.hour + ':' + action.startTime.minute,
                        endTime: action.endTime.hour + ':' + action.endTime.minute,
                        duration: getDurationAsString(action.startTime, action.endTime),
                        comment: action.comment
                    };

                    switch (action.action) {
                        case ModificationKind.Update:
                            return of(updateLogEntry(logEntryState));
                        default:
                            return of(storeLogEntry(logEntryState));
                    }
                })
            );
        }
    );

    constructor(private actions$: Actions, private store: Store) {
    }
}
