import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselComponent} from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { SettingsComponent } from './settings/settings.component';
import { InviteComponent } from './invite/invite.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import {BannerComponent} from './home/banner/banner.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    NavbarComponent,
    HomeComponent,
    IconsComponent,
    SettingsComponent,
    InviteComponent,
    LoginComponent,
    InviteComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
