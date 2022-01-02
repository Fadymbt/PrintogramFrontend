import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrintersInfoComponent } from './view-printers-info.component';

describe('ViewPrintersInfoComponent', () => {
  let component: ViewPrintersInfoComponent;
  let fixture: ComponentFixture<ViewPrintersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrintersInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrintersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
