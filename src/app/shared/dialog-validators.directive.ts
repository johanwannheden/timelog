import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {getMinuteOfDay, isValidFormat} from './time-utils';

export function workingDateNotAfter(value: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const givenDate = control?.value as Date;
        return givenDate?.valueOf() > value.valueOf() ? {
            dateInFuture: {value: givenDate}
        } : null;
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
