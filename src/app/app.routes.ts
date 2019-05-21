import { RouterModule, Routes, CanActivate } from '@angular/router';

import { HomepageComponent } from '../app/components/homepage/homepage/homepage.component';
import { RequestComponent } from '../app/components/request/request.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './components/homepage/pages.component';
// import { RequestsComponent } from './components/request/requests/requests.component'

import { RequestListComponent } from './components/request/request-list/request-list.component'

import { RequestViewComponent } from './components/request/request-view/request-view.component';
import { AuthGuard } from './auth/auth.guard';

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
      { path: '', redirectTo: 'home' , pathMatch: 'full' },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RequestListComponent
      },
      {
        path: 'request/:id',
        component: RequestViewComponent
      }
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_MODULE);

