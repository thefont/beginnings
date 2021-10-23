import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from './models/tab.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beginnings';
  currentTab = Tab.Home;

  constructor(private router: Router) {}

  // onSelectTab(tab: Tab) {
  //   switch(tab) {
  //     case Tab.Home:
  //       this.router.navigate(['']);
  //       break;
  //     case Tab.Invite:
  //       this.router.navigate(['invite']);
  //       break;
  //     case Tab.Settings:
  //       this.router.navigate(['settings']);
  //       break;
  //   }
  // }
}
