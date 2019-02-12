import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPlayHistoryComponent } from './group-play-history.component';

describe('GroupPlayHistoryComponent', () => {
  let component: GroupPlayHistoryComponent;
  let fixture: ComponentFixture<GroupPlayHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPlayHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPlayHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
