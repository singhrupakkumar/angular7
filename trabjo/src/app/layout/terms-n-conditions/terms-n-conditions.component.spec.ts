import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsNConditionsComponent } from './terms-n-conditions.component';

describe('TermsNConditionsComponent', () => {
  let component: TermsNConditionsComponent;
  let fixture: ComponentFixture<TermsNConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsNConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsNConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
