import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProviderProfileComponent } from './job-provider-profile.component';

describe('JobProviderProfileComponent', () => {
  let component: JobProviderProfileComponent;
  let fixture: ComponentFixture<JobProviderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProviderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProviderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
