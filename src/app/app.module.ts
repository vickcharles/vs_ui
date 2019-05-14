import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTING } from './app.routes';

// Material Module
import { MaterialModule } from './material.module';

//HTTTP

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Componentes
import { AppRoutingModule } from './app-routing.module';
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
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
