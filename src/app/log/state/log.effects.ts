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
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LogEntry} from './log.entry';
import {combineLatest, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {generateReport} from '../log-list/log-list.actions';
import {selectCurrentUserId, selectSelectedMonth} from '../../state/status.selectors';

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

    triggerReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(generateReport),
            switchMap(() =>
                combineLatest([this.store.select(selectCurrentUserId), this.store.select(selectSelectedMonth)])
                    .pipe(
                        mergeMap(([userId, selectedMonth]) => {
                                return this.http.get(
                                    `api/reporting/generate/${selectedMonth.year}/${selectedMonth.month + 1}/${userId}`,
                                    {responseType: 'blob'})
                                    .pipe(
                                        map((blob) => {
                                            const link = document.createElement('a');
                                            if (link.download !== undefined) {
                                                const url = URL.createObjectURL(blob);
                                                link.setAttribute('href', url);
                                                link.setAttribute('download', userId + '.pdf');
                                                link.style.visibility = 'hidden';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        })
                                    );
                            }
                        )
                    )
            )), {dispatch: false}
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
