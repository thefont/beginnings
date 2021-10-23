import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.stepNumber);
    console.log(this.route.snapshot.params.slideNumber);
  }

}
