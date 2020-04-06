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
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: 'https://vs-rest-api.herokuapp.com', options: {}};

//FIREBASE SETTINGS
import { AngularFireModule } from '@angular/fire';
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
import { HeaderComponent } from './components/homepage/header/header.component';
import { HomepageComponent } from './components/homepage/homepage/homepage.component';
import { BannerComponent } from './components/homepage/banner/banner.component';
import { FormSicetacComponent } from './components/homepage/formSicetac/formSicetac.component';
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
import { RequestHistorialComponent } from './components/request/request-historial/request-historial.component';
import { TrabajaConNosotrosComponent } from './components/trabaja-con-nosotros/trabaja-con-nosotros.component';
import { AutorizacionComponent } from './components/homepage/autorizacion/autorizacion.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//cancelacion de request
import { RechazoModalComponent } from './admin/components/request/request-modals/rechazo-modal/rechazo-modal.component';
import { PerdidaOportunidadModalComponent } from './admin/components/request/request-modals/perdida-oportunidad.modal/perdida-oportunidad-modal.component';
import { NoAceptadoModalComponent } from './admin/components/request/request-modals/no-aceptado-modal/no-aceptado-modal.component';

import { NgxSoapModule } from 'ngx-soap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    BannerComponent,
    FormSicetacComponent,
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
    NotificationsComponent,
    RequestHistorialComponent,
    TrabajaConNosotrosComponent,
    AutorizacionComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RechazoModalComponent,
    PerdidaOportunidadModalComponent,
    NoAceptadoModalComponent
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
    MyDatePickerModule,
    MomentModule,
    NgbModule,
    NgxSoapModule
  ],
  entryComponents: [
    RechazoModalComponent,
    PerdidaOportunidadModalComponent,
    NoAceptadoModalComponent
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
