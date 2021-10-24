import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from 'src/app/models/steps.model';
import { StepService } from 'src/app/providers/step.service';
import {StorageService} from '../../providers/storage.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  steps: Observable<Step[]>;
  activeSlideIndex = 0;

  constructor(
      private readonly stepService: StepService,
      private readonly storageService: StorageService) {
  }

  ngOnInit(): void {
      const pathCompleted = this.storageService.get<boolean>('completedStep:8');
      this.steps = this.stepService.getAllSteps(pathCompleted);
      setTimeout(() => {
          this.activeSlideIndex = this.storageService.get<number>('lastStep');
      }, 500);
  }
}
