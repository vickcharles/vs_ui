import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../app/components/homepage/homepage/homepage.component';
import { RequestComponent } from '../app/components/request/request.component';
import { LoginComponent } from './components/login/login.component';

const APP_MODULE: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'solicitar-servicio',
    component: RequestComponent
  },
  {
    path: 'acceder',
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_MODULE);

