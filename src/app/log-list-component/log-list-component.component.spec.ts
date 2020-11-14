import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListComponentComponent } from './log-list-component.component';

describe('LogListComponentComponent', () => {
  let component: LogListComponentComponent;
  let fixture: ComponentFixture<LogListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
