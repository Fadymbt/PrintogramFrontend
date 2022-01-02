import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrintersDeleteComponent } from './view-printers-delete.component';

describe('ViewPrintersDeleteComponent', () => {
  let component: ViewPrintersDeleteComponent;
  let fixture: ComponentFixture<ViewPrintersDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrintersDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrintersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
