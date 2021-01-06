import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {LogEffects} from './log/state/log.effects';
import {HttpClientModule} from '@angular/common/http';
import {appReducer} from './app.reducer';
import {StatusEffects} from './state/status.effects';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        RouterModule,

        AppRoutingModule,

        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([StatusEffects, LogEffects]),
        StoreDevtoolsModule.instrument()
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'de-CH'},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
