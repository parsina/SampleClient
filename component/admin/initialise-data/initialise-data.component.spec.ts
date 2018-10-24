import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialiseDataComponent } from './initialise-data.component';

describe('InitialiseDataComponent', () => {
  let component: InitialiseDataComponent;
  let fixture: ComponentFixture<InitialiseDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialiseDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialiseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
