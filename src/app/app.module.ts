import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LogListComponent} from './log-list-component/log-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';

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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {LogDatePipe} from './pipe/log-date.pipe';
import {LogDurationPipe} from './pipe/log-duration.pipe';
import {LogEntryDialogComponent} from './log-entry-dialog/log-entry-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LogListComponent,
        LogEntryDialogComponent,
        LogDatePipe,
        LogDurationPipe,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        AppRoutingModule,

        // material
        CommonModule,
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
        MatNativeDateModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'de-CH' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
