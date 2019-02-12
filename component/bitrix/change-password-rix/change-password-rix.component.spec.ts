import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordRixComponent } from './change-password-rix.component';

describe('ChangePasswordRixComponent', () => {
  let component: ChangePasswordRixComponent;
  let fixture: ComponentFixture<ChangePasswordRixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordRixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordRixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
