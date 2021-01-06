import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogEntryModification, ModificationKind} from '../model/log-entry.modification';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {endTimeIsAfterStartTime, workingDateNotAfter} from '../../shared/dialog-validators.directive';
import {getDefaultEndTime, getDefaultStartTime, parseTimeOfDay, momentToId, TIME_FORMAT} from '../../shared/time-utils';
import {Store} from '@ngrx/store';
import {LogDateValidator} from './log-date.validator';
import * as moment from 'moment';
import {selectLogEntries, selectLogEntryById} from '../state/log.selectors';
import {take} from 'rxjs/operators';
import {LogEntry} from '../state/log.entry';
import {triggerLogEntryCreation, triggerLogEntryUpdate} from '../state/log.actions';

@Component({
    selector: 'app-create-log-entry',
    templateUrl:
        './log-entry.component.html',
    styleUrls: ['./log-entry.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogEntryComponent implements OnInit {

    formGroup: FormGroup | undefined;

    logEntries$ = this.store.select(selectLogEntries);
    readonly action: ModificationKind;
    private readonly entryKey: string | undefined;

    private logEntry?: LogEntry;

    constructor(
        public dialogRef: MatDialogRef<LogEntryComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) modification: LogEntryModification,
        private formBuilder: FormBuilder,
        private store: Store,
        private dateValidator: LogDateValidator
    ) {
        this.entryKey = modification.data;
        this.action = modification.kind;
    }

    ngOnInit(): void {
        if (this.entryKey) {
            this.store.select(selectLogEntryById(this.entryKey))
                .pipe(take(1))
                .subscribe(it => {
                        if (it) {
                            this.logEntry = it;
                            this.initWithData(it);
                        }
                    },
                    error => console.log('Error: ' + error));
        } else {
            this.initWithData();
        }
    }

    private initWithData(data?: LogEntry): void {
        const addNewEntry = !data;
        const date = moment(data?.date);
        const startTime = data?.startTime ? parseTimeOfDay(data.startTime).formatted() : getDefaultStartTime();
        const endTime = data?.endTime ? parseTimeOfDay(data.endTime).formatted() : getDefaultEndTime();
        const comment = data?.comment;

        this.formGroup = this.formBuilder.group({
            date: [date, [Validators.required, workingDateNotAfter(moment())],
                addNewEntry && this.dateValidator.validate.bind(this.dateValidator)],
            startTime: [startTime, [Validators.required, Validators.pattern(TIME_FORMAT)]],
            endTime: [endTime, [Validators.required, Validators.pattern(TIME_FORMAT)]],
            comment: [comment]
        }, {
            validators: endTimeIsAfterStartTime
        });
        if (!addNewEntry) {
            this.formGroup.get('date')?.disable({onlySelf: true});
        }
    }

    doAction(): void {
        const createNewLogEntry = this.action === ModificationKind.Add;

        this.logEntry = {
            id: this.logEntry?.id,
            date: momentToId(this.formGroup?.get('date')?.value),
            comment: this.formGroup?.get('comment')?.value,
            startTime: parseTimeOfDay(this.formGroup?.get('startTime')?.value).formatted(),
            endTime: parseTimeOfDay(this.formGroup?.get('endTime')?.value).formatted(),
            dateAdded: this.logEntry?.dateAdded ?? moment().format('YYYY-MM-DDTHH:mm:ss'),
            dateUpdated: moment().format('YYYY-MM-DDTHH:mm:ss'),
        };

        if (createNewLogEntry) {
            this.store.dispatch(triggerLogEntryCreation(this.logEntry));
        } else {
            this.store.dispatch(triggerLogEntryUpdate(this.logEntry));
        }

        // TODO should not close dialog itself, should not concern with dialog
        //  use @Output instead?
        this.dialogRef.close(undefined);
    }

    closeDialog(): void {
        this.dialogRef.close(undefined);
    }
}

