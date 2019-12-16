import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerProfileComponent } from './job-seeker-profile.component';

describe('JobSeekerProfileComponent', () => {
  let component: JobSeekerProfileComponent;
  let fixture: ComponentFixture<JobSeekerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
