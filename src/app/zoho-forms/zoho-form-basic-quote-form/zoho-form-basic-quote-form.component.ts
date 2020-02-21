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
    console.log('datos del params', this.qParams);
    var form = {
      tipoDeServicio: null,
      especificamente: null,
      origen: null,  
      destino: null,
      cliente_tipo: null,
      cliente_tipoDocumento: null,
      usuario_ciudad: null,
      usuario_telefono: null,
      usuario_nombre: null,
      usuario_celular: null,
      usuario_apellido: null,
      usuario_correo: null,
    }

    this.formData = Object.assign(form, this.qParams)
    console.log('datos del form data', this.formData);

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
