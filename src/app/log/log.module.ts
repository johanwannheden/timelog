import {NgModule} from '@angular/core';
import {LogListComponent} from './log-list/log-list.component';
import {LogRoutingModule} from './log-routing.module';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LogDurationPipe} from './pipe/log-duration.pipe';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {logEntryReducer} from './state/log.reducer';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {LogEntryComponent} from './log-entry/log-entry.component';
import {SharedModule} from '../shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    declarations: [
        LogListComponent,
        LogDurationPipe,
        LogEntryComponent,
    ],
    imports: [
        SharedModule,

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
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
    ],
})
export class LogModule {
}
