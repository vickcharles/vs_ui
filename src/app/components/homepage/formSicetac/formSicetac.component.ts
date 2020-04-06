import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-formSicetac',
  templateUrl: './formSicetac.component.html',
  styleUrls: ['./formSicetac.component.css']
})
export class FormSicetacComponent implements OnInit {
  vehicleConfiguration = [
    {value: '', name: 'Camión dos ejes - sencillo'},
    {value: '', name: 'Tracto camión dos ejes - patineta - minimula con semirremolque de dos ejes'},
    {value: '', name: 'Tracto camión dos ejes - patineta - minimula con semirremolque de tres ejes'},
    {value: '', name: 'Camión tres ejes - doble troque'},
    {value: '', name: 'Tracto camión tres ejes - tractomula con semirremolque de dos ejes'},
    {value: '', name: 'Tracto camión tres ejes - tractomula con semirremolque de tres ejes'}
  ]

  typeOfLoad = [
    {value: '', name: 'General'},
    {value: '', name: 'Contenedor'},
    {value: '', name: 'Carga refrigerada'},
    {value: '', name: 'Granel sólido'},
  ]

  driveType = [
    {value: '', name: 'Estacas'},
    {value: '', name: 'Furgón'},
    {value: '', name: 'Trayler'},
    {value: '', name: 'Termoking'},
  ]

  constructor() { }

  ngOnInit() {
  }
}
