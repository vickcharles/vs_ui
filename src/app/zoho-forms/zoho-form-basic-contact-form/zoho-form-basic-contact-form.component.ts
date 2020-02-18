import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-zoho-form-basic-contact-form',
  templateUrl: './zoho-form-basic-contact-form.component.html',
  styleUrls: ['./zoho-form-basic-contact-form.component.sass']
})
export class ZohoFormBasicContactFormComponent implements OnInit {

  public formData: any;
  public qParams: any;
  @ViewChild('f', null) form: ElementRef;

  constructor(
    private elementRef:ElementRef,
    private route : ActivatedRoute
    ) { }

  ngOnInit() {

    this.qParams = this.route.snapshot.queryParams;

    var form = {
      firstName: null,
      lastName: null,
      mobile: null,  
      email: null,
      product: null,
      company: null,
      idType: null,
      idNumber: null
    }

    this.formData = Object.assign(form, this.qParams)

  }

  ngAfterViewInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "/assets/js/zoho-forms/basic-contact-form/basic-contact-form1.js";
    this.elementRef.nativeElement.appendChild(s);

    if(this.qParams.submitNow){
      this.submitForm()
    }
  }

  submitForm(){
    this.form.nativeElement.submit();
  }


}
