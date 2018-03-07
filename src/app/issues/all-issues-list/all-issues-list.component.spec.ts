import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIssuesListComponent } from './all-issues-list.component';

describe('AllIssuesListComponent', () => {
  let component: AllIssuesListComponent;
  let fixture: ComponentFixture<AllIssuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIssuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIssuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
