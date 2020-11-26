import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogEntryModification, ModificationKind} from '../model/log-entry.modification';
import {LogEntry} from '../model/log-entry';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {endTimeIsAfterStartTime, workingDateNotAfter} from '../../shared/dialog-validators.directive';
import {getDefaultEndTime, getDefaultStartTime, getDuration, getTimeOfDay, TIME_FORMAT} from '../../shared/time-utils';
import {DialogEntry} from '../model/dialog-entry.model';
import {Store} from '@ngrx/store';
import {processDialogEntry} from '../state/log.actions';
import {selectLogEntryKeys} from '../state/log.selectors';
import {LogDateValidator} from './log-date.validator';

@Component({
    selector: 'app-create-log-entry',
    templateUrl:
        './log-entry-dialog.component.html',
    styleUrls: ['./log-entry-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogEntryDialogComponent implements OnInit {

    formGroup: FormGroup | undefined;

    action: ModificationKind;
    logEntry: LogEntry | undefined;

    logEntries$ = this.store.select(selectLogEntryKeys);

    constructor(
        public dialogRef: MatDialogRef<LogEntryDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) modification: LogEntryModification,
        private formBuilder: FormBuilder,
        private store: Store,
        private dateValidator: LogDateValidator
    ) {
        this.logEntry = modification.data;
        this.action = modification.kind;
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            date: [new Date(), [Validators.required, workingDateNotAfter(new Date())],
                this.dateValidator.validate.bind(this.dateValidator)],
            startTime: [getDefaultStartTime(), [Validators.required, Validators.pattern(TIME_FORMAT)]],
            endTime: [getDefaultEndTime(), [Validators.required, Validators.pattern(TIME_FORMAT)]],
            comment: ['']
        }, {
            validators: endTimeIsAfterStartTime
        });
    }

    doAction(): void {
        const date = this.formGroup?.get('date')?.value as Date;
        const comment = this.formGroup?.get('comment')?.value;
        const startTime = getTimeOfDay(this.formGroup?.get('startTime')?.value);
        const endTime = getTimeOfDay(this.formGroup?.get('endTime')?.value);
        const duration = getDuration(startTime, endTime);

        const dialogEntry: DialogEntry = {
            comment,
            date,
            endTime,
            startTime
        };

        this.store.dispatch(processDialogEntry(dialogEntry));

        this.dialogRef.close(undefined);
    }

    closeDialog(): void {
        this.dialogRef.close(undefined);
    }

}
