import {NgModule} from '@angular/core';
import {YearMonthPipe} from './year-month.pipe';
import {YearMonthFormatDirective} from './year-month-format.directive';
import {YearMonthDayFormatDirective} from './year-month-day-format.directive';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [
        YearMonthPipe,
        YearMonthFormatDirective,
        YearMonthDayFormatDirective,
    ],
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        FlexLayoutModule,
    ],
    exports: [
        YearMonthPipe,
        YearMonthFormatDirective,
        YearMonthDayFormatDirective,

        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        FlexLayoutModule,
    ]
})
export class SharedModule {
}
