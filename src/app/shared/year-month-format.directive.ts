import {MAT_DATE_FORMATS} from '@angular/material/core';
import {Directive} from '@angular/core';

export const FORMAT = {
    parse: {
        dateInput: 'YYYY-MM',
    },
    display: {
        dateInput: 'YYYY-MM',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Directive({
    selector: '[appYearMonthFormat]',
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: FORMAT},
    ],
})
export class YearMonthFormatDirective {
}
