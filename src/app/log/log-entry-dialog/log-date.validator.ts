import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectLogEntryKeys} from '../state/log.selectors';
import {map, switchMap, take} from 'rxjs/operators';
import {dateToIsoString} from '../../shared/time-utils';

@Injectable({
    providedIn: 'root'
})
export class LogDateValidator implements AsyncValidator {

    private logEntryKeys$ = this.store.select(selectLogEntryKeys);

    constructor(private store: Store) {
    }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const date = control?.value as Date;
        if (date) {
            return this.logEntryKeys$
                .pipe(
                    map(keys => {
                        const dateAsString = dateToIsoString(date);
                        if (keys?.find(it => it === dateAsString)) {
                            return {
                                duplicateDateEntry: dateAsString
                            };
                        }
                        return null;
                    }),
                    take(1));
        }
        return of(null);
    }
}
