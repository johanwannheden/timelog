import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLogEntryComponent } from './create-log-entry.component';

describe('CreateLogEntryComponent', () => {
  let component: CreateLogEntryComponent;
  let fixture: ComponentFixture<CreateLogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLogEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
