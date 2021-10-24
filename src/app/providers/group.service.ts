import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { delay, filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    user1Messages = [
        {
            user: this.authService.user1,
            message: `I can totally relate to that. I'm going to walk with you through a series of steps designed to introduce you to who God is, how much he loves you, and some of His promises to you.`,
            timestamp: 7,
            isLocal: false
        },
        {
            user: this.authService.user1,
            message: `After you complete each step, I'll check in with you (if you haven't reached out already!) to answer any questions you might have. `,
            timestamp: 8,
            isLocal: false
        },
    ] as Message[];

    messages$ = new BehaviorSubject<Message[]>([
        {
            user: this.authService.user1,
            message: `Hi! Are you ready to begin your journey through the bible?`,
            timestamp: 1,
            isLocal: false
        },
        {
            user: this.authService.user2,
            message: 'Hello! Yes, thanks for reaching out!',
            timestamp: 2,
            isLocal: true
        },
        {
            user: this.authService.user2,
            message: `I've been ingruiged about the bible for a long time.`,
            timestamp: 3,
            isLocal: true
        },
        {
            user: this.authService.user1,
            message: 'What has kept you from starting?',
            timestamp: 4,
            isLocal: false
        },
        {
            user: this.authService.user2,
            message: `Every time I opened the bible, there was always something strange going on that didn't seem relevant.`,
            timestamp: 5,
            isLocal: true
        },
        {
            user: this.authService.user2,
            message: `Last time, I came across a story about reanimated corpses. On Halloween.`,
            timestamp: 6,
            isLocal: true
        },

    ]);
    getMessages$ = this.messages$.pipe(shareReplay());

    constructor(private authService: AuthService) {
        const user1x$ = this.authService.user$.pipe(
            filter(user => !!user),
            take(1)
        );
        const newMsg$ = this.getMessages$.pipe(
            filter(msgs => !!msgs.length),
            map(msgs => msgs[msgs.length - 1]),
        );
        const autoRespondUser1$ = newMsg$.pipe(
            filter(msg => msg.user.id === this.authService.user2.id),
            delay(2000),
            tap((_) => this.sendNextUser1Msg()),
        );

        user1x$.pipe(
            tap(_ => {
                this.sendNextUser1Msg();
            }),
            switchMap(_ => autoRespondUser1$)
        ).subscribe();
    }

    sendNextUser1Msg() {
        const nextMsg = this.user1Messages.shift();
        if (nextMsg) {
            this.messages$.next([...this.messages$.value, nextMsg]);
        }
    }

    sendMessage(text: string) {
        console.log('sendMessage fired', text);
        this.messages$.next([...this.messages$.value, {
            user: this.authService.user$.value,
            message: text,
            isLocal: true
        } as Message]);
    }
}
