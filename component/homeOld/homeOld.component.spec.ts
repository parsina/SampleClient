import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOldComponent } from './homeOld.component';

describe('HomeOldComponent', () => {
  let component: HomeOldComponent;
  let fixture: ComponentFixture<HomeOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
