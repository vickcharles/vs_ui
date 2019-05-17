import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomepageComponent } from '../app/components/homepage/homepage/homepage.component';
import { RequestComponent } from '../app/components/request/request.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/homepage/pages.component';
// import { AuthGuard } from './auth/auth.guard';

const APP_MODULE: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
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
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_MODULE);

