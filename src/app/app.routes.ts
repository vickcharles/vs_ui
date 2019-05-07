import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../app/components/homepage/homepage/homepage.component';

const APP_MODULE: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_MODULE);

