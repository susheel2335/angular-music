import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import BScroll from 'better-scroll';

@Component({
  selector: 'app-scroll-y',
  templateUrl: './scroll-y.component.html',
  styleUrls: ['./scroll-y.component.scss']
})
export class ScrollYComponent implements OnInit, OnDestroy {
  private wrapper: any;

  @ViewChild('wrapperDom', {static: true})
  public wrapperDom: any;

  /*
  * 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
  * 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
  * 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
  */
  @Input()
  probeType: 1 | 2 | 3 = 1;
  @Input()
  pullUpLoad = false;
  @Input()
  onPullingUp: (val?: any) => void;
  @Input()
  onScroll: (val?: any) => void;

  constructor() {}

  refresh = () => {
    if (this.wrapper) {
      this.wrapper.refresh();
    }
  }

  scrollToElement = (...args: any[]) => {
    if (this.wrapper) {
      this.wrapper.scrollToElement(...args);
    }
  }

  scrollTo = (...args: any[]) => {
    if (this.wrapper) {
      this.wrapper.scrollTo(...args);
    }
  }

  finishPullDown = (...args: any[]) => {
    if (this.wrapper) {
      this.wrapper.finishPullDown(...args);
    }
  }

  finishPullUp = (...args: any[]) => {
    if (this.wrapper) {
      this.wrapper.finishPullUp(...args);
    }
    this.refresh();
  }

  ngOnInit() {
    this.initBS();
  }

  initBS = () => {
    const {probeType, pullUpLoad, onScroll, onPullingUp} = this;
    this.wrapper = new BScroll(this.wrapperDom.nativeElement, {
      scrollY: true,
      click: true,
      probeType,
      pullUpLoad
    });
    this.wrapper.on('scroll', (e: any) => {
      if (onScroll) {
        onScroll(e);
      }
    });
    this.wrapper.on('pullingUp', (e: any) => {
      if (onPullingUp) {
        onPullingUp(e);
      }
    });

  }

  ngOnDestroy() {}

}