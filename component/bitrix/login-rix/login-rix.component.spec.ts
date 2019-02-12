import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRixComponent } from './login-rix.component';

describe('LoginRixComponent', () => {
  let component: LoginRixComponent;
  let fixture: ComponentFixture<LoginRixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
