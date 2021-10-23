import {SlideType} from './slide.enum';

export class Slide {
  id: number;
  title: string;
  slideType: SlideType;
  slides: Slide[];
  response: string;
}
