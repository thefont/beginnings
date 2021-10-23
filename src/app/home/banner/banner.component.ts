import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  slides: { image: string; text?: string; descr?: string; action?: string; }[] = [
    { image: `assets/images/banners/0.jpeg`, text: `Creation to Christ`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`, action: `Review`},
    { image: `assets/images/banners/1.jpeg`, text: `Becoming Disciples`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`, action: `Review`},
    { image: `assets/images/banners/2.jpeg`, text: `Training Labourers`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`, action: `Start`},
    { image: `assets/images/banners/3.jpeg`, text: `Stories of Hope`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`},
    { image: `assets/images/banners/4.jpeg`, text: `Seven Signs of John`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`},
    { image: `assets/images/banners/5.jpeg`, text: `For Such a Time`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`},
    { image: `assets/images/banners/6.jpeg`, text: `Commands of Christ`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`},
    { image: `assets/images/banners/7.jpeg`, text: `Discover Christmas`, descr: `Discover God's beautiful story of creation, and follow the threads all the way to Christ's arrival`}
  ];
  activeSlideIndex = 0;

  constructor() {
  }
}
