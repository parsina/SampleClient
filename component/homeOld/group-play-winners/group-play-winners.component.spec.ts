import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPlayWinnersComponent } from './group-play-winners.component';

describe('GroupPlayWinnersComponent', () => {
  let component: GroupPlayWinnersComponent;
  let fixture: ComponentFixture<GroupPlayWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPlayWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPlayWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
