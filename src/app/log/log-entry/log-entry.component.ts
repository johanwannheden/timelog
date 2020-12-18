import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogEntryModification, ModificationKind} from '../model/log-entry.modification';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {endTimeIsAfterStartTime, workingDateNotAfter} from '../../shared/dialog-validators.directive';
import {getDefaultEndTime, getDefaultStartTime, getTimeOfDay, TIME_FORMAT} from '../../shared/time-utils';
import {DialogEntry} from '../model/dialog-entry.model';
import {Store} from '@ngrx/store';
import {processDialogEntry} from '../state/log.actions';
import {LogDateValidator} from './log-date.validator';
import * as moment from 'moment';
import {Moment} from 'moment';
import {selectLogEntries, selectLogEntryById} from '../state/log.selectors';
import {take} from 'rxjs/operators';

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
                        this.initWithData({
                            date: moment(it.date),
                            startTime: it.startTime,
                            endTime: it.endTime,
                            comment: it.comment,
                        });
                    }
                });
        } else {
            this.initWithData({
                date: moment(),
                startTime: getDefaultStartTime(),
                endTime: getDefaultEndTime(),
                comment: ''
            });
        }
    }

    doAction(): void {
        const date = this.formGroup?.get('date')?.value as Moment;
        const comment = this.formGroup?.get('comment')?.value;
        const startTime = getTimeOfDay(this.formGroup?.get('startTime')?.value);
        const endTime = getTimeOfDay(this.formGroup?.get('endTime')?.value);

        const dialogEntry: DialogEntry = {
            comment,
            date,
            startTime,
            endTime,
            action: this.action
        };

        this.store.dispatch(processDialogEntry(dialogEntry));

        // TODO should not close dialog itself, should not concern with dialog
        //  use @Output instead?
        this.dialogRef.close(undefined);
    }

    closeDialog(): void {
        this.dialogRef.close(undefined);
    }

    private initWithData(data: {
        date: Moment,
        startTime?: string,
        endTime?: string,
        comment?: string
    }): void {
        const addNewEntry = this.action === ModificationKind.Add;
        this.formGroup = this.formBuilder.group({
            date: [data.date, [Validators.required, workingDateNotAfter(moment())],
                addNewEntry && this.dateValidator.validate.bind(this.dateValidator)],
            startTime: [data.startTime, [Validators.required, Validators.pattern(TIME_FORMAT)]],
            endTime: [data.endTime, [Validators.required, Validators.pattern(TIME_FORMAT)]],
            comment: [data.comment]
        }, {
            validators: endTimeIsAfterStartTime
        });
        if (!addNewEntry) {
            this.formGroup.get('date')?.disable({onlySelf: true});
        }
    }
}

