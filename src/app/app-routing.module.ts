import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { InviteComponent } from './invite/invite.component';
import { SettingsComponent } from './settings/settings.component';
import {GroupsComponent} from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import { SlideComponent } from './reader/slide/slide.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'invite',
        component: InviteComponent
    },
    {
        path: 'groups',
        component: GroupsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'reader',
        children: [
            {
                path: ':stepNumber/:slideNumber',
                component: SlideComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
