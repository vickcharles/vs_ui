import { NgModule } from '@angular/core';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio'
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

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
		MatRadioModule,
		MatTabsModule,
		MatMenuModule,
		MatToolbarModule
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
		MatRadioModule,
		MatTabsModule,
		MatMenuModule,
		MatToolbarModule
  ]
})
export class MaterialModule {}
