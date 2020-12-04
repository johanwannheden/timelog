import {Pipe, PipeTransform} from '@angular/core';
import {YearMonth} from './select-month.component';

enum Month {
    'January' = 1,
    'February' = 2,
    'March' = 3,
    'April' = 4,
    'May' = 5,
    'June' = 6,
    'July' = 7,
    'August' = 8,
    'September' = 9,
    'October' = 10,
    'November' = 11,
    'December' = 12,
}

@Pipe({name: 'yearMonth'})
export class YearMonthPipe implements PipeTransform {
    transform(value: YearMonth): any {
        return `${Month[value.month]} ${value.year}`;
    }
}
