import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {BibleService, PassageResponse} from 'src/app/providers/bible.service';
import {SlideType} from '../../models/slide.enum';
import {map, shareReplay, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Step} from 'src/app/models/steps.model';
import {StepService} from 'src/app/providers/step.service';
import {Slide} from 'src/app/models/slide.model';
import {StorageService} from '../../providers/storage.service';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit, OnDestroy {
    step$: Observable<Step>;
    slide$: Observable<Slide>;
    passage$: Observable<PassageResponse>;
    SlideType = SlideType;
    slideNumber$: Observable<number>;
    stepNumber$: Observable<number>;
    destroy$ = new Subject();

    slideNumber: number;
    stepNumber: number;
    lastSlide = 7;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly bibleService: BibleService,
        private readonly stepService: StepService,
        private readonly storageService: StorageService) {
    }

    ngOnInit(): void {
        this.slideNumber$ = this.route.params.pipe(map(x => x.slideNumber));
        this.stepNumber$ = this.route.params.pipe(map(x => x.stepNumber));
        this.step$ = this.stepNumber$.pipe(
            switchMap(step => this.stepService.getStep(step).pipe(shareReplay()))
        );
        this.slide$ = this.slideNumber$.pipe(
            switchMap(slide => this.stepService.getSlide(slide))
        );
        this.passage$ = this.step$.pipe(
            switchMap(step => this.bibleService.getPassage(step.reference).pipe(shareReplay()))
        );

        this.slideNumber$.pipe(takeUntil(this.destroy$)).subscribe(x => this.setSlide(+x));
        this.stepNumber$.pipe(takeUntil(this.destroy$)).subscribe(x => this.stepNumber = +x);
    }

    setSlide(slideNum: number): void {
        if (slideNum === this.lastSlide) {
            this.storageService.write<boolean>(`completedStep:${this.stepNumber}`, true);
            this.storageService.write<number>(`lastStep`, this.stepNumber);
        }
        this.slideNumber = slideNum;
    }

    next(): void {
        const slideNumber = this.slideNumber + 1;
        this.router.navigateByUrl(`/reader/${this.stepNumber}/${slideNumber}`);
    }

    previous(): void {
        const slideNumber = this.slideNumber - 1;
        this.router.navigateByUrl(`/reader/${this.stepNumber}/${slideNumber}`);
    }

    nextEnabled(): boolean {
        return this.route.snapshot.params.slideNumber < this.lastSlide;
    }

    previousEnabled(): boolean {
        return this.route.snapshot.params.slideNumber > 1;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
