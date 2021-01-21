import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {setInitialSelectedMonth} from './status.actions';
import {getCurrentYearMonth} from '../shared/time-utils';

@Injectable()
export class StatusEffects {
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() =>
                // TODO alternatively set the month of last log entry
                of(setInitialSelectedMonth(getCurrentYearMonth()))
            )
        )
    );

    constructor(private actions$: Actions, private store: Store) {
    }
}
