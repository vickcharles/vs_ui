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
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

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
		MatToolbarModule,
		MatCardModule,
		MatListModule
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
		MatCardModule,
		MatListModule,
		MatToolbarModule
  ]
})
export class MaterialModule {}
