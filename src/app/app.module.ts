import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { SettingsComponent } from './settings/settings.component';
import { InviteComponent } from './invite/invite.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { BannerComponent } from './home/banner/banner.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AvatarComponent } from './avatar/avatar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideComponent } from './reader/slide/slide.component';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        AppComponent,
        BannerComponent,
        GroupsComponent,
        HomeComponent,
        IconsComponent,
        InviteComponent,
        LoginComponent,
        NavbarComponent,
        SettingsComponent,
        AvatarComponent,
        SlideComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CarouselModule.forRoot(),
        HttpClientModule,
        LottieModule.forRoot({ player: playerFactory }),
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
