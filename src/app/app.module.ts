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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {appReducer} from './app.reducer';
import {UserIdHttpInterceptorService} from './shared/user-id-http-interceptor.service';
import {StatusEffects} from './state/status.effects';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        RouterModule,

        SharedModule,

        AppRoutingModule,

        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([StatusEffects, LogEffects]),
        StoreDevtoolsModule.instrument(),
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'de-CH'},
        {provide: HTTP_INTERCEPTORS, useClass: UserIdHttpInterceptorService, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
