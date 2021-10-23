import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BibleResponse {
  text: string; // update with actual api response
}

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  constructor() { }

  getVerses(book: string, chapter: number, translationId: number, startVerse: number, endVerse?: number): Observable<BibleResponse> {
    return of({ text: 'In the beginning were cheetos' } as BibleResponse);
  }
}
