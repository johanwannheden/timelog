import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogEntryComponent} from './log-entry.component';

describe('CreateLogEntryComponent', () => {
    let component: LogEntryComponent;
    let fixture: ComponentFixture<LogEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogEntryComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
