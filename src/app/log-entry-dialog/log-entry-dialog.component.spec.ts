import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEntryDialogComponent } from './log-entry-dialog.component';

describe('CreateLogEntryComponent', () => {
  let component: LogEntryDialogComponent;
  let fixture: ComponentFixture<LogEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
