import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { GroupService } from '../providers/group.service';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent {
    messages$ = this.groupService.getMessages$;

    inputControl = new FormControl('');

    constructor(private groupService: GroupService, private authService: AuthService, private cdr: ChangeDetectorRef) {
        this.authService.user$.next(this.authService.user2);
    }

    send() {
        this.groupService.sendMessage(this.inputControl.value);
        this.inputControl.patchValue('');
        this.cdr.detectChanges();
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.send();
        }
    }
}
