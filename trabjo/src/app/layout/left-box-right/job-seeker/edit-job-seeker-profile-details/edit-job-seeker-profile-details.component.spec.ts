import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobSeekerProfileDetailsComponent } from './edit-job-seeker-profile-details.component';

describe('EditJobSeekerProfileDetailsComponent', () => {
  let component: EditJobSeekerProfileDetailsComponent;
  let fixture: ComponentFixture<EditJobSeekerProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobSeekerProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobSeekerProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
