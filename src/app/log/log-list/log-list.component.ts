import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {LogEntryComponent} from '../log-entry/log-entry.component';
import {ModificationKind} from '../model/log-entry.modification';
import {Store} from '@ngrx/store';
import {selectLogEntries, selectLogEntryById} from '../state/log.selectors';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LogEntry} from '../state/log.entry';
import {triggerLogEntryDeletion} from '../state/log.actions';
import {SelectMonthComponent, YearMonth} from '../select-month/select-month.component';
import {selectStatusMessage} from '../../state/status.selectors';
import {getDurationAsString, getTimeOfDay} from '../../shared/time-utils';

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

    displayedColumns = ['date', 'duration', 'comment', 'update', 'delete'];
    dataSource = new MatTableDataSource<LogEntry>();
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private destroy$ = new Subject();

    constructor(public dialog: MatDialog, private store: Store) {
    }

    ngOnInit(): void {
        this.store.select(selectLogEntries).pipe(
            map(e => e.map(it => ({
                ...it,
                duration: getDurationAsString(getTimeOfDay(it.startTime), getTimeOfDay(it.endTime))
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

    openContextDateSelectionDialog(): void {
        const dialogRef = this.dialog.open(SelectMonthComponent);
        dialogRef.afterClosed().subscribe((value: YearMonth) => {
            console.log('> got', value);
        });
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
}
