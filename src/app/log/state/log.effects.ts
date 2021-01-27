import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {
    deleteLogEntry,
    deleteLogEntryError,
    generateReportResult,
    loadLogEntries,
    storeLogEntry,
    storeLogEntryError,
    triggerLogEntryCreation,
    triggerLogEntryDeletion,
    triggerLogEntryUpdate,
    updateLogEntry
} from './log.actions';
import {catchError, filter, map, mergeMap, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LogEntry} from './log.entry';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {generateReport} from '../log-list/log-list.actions';
import {selectCurrentUserId, selectSelectedMonth} from '../../state/status.selectors';
import {setInitialSelectedMonth} from '../../state/status.actions';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class LogEffects {

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() =>
                this.store.select(selectCurrentUserId)
                    .pipe(
                        filter(Boolean),
                        mergeMap(() => this.http.get(environment.server.url + `/api/timelog/all`).pipe(
                            map((data) => loadLogEntries({
                                entries: data as LogEntry[]
                            }))
                        ))
                    )
            ),
        )
    );

    setCurrentMonth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadLogEntries),
            switchMap((data) => {
                const lastDate = Array.from(data.entries)
                    .sort((e1, e2) => e1.date.localeCompare(e2.date))
                    .reduce((e1, e2) => e2).date;
                const m = moment(lastDate);
                return of(setInitialSelectedMonth({year: m.year(), month: m.month()}));
            })
        );
    });

    triggerReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(generateReport),
            switchMap(() =>
                this.store.select(selectSelectedMonth)
                    .pipe(
                        take(1),
                        mergeMap((selectedMonth) => {
                                return this.http.get(
                                    environment.server.url + `/api/reporting/generate/${selectedMonth.year}/${selectedMonth.month + 1}`,
                                    {responseType: 'blob'})
                                    .pipe(
                                        map((blob) => {
                                            const link = document.createElement('a');
                                            if (link.download !== undefined) {
                                                const url = URL.createObjectURL(blob);
                                                link.setAttribute('href', url);
                                                link.setAttribute('download', 'report.pdf');
                                                link.style.visibility = 'hidden';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                            return generateReportResult({});
                                        }),
                                        catchError((data) => of(generateReportResult({message: data.message})))
                                    );
                            }
                        )
                    )
            ))
    );

    updateEntry$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(triggerLogEntryUpdate),
                switchMap((action: LogEntry) => {
                    return this.http.post(environment.server.url + `/api/timelog/update/${action.id}`, action).pipe(
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
                    return this.http.put<LogEntry>(environment.server.url + '/api/timelog/create', action).pipe(
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
                    return this.http.delete(environment.server.url + `/api/timelog/delete/${action.id}`).pipe(
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
