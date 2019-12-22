import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,Component,VERSION} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import{ ReactiveFormsModule }  from '@angular/forms';
import {   HttpClientModule} from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import {StorageServiceModule}  from  'angular-webstorage-service';
 
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ViewComponent,
    IndexComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
