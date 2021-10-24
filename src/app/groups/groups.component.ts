import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { GroupService } from '../providers/group.service';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    messages$ = this.groupService.getMessages$;

    inputControl = new FormControl('');

    constructor(private groupService: GroupService, private authService: AuthService) {
        this.authService.user$.next(this.authService.user2);
        // this.groupService.getMessages$.subscribe(x => console.log('messages', x));
    }

    ngOnInit(): void {

    }

    send() {
        console.log('send:', this.inputControl.value);
        this.groupService.sendMessage(this.inputControl.value);
    }
}
