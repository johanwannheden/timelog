import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LogEntry} from '../model/log-entry';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {LogEntryDialogComponent} from '../log-entry-dialog/log-entry-dialog.component';
import {ModificationKind} from '../model/log-entry.modification';
import {DialogCloseEvent, DialogCloseResult, DialogEntry} from '../model/dialog-entry.model';
import {dateToIsoString, getDuration} from '../../shared/time-utils';
import {Store} from '@ngrx/store';
import {storeLogEntry} from '../state/log.actions';
import {selectLogEntries} from '../state/log.selectors';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-log-list-component',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, OnDestroy, AfterViewInit {

    add = ModificationKind.Add;

    public displayedColumns = ['date', 'duration', 'comment', 'update', 'delete'];
    public dataSource = new MatTableDataSource<LogEntry>();
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private destroy$ = new Subject();

    constructor(public dialog: MatDialog, private store: Store) {
    }

    ngOnInit(): void {
        this.store.select(selectLogEntries).pipe(
            takeUntil(this.destroy$)
        ).subscribe(entries => {
            this.dataSource.data = entries as LogEntry[];
        });

        this.dataSource.filterPredicate = ((data, filter) => {
            return !!data?.comment?.includes(filter);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openDialog(kind: ModificationKind, data?: LogEntry): void {
        const dialogRef = this.dialog.open(LogEntryDialogComponent, {
            width: '250px',
            data: {kind, data}
        });

        dialogRef.afterClosed().subscribe((result: DialogCloseResult) => {
            if (result?.event === DialogCloseEvent.CONFIRMED && result?.result) {
                const entry: DialogEntry = result.result;
                const duration = getDuration(entry.startTime, entry.endTime);
                this.store.dispatch(storeLogEntry({
                    date: dateToIsoString(entry.date),
                    comment: entry.comment,
                    dateAdded: data?.dateAdded.toISOString() ?? new Date().toISOString(),
                    dateUpdated: new Date().toISOString(),
                    duration: duration.hours + ':' + duration.minutes,
                }));
            }
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
        // do nothing
    }

    redirectToDelete(date: string): void {
        // do nothing
    }
}
