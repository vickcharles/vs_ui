import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTING } from './app.routes';

// Material Module
import { MaterialModule } from './material.module';

import { AuthInterceptor } from './auth/auth.interceptor';

//HTTTP
import { UserService } from './service/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Pipes
import { FistChartPipe } from './pipes/first-chart.pipe';
import { FistChartUppercasePipe } from './pipes/fisrt-chart-uppercase.pipe';

import { AngularSvgIconModule } from 'angular-svg-icon';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/homepage/header/header.component';
import { HomepageComponent } from './components/homepage/homepage/homepage.component';
import { BannerComponent } from './components/homepage/banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/homepage/content/content.component';
import { FooterComponent } from './components/homepage/footer/footer.component';
import { RequestComponent } from './components/request/request.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PagesComponent } from './components/homepage/pages.component';


import { DashboardComponent } from './components/dashboard/dashboard.component';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { RequestViewComponent } from './components/request/request-view/request-view.component';
import { RequestCardComponent } from './components/request/request-card/request-card.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestsComponent } from './components/request/requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    RequestComponent,
    LoginComponent,
    DashboardComponent,
    PagesComponent,
    RequestViewComponent,
    //Pipes
    FistChartPipe,
    FistChartUppercasePipe,
    RequestCardComponent,
    RequestListComponent,
    RequestsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AvatarModule,
    AngularSvgIconModule,
    CommonModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
