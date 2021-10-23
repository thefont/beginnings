import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { InviteComponent } from './invite/invite.component';
import { SettingsComponent } from './settings/settings.component';
import {GroupsComponent} from './groups/groups.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
