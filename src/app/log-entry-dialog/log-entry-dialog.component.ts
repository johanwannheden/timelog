import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogEntryModification, ModificationKind} from '../model/log-entry.modification';
import {LogEntry} from '../model/log-entry';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {endTimeIsAfterStartTime, workingDateNotAfter} from '../shared/dialog-validators.directive';
import {TIME_FORMAT} from '../shared/minute-of-day';

@Component({
    selector: 'app-create-log-entry',
    templateUrl: './log-entry-dialog.component.html',
    styleUrls: ['./log-entry-dialog.component.css']
})
export class LogEntryDialogComponent implements OnInit {

    formGroup: FormGroup | undefined;

    action: ModificationKind;
    logEntry: LogEntry | undefined;

    constructor(
        public dialogRef: MatDialogRef<LogEntryDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) modification: LogEntryModification,
        private formBuilder: FormBuilder
    ) {
        this.logEntry = modification.data;
        this.action = modification.kind;
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            date: [new Date(), [Validators.required, workingDateNotAfter(new Date())]],
            startTime: ['', [Validators.required, Validators.pattern(TIME_FORMAT)]],
            endTime: ['', [Validators.required, Validators.pattern(TIME_FORMAT)]],
        }, {
            validators: endTimeIsAfterStartTime
        });
    }

    doAction(): void {
        this.dialogRef.close({event: this.action, data: this.logEntry});
    }

    closeDialog(): void {
        this.dialogRef.close({event: 'Cancel'});
    }

}
