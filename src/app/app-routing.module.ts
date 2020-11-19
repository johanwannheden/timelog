import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogListComponent} from './log-list-component/log-list.component';
import {LogEntryDialogComponent} from './log-entry-dialog/log-entry-dialog.component';

const routes: Routes = [
  {
    path: 'create',
    component: LogEntryDialogComponent
  },
  {
    path: '',
    component: LogListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
