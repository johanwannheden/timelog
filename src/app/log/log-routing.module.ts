import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LogListComponent} from './log-list/log-list.component';

const routes: Routes = [
    {path: 'list', component: LogListComponent},
    {path: '**', redirectTo: 'list'},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class LogRoutingModule {
}
