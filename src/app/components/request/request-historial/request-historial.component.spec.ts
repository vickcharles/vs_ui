import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHistorialComponent } from './request-historial.component';

describe('RequestHistorialComponent', () => {
  let component: RequestHistorialComponent;
  let fixture: ComponentFixture<RequestHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
