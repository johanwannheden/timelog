import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogListComponent} from './log-list-component/log-list.component';
import {CreateLogEntryComponent} from './create-log-entry/create-log-entry.component';

const routes: Routes = [
  {
    path: 'list',
    component: LogListComponent
  },
  {
    path: 'create',
    component: CreateLogEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
