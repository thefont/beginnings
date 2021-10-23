import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide/slide.component';
import { FollowupComponent } from './followup/followup.component';
import {ReaderRoutes} from './reader.routes';



@NgModule({
  declarations: [SlideComponent, FollowupComponent],
  imports: [
    ReaderRoutes,
    CommonModule
  ]
})
export class ReaderModule { }
