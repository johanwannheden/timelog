import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,

        AppRoutingModule,

        StoreModule.forRoot({}, {}),
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'de-CH'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
