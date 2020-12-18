import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {loadLogEntries, processDialogEntry, storeLogEntry, storeLogEntryError, updateLogEntry} from './log.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LogEntry} from './log.entry';
import {of} from 'rxjs';
import {getDurationAsString, momentToId} from '../../shared/time-utils';
import {ModificationKind} from '../model/log-entry.modification';
import {DialogEntry} from '../model/dialog-entry.model';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class LogEffects {

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => {
                return this.http.get('api/timelog/all').pipe(
                    map((data) => loadLogEntries({
                        entries: data as LogEntry[]
                    }))
                );
            })
        )
    );

    processDialogEntry$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(processDialogEntry),
                switchMap((action: DialogEntry) => {
                    const logEntryState = this.convertToLogEntry(action);

                    switch (action.action) {
                        case ModificationKind.Update:
                            return this.http.post('api/timelog/update', logEntryState).pipe(
                                map(() => updateLogEntry(logEntryState)),
                                catchError((data) => of(storeLogEntryError({message: data.message})))
                            );
                        default:
                            return this.http.put('api/timelog/create', logEntryState).pipe(
                                map(() => storeLogEntry(logEntryState)),
                                catchError((data) => of(storeLogEntryError({message: data.message})))
                            );
                    }
                })
            );
        }
    );

    private convertToLogEntry(action: DialogEntry): LogEntry {
        return {
            date: momentToId(action.date),
            dateAdded: moment().format('YYYY-MM-DDTHH:mm:ss'), // TODO only if creating entry
            dateUpdated: moment().format('YYYY-MM-DDTHH:mm:ss'),
            startTime: action.startTime.formatted(),
            endTime: action.endTime.formatted(),
            duration: getDurationAsString(action.startTime, action.endTime),
            comment: action.comment
        };
    }

    constructor(private actions$: Actions, private store: Store, private http: HttpClient) {
    }
}
