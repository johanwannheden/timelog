import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {setCurrentUserId} from './status.actions';

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class StatusEffects {

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() =>
                this.http.get('api/user/currentUserId', {responseType: 'text'}).pipe(
                    map((data) => {
                        return setCurrentUserId({
                            data: data as string
                        });
                    })
                )
            ),
        )
    );

    constructor(private actions$: Actions, private http: HttpClient) {
    }
}
