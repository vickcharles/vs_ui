import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 // Material Module
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/HomePage/header/header.component';
import { HomepageComponent } from './components/HomePage/homepage/homepage.component';
import { BannerComponent } from './components/HomePage/banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/HomePage/content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    BannerComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
