import { NgModule } from '@angular/core';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio'
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle'

import {
  	MatFormFieldModule,
	MatInputModule,
	MatRippleModule,
	MatSelectModule,
	MatDatepickerModule
} from '@angular/material';

@NgModule({
  imports: [
		MatButtonModule,
		MatSelectModule,
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
		MatIconModule,
		MatSidenavModule,
		MatTableModule,
		MatListModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		MatButtonToggleModule,
		MatDatepickerModule
  ],
  exports: [
		MatButtonModule,
		MatSelectModule,
		MatStepperModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSnackBarModule,
    MatInputModule,
		MatRippleModule,
		MatTableModule,
		ReactiveFormsModule,
		MatSidenavModule,
		CdkStepperModule,
		MatRadioModule,
		MatCheckboxModule,
		MatTabsModule,
		MatMenuModule,
		MatIconModule,
		MatCardModule,
		MatListModule,
		MatDialogModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
		MatButtonToggleModule,
  ]
})

export class MaterialModule {}
