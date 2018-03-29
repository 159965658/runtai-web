import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UtilMethodService } from '../../../util/util-method.service';
import * as moment from 'moment';
import { Moment, lang } from 'moment';
import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { boxAnimate, fadeIn } from '../../../test/test';
import { StudyService } from '../../../service/study/study.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ObserveEnum } from '../../../enum/ObserveEnum';
@Component({
  selector: 'app-study-header',
  templateUrl: './study-header.component.html',
  styleUrls: ['./study-header.component.css'],
  animations: [fadeIn, boxAnimate]
})
export class StudyHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  ngOnDestroy(): void {
    this.setSubjectHeader.unsubscribe();
    this.subscrModel.unsubscribe();
    this._studyService.clearSubarr([ObserveEnum.studyScroll])
  }
  calendar = true;
  calendatList = {
    year: '',
    month: '0',
    day: 0,
    monthArr: [],
    weekdays: []
  }
  transLeft = 0;
  monthArrModel = []
  weekdaysModel = []
  index = 0;
  startx: any
  starty: any
  widthS = 0;
  subscrModel: any;

  maxWidth = 0;
  constructor(private el: ElementRef, private util: UtilMethodService, private _studyService: StudyService) { }
  private setSubjectHeader: Subscription;
  ngOnInit() {
    this.setSubjectHeader = this._studyService.getSubjectHeader().subscribe((res: boolean) => {
      this.calendar = res;
      //推送当前选中的时间
      this.changeValueDate();
    });
    this.widthS = (document.body.clientWidth > 640 ? 640 - 28 : document.body.clientWidth - 28) / 7;
    if (!this.calendar) return false;
    else {
      let data = new Date();

      this.calendatList.year = data.getFullYear().toString();
      this.calendatList.month = this.util.month(data.getMonth());
      this.calendatList.day = data.getDate();
      this.initTime();
      //今天几号
      //移动dom
      this.initTransform();
    }
  }
  initTime() {

    const startDate = moment(this.calendatList.year + "-" + this.calendatList.month);
    let weekDays = [];
    let month = [];
    for (let i = 1; i <= startDate.daysInMonth(); i++) {
      weekDays.push(startDate.date(i).format("dd"));
      month.push(i);
    }
    this.calendatList.monthArr = month;
    this.calendatList.weekdays = weekDays;

  }
  isIndex(f) {
    if (f) {
      this.index = this.index + 1;
    }
    else {
      this.index = this.index - 1;
    }
  }
  getDomXy(e) {
    var x = 0, y = 0;
    while (e != null) {
      x += e.offsetLeft;
      y += e.offsetTop;
      e = e.offsetParent;
    }
    return { x: x, y: y };
  }
  getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }

    return result;
  }
  //获得角度
  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }

  clickCalendar() {
    this.calendar = !this.calendar;
  }
  _date = null;
  _moment = null;
  _endDate = null;
  newArray = (len) => {
    console.log(len);
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };
  _endValueChange = () => {
    if (this._endDate) {
      this.calendatList.year = this._endDate.getFullYear().toString();
      this.calendatList.month = this.util.month(this._endDate.getMonth());
      this.changeValueDate();
    }
    // this.index = 0;
    this._endDate = this._endDate;
    this.initTime();
    this.transLeft = 0;
    this.move(0);
    this.calendatList.day = 1;
    //domWidth
    this.domWidth();
  }
  changeValueDate() {
    let date = this.calendatList.year + '/' + this.calendatList.month + '/' + this.calendatList.day;
    const startDate = moment(date);
    date = startDate.format("YYYY/MM/DD");
    console.log(startDate);
    this._studyService.setSubarr(ObserveEnum.studyScroll, { date: date, week: '星期' + startDate.date(this.calendatList.day).format("dd") });
  }
  daysClick(e, item: any) {
    if (e.target['classList'][0] == 'sc_days_item') {
      this.calendatList.day = item;
      this.changeValueDate();
    }
    e.preventDefault();
    return false;
  }
  ngAfterViewInit() {

    this.changeValueDate();
    let th = this;
    let startx = 0;
    let bindDom = document.querySelectorAll(".sc_days");
    this.domWidth();
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
    var direction = this.getDirection(this.startx, this.starty, endx, endy);
    if (direction == 0) {
      this.daysClick(e, e.target['innerText']);
      return;
    }
    let maxDomWidth = this.maxDomWidth();
    switch (direction) {
      case 3:
        this.transLeft = this.transLeft + -maxDomWidth;
        if (this.transLeft <= -(this.maxWidth)) {
          this.transLeft = (-this.maxWidth) + maxDomWidth;
        }
        this.move(this.transLeft);
        break;
      case 4:
        this.transLeft = this.transLeft + maxDomWidth;
        if (this.transLeft > 0) {
          this.transLeft = 0;
        }
        this.move(this.transLeft);
        break;
      default:
    }
  }
  domWidth() {
    let maxWidth = this.maxDomWidth();
    let maxLeft = maxWidth * Math.ceil(this.calendatList.monthArr.length / 7);
    let scItem = document.querySelectorAll(".sc_item");
    scItem[1]['style']['width'] = maxLeft + "px";
    scItem[0]['style']['width'] = maxLeft + "px";
    this.maxWidth = maxLeft;
  }
  //计算一页宽度
  maxDomWidth() {
    return this.maxDomChildWithd() * 7
  }
  //计算一个日历宽高
  maxDomChildWithd() {
    return this.widthS + 4;
  }
  //初始化dom位置 选择当前
  initTransform() {

    if (this.calendatList.day == 1) {
      this.move(0);
      return;
    }
    let intMove = Math.ceil((this.calendatList.day / 7)) - 1;

    let moveValue = this.maxDomWidth() * intMove;
    this.transLeft = -moveValue;
    this.move(-moveValue);
  }
  move(value: number) {
    let dom = document.querySelectorAll(".sc_item");
    for (let i = 0; i < dom.length; i++) {
      dom[i]['style']['transform'] = 'translate3d(' + value + 'px,0,0)';
    }
    //   dom[1]['style']['transform'] = 'translate3d(' + value + 'px,0,0)';
  }
}
