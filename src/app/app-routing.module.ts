import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogListComponent} from './log-list-component/log-list.component';

const routes: Routes = [
  {
    path: '',
    component: LogListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
