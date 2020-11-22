import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LogEntry} from '../../model/log-entry';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {LogEntryDialogComponent} from '../log-entry-dialog/log-entry-dialog.component';
import {ModificationKind} from '../../model/log-entry.modification';
import {DialogEntry} from '../../model/dialog-entry.model';
import {getDuration} from '../../shared/time-utils';

@Component({
    selector: 'app-log-list-component',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, AfterViewInit {

    add = ModificationKind.Add;

    public displayedColumns = ['date', 'duration', 'comment', 'update', 'delete'];
    public dataSource = new MatTableDataSource<LogEntry>();

    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
        const sample: LogEntry = {
            date: new Date(),
            dateAdded: new Date(),
            dateUpdated: undefined,
            comment: 'Test entry',
            duration: {hours: 5, minutes: 30}
        };
        this.dataSource.data = [sample];

        this.dataSource.filterPredicate = ((data, filter) => {
            return !!data?.comment?.includes(filter);
        });
    }

    openDialog(kind: ModificationKind, data?: LogEntry): void {
        const dialogRef = this.dialog.open(LogEntryDialogComponent, {
            width: '250px',
            data: {kind, data}
        });

        dialogRef.afterClosed().subscribe((result: DialogEntry) => {
            const newEntry: LogEntry = {
                date: result.date,
                dateAdded: result.date,
                dateUpdated: new Date(),
                duration: getDuration(result.startTime, result.endTime),
                comment: result.comment,
            };
            this.dataSource.data = [...this.dataSource.data, newEntry];
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
