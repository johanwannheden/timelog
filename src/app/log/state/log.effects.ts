import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {
    deleteLogEntry,
    deleteLogEntryError,
    loadLogEntries,
    storeLogEntry,
    storeLogEntryError,
    triggerLogEntryCreation,
    triggerLogEntryDeletion,
    triggerLogEntryUpdate,
    updateLogEntry
} from './log.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LogEntry} from './log.entry';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class LogEffects {

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() =>
                this.http.get('api/timelog/all').pipe(
                    map((data) => loadLogEntries({
                        entries: data as LogEntry[]
                    }))
                )
            ),
        )
    );

    updateEntry$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(triggerLogEntryUpdate),
                switchMap((action: LogEntry) => {
                    return this.http.post(`api/timelog/update/${action.id}`, action).pipe(
                        map(() => updateLogEntry(action)),
                        catchError((data) => of(storeLogEntryError({message: data.message})))
                    );
                })
            );
        }
    );

    createEntry$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(triggerLogEntryCreation),
                switchMap((action: LogEntry) => {
                    return this.http.put<LogEntry>('api/timelog/create', action).pipe(
                        map((result) => storeLogEntry(result)),
                        catchError((data) => of(storeLogEntryError({message: data.message})))
                    );
                })
            );
        }
    );

    deleteEntry$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(triggerLogEntryDeletion),
                switchMap((action: LogEntry) => {
                    return this.http.delete(`api/timelog/delete/${action.id}`).pipe(
                        map(() => deleteLogEntry(action)),
                        catchError((data) => of(deleteLogEntryError({message: data.message})))
                    );
                })
            );
        }
    );

    constructor(private actions$: Actions, private store: Store, private http: HttpClient) {
    }
}
