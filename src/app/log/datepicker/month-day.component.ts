import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'app-month-day',
    templateUrl: './month-day.component.html',
})
export class MonthDayComponent {

    date = new FormControl(new Date());

    chosenYearHandler(normalizedYear: Date): void {
    }

    chosenMonthHandler(normalizedMonth: Date, datepicker: any): void {
    }
}
