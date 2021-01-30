import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ModificationKind} from '../../model/log-entry.modification';
import {createSelector, MemoizedSelector, Store} from '@ngrx/store';
import {selectLogEntries} from '../state/log.selectors';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LogEntry} from '../state/log.entry';
import {triggerLogEntryDeletion} from '../state/log.actions';
import {selectSelectedMonth, selectStatusMessage} from '../../state/status.selectors';
import {getDurationAsString, parseTimeOfDay} from '../../shared/time-utils';
import * as moment from 'moment';
import {setSelectedMonth} from '../../shared/select-month.actions';
import {generateReport} from './log-list.actions';
import {Router} from '@angular/router';

@Component({
    selector: 'app-log-list-component',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, OnDestroy, AfterViewInit {

    add = ModificationKind.Add;

    // @ts-ignore
    error$ = this.store.select(selectStatusMessage);

    displayedColumns = ['date', 'duration', 'comment', 'update', 'delete'];
    dataSource = new MatTableDataSource<LogEntry>();
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private destroy$ = new Subject();

    constructor(public dialog: MatDialog, private store: Store, private router: Router) {
    }

    private selectLogEntriesByMonth(monthSelector: MemoizedSelector<object, any>): MemoizedSelector<object, LogEntry[]> {
        return createSelector(
            monthSelector,
            selectLogEntries,
            (month, entities) => {
                return entities.filter(e => {
                    const date = moment(e.date);
                    return date.year() === month.year && date.month() === month.month;
                });
            }
        );
    }

    ngOnInit(): void {
        this.store.select(this.selectLogEntriesByMonth(selectSelectedMonth)).pipe(
            map((entries) => entries.map(e => ({
                ...e,
                duration: getDurationAsString(parseTimeOfDay(e.startTime), parseTimeOfDay(e.endTime))
            }))),
            takeUntil(this.destroy$)
        ).subscribe(entries => {
            this.dataSource.data = entries ? entries as LogEntry[] : [];
        });

        this.dataSource.filterPredicate = ((data, filter) => {
            return !!data?.comment?.includes(filter);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter($event: any): void {
        if ($event.value) {
            this.dataSource.filter = $event.value;
        }
    }

    customSort($event: any): void {
        // do nothing
    }

    redirectToUpdate(date: string): void {
        const entry = this.dataSource.data.find(it => it.date === date);
        if (entry?.id) {
            this.router.navigate(['log/entry'], {queryParams: {id: entry.id, action: ModificationKind.Update}});
        }
    }

    redirectToDelete(date: string): void {
        const entry = this.dataSource.data.find(it => it.date === date);
        if (entry?.id) {
            this.store.dispatch(triggerLogEntryDeletion(entry));
        }
    }

    monthSelected(value: { year: number, month: number }): void {
        this.store.dispatch(setSelectedMonth(value));
    }

    onGenerateClicked(): void {
        this.store.dispatch(generateReport());
    }
}
