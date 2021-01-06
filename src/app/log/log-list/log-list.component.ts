import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {LogEntryComponent} from '../log-entry/log-entry.component';
import {ModificationKind} from '../model/log-entry.modification';
import {createSelector, MemoizedSelector, Store} from '@ngrx/store';
import {selectLogEntries, selectLogEntryById, selectMonths} from '../state/log.selectors';
import {map, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {LogEntry} from '../state/log.entry';
import {triggerLogEntryDeletion} from '../state/log.actions';
import {selectSelectedMonth, selectStatusMessage} from '../../state/status.selectors';
import {getDurationAsString, parseTimeOfDay} from '../../shared/time-utils';
import * as moment from 'moment';
import {setSelectedMonth} from '../select-month/select-month.actions';

interface LogEntryWithDuration extends LogEntry {
    duration: string;
}

@Component({
    selector: 'app-log-list-component',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, OnDestroy, AfterViewInit {

    add = ModificationKind.Add;

    // @ts-ignore
    error$ = this.store.select(selectStatusMessage);
    selectedMonths$ = this.store.select(selectMonths);
    // selectedMonth$: Observable<{ year: number, month: number }> = this.store.select(selectSelectedMonth);

    displayedColumns = ['date', 'duration', 'comment', 'update', 'delete'];
    dataSource = new MatTableDataSource<LogEntry>();
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private destroy$ = new Subject();

    constructor(public dialog: MatDialog, private store: Store) {
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
            map(e => e.map(it => ({
                ...it,
                duration: getDurationAsString(parseTimeOfDay(it.startTime), parseTimeOfDay(it.endTime))
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

    openLogEntryDialog(kind: ModificationKind, data?: string): void {
        this.dialog.open(LogEntryComponent, {
            width: '250px',
            data: {kind, data}
        });
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
        this.openLogEntryDialog(ModificationKind.Update, date);
    }

    redirectToDelete(date: string): void {
        this.store.select(selectLogEntryById(date))
            .pipe(take(1))
            .subscribe((entry) => {
                if (entry) {
                    this.store.dispatch(triggerLogEntryDeletion(entry));
                }
            });
    }

    monthSelected(value: { year: number, month: number }): void {
        this.store.dispatch(setSelectedMonth(value));
    }

    onGenerateClicked(): void {
        console.log('>> do generate report');
    }
}
