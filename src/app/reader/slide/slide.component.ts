import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {BibleService, PassageResponse} from 'src/app/providers/bible.service';
import {SlideType} from '../../models/slide.enum';
import {map, shareReplay} from 'rxjs/operators';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
    passage$: Observable<PassageResponse>;
    SlideType = SlideType;

    constructor(private readonly route: ActivatedRoute, private readonly bibleService: BibleService) {
    }

    ngOnInit(): void {
        this.passage$ = this.bibleService.getPassage('MAT.1.15-MAT.1.18', false).pipe(shareReplay());
        console.log(this.route.snapshot.params.stepNumber); //todo get the step
        console.log(this.route.snapshot.params.slideNumber); //todo get the slide
    }

    getStepTitle(): string {
        return this.route.snapshot.params.stepNumber + ': ' + 'Creation to Christ'; // todo do better
    }

    getSlideTitle(): string {
        return this.route.snapshot.params.slideNumber + ': ' + 'Retell'; // todo do better
     }

    getSlideType(): SlideType {
        return SlideType.Question;
    }


}
