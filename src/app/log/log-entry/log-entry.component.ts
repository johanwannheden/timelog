import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectCurrentUserId} from '../../state/status.selectors';
import {Store} from '@ngrx/store';
import {endTimeIsAfterStartTime, LogDateValidator} from './log-date.validator';
import {combineLatest, Subject} from 'rxjs';
import {ModificationKind} from '../../model/log-entry.modification';
import {selectLogEntries, selectLogEntryById} from '../state/log.selectors';
import {LogEntry} from '../state/log.entry';
import * as moment from 'moment';
import {getDefaultEndTime, getDefaultStartTime, momentToId, parseTimeOfDay, TIME_FORMAT} from '../../shared/time-utils';
import {triggerLogEntryCreation, triggerLogEntryUpdate} from '../state/log.actions';

@Component({
    selector: 'app-log-entry',
    templateUrl: './log-entry.component.html',
    providers: [LogDateValidator],
    styleUrls: ['./log-entry.component.css']
})
export class LogEntryComponent implements OnInit, OnDestroy {

    formGroup: FormGroup | undefined;

    private action: ModificationKind | undefined;
    private id: number | undefined;
    private userId: string | undefined;
    private entry: LogEntry | undefined;

    private destroy$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private store: Store,
        private validators: LogDateValidator
    ) {
        combineLatest([
            route.queryParams,
            this.store.select(selectCurrentUserId)
        ]).pipe(
            map(([params, userId]) => {
                this.action = params.action;
                this.id = Number(params.id);
                this.userId = userId;
                this.init();
            }),
            take(1)
        ).subscribe();
    }

    ngOnInit(): void {
        this.store.select(selectLogEntries)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                const date = this.formGroup?.get('date');
                if (date) {
                    // handle initial enablement of Add button; must trigger validator
                    // before any control has been changed by the user
                    date.updateValueAndValidity();
                }
            });
    }

    init(): void {
        if (this.id) {
            this.store.select(selectLogEntryById(this.id))
                .pipe(take(1))
                .subscribe(it => {
                    this.entry = it;
                    this.initWithData();
                });
        } else {
            this.initWithData();
        }
    }

    onAddClicked(): void {
        const createNewLogEntry = this.action === ModificationKind.Add;

        const logEntry = {
            id: this.id,
            date: momentToId(this.formGroup?.get('date')?.value),
            comment: this.formGroup?.get('comment')?.value,
            startTime: parseTimeOfDay(this.formGroup?.get('startTime')?.value).formatted(),
            endTime: parseTimeOfDay(this.formGroup?.get('endTime')?.value).formatted(),
            dateAdded: this.entry?.dateAdded ?? moment().format('YYYY-MM-DDTHH:mm:ss'),
            dateUpdated: moment().format('YYYY-MM-DDTHH:mm:ss'),
            userId: this.userId
        };

        if (createNewLogEntry) {
            this.store.dispatch(triggerLogEntryCreation(logEntry));
        } else {
            this.store.dispatch(triggerLogEntryUpdate(logEntry));
        }
        this.router.navigateByUrl('log/list');
    }

    onCancelClicked(): void {
        this.router.navigateByUrl('log/list');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initWithData(): void {
        const addNewEntry = !this.entry;
        const date = moment(this.entry?.date);
        const startTime = this.entry?.startTime ? parseTimeOfDay(this.entry.startTime).formatted() : getDefaultStartTime();
        const endTime = this.entry?.endTime ? parseTimeOfDay(this.entry.endTime).formatted() : getDefaultEndTime();
        const comment = this.entry?.comment;

        this.formGroup = this.formBuilder.group({
            date: [
                date,
                [Validators.required],
                [this.validators.duplicateLogEntry]
            ],
            startTime: [startTime, [Validators.required, Validators.pattern(TIME_FORMAT)]],
            endTime: [endTime, [Validators.required, Validators.pattern(TIME_FORMAT)]],
            comment: [comment]
        }, {
            validators: endTimeIsAfterStartTime,
            asyncValidators: this.validators.entryOfCurrentMonth
        });
        if (!addNewEntry) {
            this.formGroup.get('date')?.disable({onlySelf: true});
        }
    }
}
