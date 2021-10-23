import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent {
  slides: { image: string; text?: string }[] = [
    { image: `assets/images/banners/0.jpeg`, text: `Creation to Christ`},
    { image: `assets/images/banners/1.jpeg`, text: `Becoming Disciples`},
    { image: `assets/images/banners/2.jpeg`, text: `Creation to Christ`}
  ];
  activeSlideIndex = 0;

  constructor() {
  }
}
