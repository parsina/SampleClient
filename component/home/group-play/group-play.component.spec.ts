import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPlayComponent } from './group-play.component';

describe('GroupPlayComponent', () => {
  let component: GroupPlayComponent;
  let fixture: ComponentFixture<GroupPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
