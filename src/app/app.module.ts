import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,

        AppRoutingModule,
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'de-CH'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
