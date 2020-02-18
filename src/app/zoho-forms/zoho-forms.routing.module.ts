import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZohoFormBasicContactFormComponent } from './zoho-form-basic-contact-form/zoho-form-basic-contact-form.component'
import { ZohoFormBasicQuoteFormComponent } from './zoho-form-basic-quote-form/zoho-form-basic-quote-form.component'


const routes: Routes = [
  {
    path: 'contact-form',
    component: ZohoFormBasicContactFormComponent,
  },
  {
    path: 'basic-quote',
    component: ZohoFormBasicQuoteFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZohoFormsRoutingModule { }
