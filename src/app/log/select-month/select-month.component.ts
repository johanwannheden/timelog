import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {FORMAT} from '../shared/year-month-format.directive';
import {MatDialogRef} from '@angular/material/dialog';

export interface YearMonth {
    year: number;
    month: number;
}

@Component({
    selector: 'app-select-month',
    templateUrl: './select-month.component.html',
    styleUrls: ['./select-month.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: FORMAT},
    ]
})
export class SelectMonthComponent implements OnInit {
    displayedColumns: string[] = ['yearMonth'];
    dataSource: YearMonth[] = [];

    constructor(public dialogRef: MatDialogRef<SelectMonthComponent>) {
        //
    }

    ngOnInit(): void {
        this.dataSource = [
            {year: 2021, month: 4},
            {year: 2021, month: 3},
            {year: 2021, month: 2},
            {year: 2021, month: 1},
            {year: 2020, month: 12},
            {year: 2020, month: 11},
        ];
    }

    entrySelected(value: YearMonth): void {
        this.dialogRef.close(value);
    }
}
