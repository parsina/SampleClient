import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRixComponent } from './register-rix.component';

describe('RegisterRixComponent', () => {
  let component: RegisterRixComponent;
  let fixture: ComponentFixture<RegisterRixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
