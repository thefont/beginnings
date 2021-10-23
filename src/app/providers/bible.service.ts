import { HttpClient, HttpParams } from '@angular/common/http';
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

    toParams(obj: any): HttpParams {
        let params = new HttpParams();
        Object.keys(obj).forEach((key) => {
            if (obj[key] == null) {
                return;
            }

            if (obj[key] instanceof Array) {
                obj[key].forEach((array) => {
                    params = params.append(key, array);
                });
            } else {
                params = params.set(key, obj[key].toString());
            }
        });
        return params;
    }

    getVerses(book: string, chapter: number, translationId: number, startVerse: number, endVerse?: number): Observable<BibleResponse> {
        // const params = this.toParams({
        //     foo: 'bar',
        //     bin: [1,2,3]
        // });
        // return this.http.get('https://bible.api.whatever,').pipe(
        // map(response => {
        //     // do any necessary mapping or model translation of the incoming data
        //     return {} as BibleResponse;
        // })
        // );
        return of({ text: 'In the beginning were cheetos' } as BibleResponse);
    }

}
