import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersDeleteComponent } from './view-users-delete.component';

describe('ViewUsersDeleteComponent', () => {
  let component: ViewUsersDeleteComponent;
  let fixture: ComponentFixture<ViewUsersDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUsersDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
