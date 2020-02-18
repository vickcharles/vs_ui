import { NgModule, Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ZohoFormsRoutingModule } from './zoho-forms.routing.module';

import { ZohoFormBasicContactFormComponent } from './zoho-form-basic-contact-form/zoho-form-basic-contact-form.component';
import { ZohoFormBasicQuoteFormComponent } from './zoho-form-basic-quote-form/zoho-form-basic-quote-form.component';

@NgModule({
    declarations: [
      ZohoFormBasicContactFormComponent,
      ZohoFormBasicQuoteFormComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      ZohoFormsRoutingModule,
      // FormsModule,
      // ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [
      ZohoFormBasicContactFormComponent,
      ZohoFormBasicQuoteFormComponent
    ],
    exports: [
      ZohoFormBasicContactFormComponent, 
      ZohoFormBasicQuoteFormComponent
    ],
})
export class ZohoFormsModule { }