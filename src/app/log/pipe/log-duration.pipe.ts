import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from '../../model/duration';
import {parseDuration} from '../../shared/time-utils';

@Pipe({name: 'logDuration'})
export class LogDurationPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '';
        }
        const duration = parseDuration(value);
        const minutes = `${duration.minutes}`.padStart(2, '0');
        return `${duration.hours}:${minutes}`;
    }
}
