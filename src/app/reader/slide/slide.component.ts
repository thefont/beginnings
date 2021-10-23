import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import { BibleService, PassageResponse } from 'src/app/providers/bible.service';
import {SlideType} from '../../models/slide.enum';
import {map, shareReplay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  passage$: Observable<PassageResponse>;
  title$: Observable<string>;
  SlideType = SlideType;

  constructor(private readonly route: ActivatedRoute, private readonly bibleService: BibleService) {
  }

  ngOnInit(): void {
    this.passage$ = this.bibleService.getPassage('MAT.1.15-MAT.1.18', false).pipe(shareReplay());
    this.title$ = this.passage$.pipe(map(x => this.route.snapshot.params.stepNumber + ': ' + 'Creation to Christ')); //todo do better
    console.log(this.route.snapshot.params.stepNumber);
    console.log(this.route.snapshot.params.slideNumber);
  }

  getSlideType(): SlideType {
    return SlideType.BibleVerse;
  }


}
