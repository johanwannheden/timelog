import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LogEntry} from '../model/log-entry';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
    selector: 'app-log-list-component',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, AfterViewInit {

    public displayedColumns = ['date', 'duration', 'comment', 'update', 'delete'];
    public dataSource = new MatTableDataSource<LogEntry>();

    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
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
            if (data?.comment?.includes(filter)) {
                return true;
            }
            return false;
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
