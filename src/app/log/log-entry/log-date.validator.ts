import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectLogEntryKeys} from '../state/log.selectors';
import {map, take} from 'rxjs/operators';
import {Moment} from 'moment';
import {momentToId} from '../../shared/time-utils';

@Injectable({
    providedIn: 'root'
})
export class LogDateValidator implements AsyncValidator {

    private logEntryKeys$ = this.store.select(selectLogEntryKeys);

    constructor(private store: Store) {
    }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const moment = control?.value as Moment;
        if (moment) {
            return this.logEntryKeys$
                .pipe(
                    map(keys => {
                        const momentAsId = momentToId(moment);
                        if (keys?.find(it => it === momentAsId)) {
                            return {
                                duplicateDateEntry: momentAsId
                            };
                        }
                        return null;
                    }),
                    take(1));
        }
        return of(null);
    }
}
