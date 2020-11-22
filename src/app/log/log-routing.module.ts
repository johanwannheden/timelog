import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LogListComponent} from './log-list/log-list.component';

const routes: Routes = [
    // { path: 'create', component: LogEntryCreateComponent },
    {path: '', redirectTo: 'list'},
    {path: 'list', component: LogListComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
})
export class LogRoutingModule {
}
