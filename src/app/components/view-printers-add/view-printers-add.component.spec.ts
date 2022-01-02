import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrintersAddComponent } from './view-printers-add.component';

describe('ViewPrintersAddComponent', () => {
  let component: ViewPrintersAddComponent;
  let fixture: ComponentFixture<ViewPrintersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrintersAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrintersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
