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

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { MomentModule } from 'angular2-moment';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {}};

//FIREBASE SETTINGS
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Pipes
import { FistChartPipe } from './pipes/first-chart.pipe';
import { FistChartUppercasePipe } from './pipes/fisrt-chart-uppercase.pipe';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { FormsModule } from "@angular/forms";

// Componentes
import { AppComponent } from './app.component';

import { HeaderComponent }  from './components/homepage/header/header.component';
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
import { ProfileComponent } from './components/profile/profile.component';

import { ChatComponent } from './components/chat/chat.component';

//admin
import { AdminRequestListComponent } from './admin/components/request/request-list/request-list.component';

import { AdminRequestCardComponent } from './admin/components/request/request-card/request-card.component';

import { AdminRequestViewComponent } from './admin/components/request/request-view/request-view.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

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
    FistChartPipe,
    FistChartUppercasePipe,
    RequestCardComponent,
    RequestListComponent,
    RequestsComponent,
    ProfileComponent,
    ChatComponent,
    AdminRequestListComponent,
    AdminRequestCardComponent,
    AdminRequestViewComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AvatarModule,
    AngularSvgIconModule,
    CommonModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    APP_ROUTING,
    FormsModule,
    MomentModule
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
