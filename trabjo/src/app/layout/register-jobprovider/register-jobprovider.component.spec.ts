import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterJobproviderComponent } from './register-jobprovider.component';

describe('RegisterJobproviderComponent', () => {
  let component: RegisterJobproviderComponent;
  let fixture: ComponentFixture<RegisterJobproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterJobproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterJobproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
