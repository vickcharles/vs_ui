import { NgModule } from '@angular/core';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';

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
		ReactiveFormsModule
  ],
  exports: [
		MatButtonModule,
		MatStepperModule,
		MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
		MatRippleModule,
		ReactiveFormsModule,
		CdkStepperModule
  ]
})
export class MaterialModule {}
