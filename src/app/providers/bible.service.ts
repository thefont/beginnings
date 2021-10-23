import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

export interface BibleResponse {
  text: string; // update with actual api response
}

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  constructor(private http: HttpClient) { }

  getVerses(book: string, chapter: number, translationId: number, startVerse: number, endVerse?: number): Observable<BibleResponse> {
    // return this.http.get('https://bible.api.whatever,').pipe(
    //   map(response => {
    //     // do any necessary mapping or model translation of the incoming data
    //     return {} as BibleResponse;
    //   })
    // );
    return of({ text: 'In the beginning were cheetos' } as BibleResponse);
  }
}
