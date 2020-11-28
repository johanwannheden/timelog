import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {processDialogEntry, storeLogEntry} from './log.actions';
import {switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {LogEntryState} from './log-entry.state';
import {of} from 'rxjs';
import {momentToId} from '../../shared/time-utils';

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class LogEffects {

    transformDialogEntry$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(processDialogEntry),
                switchMap((action) => {
                    const logEntryState: LogEntryState = {
                        date: momentToId(action.date),
                        dateAdded: new Date().toISOString(),
                        dateUpdated: new Date().toISOString(),
                        startTime: action.startTime.hour + ':' + action.startTime.minute,
                        endTime: action.endTime.hour + ':' + action.endTime.minute,
                        comment: action.comment
                    };
                    return of(storeLogEntry(logEntryState));
                })
            );
        }
    );

    constructor(private actions$: Actions, private store: Store) {
    }
}
