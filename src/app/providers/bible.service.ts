import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

export interface PassageResponse {
  bibleId: string;
  bookId: string;
  chapterIds: Array<string>;
  reference: string;
  content: string;
  verseCount: number;
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

  getPassage(passageId: string, inclChapterNumbers: boolean = false, inclVerseNumbers: boolean = true, inclVerseSpans: boolean = true): Observable<PassageResponse> {
    const params = this.toParams({
      'content-type': 'html',
      'include-notes': false,
      'include-titles': false,
      'include-chapter-numbers': inclChapterNumbers,
      'include-verse-numbers': inclVerseNumbers,
      'include-verse-spans': inclVerseSpans
    });

    return this.http.get(`https://api.scripture.api.bible/v1/bibles/${environment.defaultBibleId}/passages/${passageId}`,
      {
        params: params,
        headers: new HttpHeaders({
          Accept: 'application/json',
          'api-key': environment.bibleApiToken
        })
      }
    ).pipe(
      map(response => {
        console.log(response["data"])
        return response["data"] as PassageResponse;
      })
    );
  }

}
