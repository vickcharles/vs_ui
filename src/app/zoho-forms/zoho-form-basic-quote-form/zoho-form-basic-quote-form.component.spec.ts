import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZohoFormBasicQuoteFormComponent } from './zoho-form-basic-quote-form.component';

describe('ZohoFormBasicQuoteFormComponent', () => {
  let component: ZohoFormBasicQuoteFormComponent;
  let fixture: ComponentFixture<ZohoFormBasicQuoteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZohoFormBasicQuoteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZohoFormBasicQuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
