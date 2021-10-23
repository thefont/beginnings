import { Directionality } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Banner } from '../../core';
import { BannerComponent } from './banner.component';

const mockAd: Banner = {
    actionTypeId: 2,
    bannerTypeId: 1,
    description: '',
    desktopImageUrl: '',
    mobileImageUrl: '',
    showIcon: false,
    subtitle: '',
    title: '',
};

@Component({
    template: '<rnm-banner [advertisements]="banners"></rnm-banner>',
})
class TestHostComponent {
    banners: Banner[];
}
const touchEvent = (type: string, clientX: number, clientY: number): TouchEvent =>
    ({
        type,
        changedTouches: {
            0: {
                clientX,
                clientY,
            } as unknown,
        } as unknown,
    } as TouchEvent);

const touchStart = (clientX: number, clientY: number) => touchEvent('touchstart', clientX, clientY);
const touchEnd = (clientX: number, clientY: number) => touchEvent('touchend', clientX, clientY);

describe('BannerComponent', () => {
    let fixture: ComponentFixture<BannerComponent>;
    let component: BannerComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [BannerComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should wrap advertisements to front', fakeAsync(() => {
        component.active = 7;
        component.advertisements = [...Array(8).keys()].map((_) => mockAd);

        tick(500);
        component.next();

        expect(component.active).toEqual(0);
        expect(component.nextItem).toEqual(1);
        expect(component.prevItem).toEqual(7);

        discardPeriodicTasks();
    }));

    it('should auto advance', fakeAsync(() => {
        component.advertisements = [...Array(8).keys()].map((_) => mockAd);

        tick(component.interval);

        expect(component.active).toEqual(1);
        expect(component.nextItem).toEqual(2);
        expect(component.prevItem).toEqual(0);

        discardPeriodicTasks();
    }));

    it('should wrap advertisements to back', fakeAsync(() => {
        component.advertisements = [...Array(8).keys()].map((_) => mockAd);

        tick(500);
        component.prev();

        expect(component.active).toEqual(7);
        expect(component.nextItem).toEqual(0);
        expect(component.prevItem).toEqual(6);

        discardPeriodicTasks();
    }));

    it('should add advertisements if the length is 2', () => {
        component.advertisements = Array.from<Banner>({ length: 2 }).map((_) => mockAd);
        expect(component.items.length).toBe(4);
    });

    it('should slow on mouse enter', () => {
        component.onMouseEnter();
        fixture.detectChanges();
        expect(component.interval).toBe(component.HOVER_INTERVAL);
    });

    it('should return to normal on mouse leave', () => {
        component.onMouseLeave();
        fixture.detectChanges();
        expect(component.interval).toBe(component.INTERVAL);
    });

    it('should move prev on swipe left', fakeAsync(() => {
        spyOn(component, 'prev');
        component.swipe(touchStart(50, 50));
        tick(500);
        component.swipe(touchEnd(100, 50));

        expect(component.prev).toHaveBeenCalledTimes(1);
    }));

    it('should move next on swipe right', fakeAsync(() => {
        spyOn(component, 'next');
        component.swipe(touchStart(50, 50));
        tick(500);
        component.swipe(touchEnd(0, 50));

        expect(component.next).toHaveBeenCalledTimes(1);
    }));

    it('should not move on slow swipe', fakeAsync(() => {
        spyOn(component, 'next');
        spyOn(component, 'prev');
        component.swipe(touchStart(50, 50));
        tick(1500);
        component.swipe(touchEnd(0, 50));

        expect(component.next).toHaveBeenCalledTimes(0);
        expect(component.prev).toHaveBeenCalledTimes(0);
    }));

    it('should not move on short swipe', fakeAsync(() => {
        spyOn(component, 'next');
        spyOn(component, 'prev');
        component.swipe(touchStart(50, 50));
        tick(500);
        component.swipe(touchEnd(40, 50));

        expect(component.next).toHaveBeenCalledTimes(0);
        expect(component.prev).toHaveBeenCalledTimes(0);
    }));

    it('should not move on vertical swipe', fakeAsync(() => {
        spyOn(component, 'next');
        spyOn(component, 'prev');
        component.swipe(touchStart(50, 50));
        tick(500);
        component.swipe(touchEnd(50, 100));

        expect(component.next).toHaveBeenCalledTimes(0);
        expect(component.prev).toHaveBeenCalledTimes(0);
    }));
});

describe('BannerComponent when RTL', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [BannerComponent],
                providers: [
                    {
                        provide: Directionality,
                        useValue: {
                            value: 'rtl',
                        },
                    },
                ],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should wrap advertisements to front - RTL', fakeAsync(() => {
        component.active = 7;
        component.advertisements = Array.from<Banner>({ length: 8 }).map((_) => mockAd);

        tick(500);
        component.prev();

        expect(component.active).toEqual(0);
        expect(component.nextItem).toEqual(7);
        expect(component.prevItem).toEqual(1);

        discardPeriodicTasks();
    }));

    it('should wrap advertisements to back - RTL', fakeAsync(() => {
        component.advertisements = Array.from<Banner>({ length: 8 }).map((_) => mockAd);

        tick(500);
        component.next();

        expect(component.active).toEqual(7);
        expect(component.nextItem).toEqual(6);
        expect(component.prevItem).toEqual(0);

        discardPeriodicTasks();
    }));
});
