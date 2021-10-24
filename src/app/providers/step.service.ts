import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Slide } from '../models/slide.model';
import { Step } from '../models/steps.model';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  constructor(private http: HttpClient) { }

  stepDataUrl = 'assets/steps.data.json';
  slidesDataUrl = 'assets/slides.data.json';

  getAllSteps(): Observable<Step[]> {
    return this.http.get<Step[]>(this.stepDataUrl).pipe(
      map(response => {
        return response["steps"] as Step[];
      })
    );
  }

  getStep(stepId: number): Observable<Step> {
    return this.http.get<Step>(this.stepDataUrl).pipe(
      map(response => {
        const steps: Step[] = response["steps"];
        return steps.find(value => value.id == stepId);
      })
    );
  }

  getSlide(slideId: number): Observable<Slide> {
    return this.http.get<Slide>(this.slidesDataUrl).pipe(
      map(response => {
        const slides: Slide[] = response["slides"];
        return slides.find(value => value.id == slideId);
      })
    );
  }
}
