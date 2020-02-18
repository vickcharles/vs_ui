import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZohoFormBasicContactFormComponent } from './zoho-form-basic-contact-form.component';

describe('ZohoFormBasicContactFormComponent', () => {
  let component: ZohoFormBasicContactFormComponent;
  let fixture: ComponentFixture<ZohoFormBasicContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZohoFormBasicContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZohoFormBasicContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
