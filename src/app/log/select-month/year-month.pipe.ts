import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'yearMonth'})
export class YearMonthPipe implements PipeTransform {
    transform(value: { year: number, month: number }): any {
        const month = String(value.month + 1).padStart(2, '0');
        return moment(`${value.year}-${month}-01`).format('MMM YYYY');
    }
}
