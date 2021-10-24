import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user1 = {
        id: 1,
        first: 'Steve',
        last: 'Rodgers',
        profileImg: 'assets/images/kayla.png'
    } as User;

    user2 = {
        id: 2,
        first: 'Bruce',
        last: 'Wayne',
        profileImg: 'assets/images/mentee.jpeg'
    } as User;

    user$ = new BehaviorSubject<User>(null);

    login(email: string) {
        if (email === this.user1.email) {
            this.user$.next(this.user1);
        } else if (email === this.user2.email) {
            this.user$.next(this.user2);
        }
    }
}
