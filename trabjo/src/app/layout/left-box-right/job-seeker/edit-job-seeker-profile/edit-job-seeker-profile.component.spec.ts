import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobSeekerProfileComponent } from './edit-job-seeker-profile.component';

describe('EditJobSeekerProfileComponent', () => {
  let component: EditJobSeekerProfileComponent;
  let fixture: ComponentFixture<EditJobSeekerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobSeekerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobSeekerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
