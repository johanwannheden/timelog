import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from '../model/duration';

@Pipe({name: 'logDuration'})
export class LogDurationPipe implements PipeTransform {
    transform(value: Duration): string {
        if (!value) {
            return '';
        }
        const minutes = `${value.minutes}`.padStart(2, '0');
        return `${value.hours}:${minutes}`;
    }
}
