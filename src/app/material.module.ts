import { NgModule } from '@angular/core';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio'

import {
  MatFormFieldModule,
	MatInputModule,
	MatRippleModule,
} from '@angular/material';

@NgModule({
  imports: [
		MatButtonModule,
		MatStepperModule,
		MatButtonModule,
    MatFormFieldModule,
		MatInputModule,
		MatRippleModule,
		CdkStepperModule,
		ReactiveFormsModule,
		MatRadioModule
  ],
  exports: [
		MatButtonModule,
		MatStepperModule,
		MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
		MatRippleModule,
		ReactiveFormsModule,
		CdkStepperModule,
		MatRadioModule
  ]
})
export class MaterialModule {}
