import {NgModule} from '@angular/core';
import {LogEntryDialogComponent} from './log-entry-dialog/log-entry-dialog.component';
import {LogListComponent} from './log-list/log-list.component';
import {LogRoutingModule} from './log-routing.module';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LogDurationPipe} from './pipe/log-duration.pipe';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {YearMonthFormatDirective} from './shared/year-month-format.directive';
import {YearMonthDayFormatDirective} from './shared/year-month-day-format.directive';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {logEntryReducer} from './state/log.reducer';

@NgModule({
    declarations: [
        LogEntryDialogComponent,
        LogListComponent,
        LogDurationPipe,
        YearMonthFormatDirective,
        YearMonthDayFormatDirective
    ],
    imports: [
        CommonModule,
        LogRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,

        FlexLayoutModule,

        StoreModule.forFeature('logEntries', logEntryReducer),

        // material
        CommonModule,
        MatMomentDateModule,
        MatTabsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCardModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatDialogModule,
    ],
    exports: [
        YearMonthFormatDirective,
        YearMonthDayFormatDirective
    ],
})
export class LogModule {
}
