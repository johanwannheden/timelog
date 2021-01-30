import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectMonths} from '../log/state/log.selectors';
import {Router} from '@angular/router';
import {setSelectedMonth} from '../shared/select-month.actions';
import {generateReport} from '../log/log-list/log-list.actions';
import {ModificationKind} from '../model/log-entry.modification';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    selectedMonths$ = this.store.select(selectMonths);

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit(): void {
    }

    onGenerateClicked(): void {
        this.store.dispatch(generateReport());
    }

    onMonthSelected(value: { year: number, month: number }): void {
        this.store.dispatch(setSelectedMonth(value));
    }

    openAddButtonClicked(): void {
        this.router.navigate(['/log/entry'], {queryParams: {action: ModificationKind.Add}});
    }
}
