import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { BibleService, PassageResponse } from 'src/app/providers/bible.service';
import {SlideType} from '../../models/slide.enum';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  passage$: Observable<PassageResponse>;

  constructor(private readonly route: ActivatedRoute, private readonly bibleService: BibleService) {
  }

  ngOnInit(): void {
    this.passage$ = this.bibleService.getPassage("MAT.1.15-MAT.1.18", false);
    console.log(this.route.snapshot.params.stepNumber);
    console.log(this.route.snapshot.params.slideNumber);
  }

  getTitle() {
    return this.route.snapshot.params.stepNumber + ': Who is Jesus'; //todo replace with step title
  }

  getSlideType() {
    return SlideType.BibleVerse;
  }


}
