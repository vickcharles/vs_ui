import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routes
import { APP_ROUTING } from './app.routes';

// Material Module
import { MaterialModule } from './material.module';

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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
