import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tab } from '../models/tab.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() selectTab = new EventEmitter<Tab>();
  Tab = Tab;

  constructor() { }

  ngOnInit(): void {
  }

}
