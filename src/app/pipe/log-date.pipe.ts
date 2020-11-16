import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'logDate'})
export class LogDatePipe implements PipeTransform {
    transform(value: Date, ...args: any[]): string {
        if (!value) {
            return '';
        }
        return `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;
    }
}
