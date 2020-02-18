import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-zoho-form-basic-quote-form',
  templateUrl: './zoho-form-basic-quote-form.component.html',
  styleUrls: ['./zoho-form-basic-quote-form.component.sass']
})
export class ZohoFormBasicQuoteFormComponent implements OnInit {

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
      econtainerProduct: null,
      companyName: null
    }

    this.formData = Object.assign(form, this.qParams)

  }

  ngAfterViewInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../../assets/js/zoho-forms/basic-quote-form/basic-quote-form.js";
    this.elementRef.nativeElement.appendChild(s);

    if(this.qParams.submitNow){
      this.submitForm()
    }
  }


  submitForm(){
    this.form.nativeElement.submit();
  }

}
