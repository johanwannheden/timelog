import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors} from '@angular/forms';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectLogEntryKeys} from '../state/log.selectors';
import {map, take} from 'rxjs/operators';
import * as moment from 'moment';
import {Moment} from 'moment';
import {getMinuteOfDay, isValidFormat, momentToId} from '../../shared/time-utils';

@Injectable()
export class LogDateValidator {

    private logEntryKeys$ = this.store.select(selectLogEntryKeys);

    constructor(private store: Store) {
    }

    duplicateLogEntry: AsyncValidatorFn =
        (control: AbstractControl) => {
            const momentOfEntry = control?.value as Moment;
            if (momentOfEntry) {
                return this.logEntryKeys$
                    .pipe(
                        map(keys => {
                            const momentAsId = momentToId(momentOfEntry);
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
        };

    entryOfCurrentMonth: AsyncValidatorFn =
        (control: AbstractControl) => {
            const dateControlValue = control.get('date')?.value as Moment;
            if (dateControlValue) {
                const currentMoment = moment();
                if (dateControlValue
                    && dateControlValue?.month() !== currentMoment.month()
                    && dateControlValue?.year() !== currentMoment.year()) {
                    return of({entryIsReadOnly: momentToId(dateControlValue)});
                }
            }
            return of(null);
        };
}

export function endTimeIsAfterStartTime(control: AbstractControl): ValidationErrors | null {
    if (control instanceof FormGroup) {
        const fg = control as FormGroup;
        const startTime = fg.get('startTime')?.value as string;
        const endTime = fg.get('endTime')?.value as string;

        if (!(isValidFormat(startTime) && isValidFormat(endTime))) {
            return null;
        }

        const startMinute = getMinuteOfDay(startTime);
        const endMinute = getMinuteOfDay(endTime);

        if (startMinute > endMinute) {
            return {invalidEndTime: {value: endTime}};
        }
    }
    return null;
}
