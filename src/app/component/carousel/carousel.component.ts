import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { CarouselService } from '../../service/carousel/carousel.service';
import { RequestCarouselModel } from '../../interface/carousel/requestCarouselModel';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UtilMethodService } from '../../util/util-method.service';
import { NzCarouselComponent } from 'ng-zorro-antd';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  array = [1, 2, 3, 4];
  url = environment.pathImg;
  subscrModel: any; startx: number;
  starty: number;
  @ViewChild(NzCarouselComponent) carouselView: NzCarouselComponent;
  constructor(private bannerServe: CarouselService, private util: UtilMethodService) { }
  ngOnDestroy(): void {
    this.subscrModel.unsubscribe();
  }
  ngAfterViewInit(): void {
    let bindDom = document.querySelectorAll(".ant-carousel");
    const start = Observable.fromEvent(bindDom, 'touchstart')
      .map((e: TouchEvent) => ({
        event: e,
        startx: e.touches[0].pageX,
        starty: e.touches[0].pageY
      }));
    const chend = Observable.fromEvent(bindDom, 'touchend')
      .map((e: TouchEvent) => ({
        event: e,
        endx: e.changedTouches[0].pageX,
        endy: e.changedTouches[0].pageY
      }));
    this.subscrModel = Observable.merge(start, chend)
      .do(event => event.event.preventDefault())
      .subscribe((event) => {
        let e = event.event;
        switch (e['type']) {
          case 'touchstart':
            this.startx = e.touches[0].pageX;
            this.starty = e.touches[0].pageY;
            break;
          case 'touchend':
            this._touchend(e);
            break;
        }
      });
  }

  _touchend(e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = this.util.getDirection(this.startx, this.starty, endx, endy);
    if (direction == 0) {
      //this.daysClick(e, e.target['innerText']);
      return;
    }
    // let maxDomWidth = this.maxDomWidth();
    switch (direction) {
      case 3:
        //  console.log('移动3');
        this.nzSlickNext()
        break;
      case 4:
        // console.log('移动4');
        this.nzSlickPrev();
        break;
      default:
    }
  }

  nzSlickNext() { //切换下一张
    console.log(this.carouselView);
    this.carouselView.nzSlickNext();
  }
  nzSlickPrev() { //切换上一张
    this.carouselView.nzSlickPrev();
  }
  hflag = false;
  ngOnInit() {
    this.bannerServe.GetIndexBanner(new RequestCarouselModel()).subscribe(res => {
      if (res.length != 0) {
        this.array = res;
      }

    })
    const th = this;
    Observable.fromEvent(window, 'scroll').subscribe((event) => {
      const bodyh = document.body.clientHeight || document.documentElement.clientHeight;//浏览器高度
      const t = document.documentElement.scrollTop || document.body.scrollTop; //滚动距离
      const scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //滚动高度   
      if (t > 142) {
        th.hflag = true;
      }
      if (t < 134) {
        th.hflag = false;
      }
    })
  }
}

