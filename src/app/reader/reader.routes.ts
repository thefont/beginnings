import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SlideComponent} from './slide/slide.component';
import {FollowupComponent} from './followup/followup.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':stepNumber/:slideNumber',
        pathMatch: 'full',
        component: SlideComponent,
      },
      {
        path: ':stepNumber/followup', //todo do we need the step number
        pathMatch: 'full',
        component: FollowupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReaderRoutes {
}
