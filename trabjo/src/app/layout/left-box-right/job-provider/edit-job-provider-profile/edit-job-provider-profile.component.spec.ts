import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobProviderProfileComponent } from './edit-job-provider-profile.component';

describe('EditJobProviderProfileComponent', () => {
  let component: EditJobProviderProfileComponent;
  let fixture: ComponentFixture<EditJobProviderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobProviderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobProviderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
