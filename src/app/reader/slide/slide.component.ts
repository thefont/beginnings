import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BibleService, PassageResponse } from 'src/app/providers/bible.service';
import { SlideType } from '../../models/slide.enum';
import { shareReplay, switchMap } from 'rxjs/operators';
import { Step } from 'src/app/models/steps.model';
import { StepService } from 'src/app/providers/step.service';
import { Slide } from 'src/app/models/slide.model';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  step$: Observable<Step>;
  slide$: Observable<Slide>;
  passage$: Observable<PassageResponse>;
  SlideType = SlideType;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bibleService: BibleService,
    private readonly stepService: StepService) { }

  ngOnInit(): void {
    this.step$ = this.stepService.getStep(this.route.snapshot.params.stepNumber).pipe(
      shareReplay()
    );
    this.slide$ = this.stepService.getSlide(this.route.snapshot.params.slideNumber);
    this.passage$ = this.step$.pipe(
      switchMap(step => this.bibleService.getPassage(step.reference).pipe(shareReplay()))
    );
  }

    next(): void {
        console.log('next');
        // slideNumber++;
    }

    previous(): void {
        console.log('previous');
        // slideNumber--;
    }

    nextEnabled(): boolean {
        return true;
    }

    previousEnabled(): boolean {
        return false;
    }
}
