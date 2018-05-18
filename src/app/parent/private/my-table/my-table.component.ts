import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { Moment, lang } from 'moment';
import { Observable, Subscription } from 'rxjs';
import { ChildService } from '../../../service/child.service';
import { GetCourseByParent } from '../../../interface/carousel/get-course-by-parent';
import { CourseService } from '../../../service/course/course.service';
import { environment } from '../../../../environments/environment';
import { UtilMethodService } from '../../../util/util-method.service';
@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnDestroy() {
    this.subscrModel.unsubscribe();
  }
  getListFlag = true;
  starty: number;
  startx: number;
  subscrModel: Subscription;
  childHoverText = {
    name: '',
    id: 0
  };
  url = environment.pathImg;
  visible: boolean;
  childList = [];
  constructor(private child: ChildService, private course: CourseService, private util: UtilMethodService) { }
  dateArr = {
    date: '',
    day: '',
    dayArr: [],
  }
  hover = '';
  dateFormat = 'YYYY/MM';
  moveDay = null;
  width = document.documentElement.clientWidth;
  domMoveValue = 0;
  list = [];
  childCount = [];
  childCountNum = 0;
  @ViewChild('daysDom') dayEl: ElementRef;
  ngOnInit() {
    moment.locale('zh-cn');
    this.dateArr.date = this.getDate().format(this.dateFormat);
    this.dateArr.day = this.getDate().format('DD');
    this.hover = this.dateArr.date + '/' + this.dateArr.day;
    this.getChild();

    //console.log(this.getWeeks());
  }
  getCourseCalendarByParentRed(beginDate = this.dateArr.date + '/' + this.dateArr.day) {
    const id = this.childHoverText.id; 
    let date = beginDate;  
    let beginTime = (new Date(date + " 00:00:00").valueOf() / 1000).toString();
    let endTime = (new Date(date + " 23:59:00").valueOf() / 1000).toString();

    this.child.GetCourseCalendarByParentRed(id, beginTime, endTime).subscribe(res => {
     
      this.setChildCount(res,beginDate);
    })
  }
  setChildCount(res,beginDate) {
    let date = moment(beginDate);
    date = date.subtract(1, 'd');
    this.childCount = [];
    for (let i = 0; i < res.length; i++) {
      date = date.add(1, 'd');
      let model = {
        d_time: date.format('YYYY/MM/DD'),
        i_count: res[i].i_count
      }
      this.childCount.push(model);
    }
   
    //  this.getChildCount();
  }
  getChildCount(id) {
    let model = this.childCount.find(p => p.d_time == id);
    if (model) {
      this.childCountNum = model.i_count;
      return model.i_count == 0 ? false : true;
    }
    return false;
  }
  getChild() {
    this.child.GetSonList().subscribe(res => {
      if (!this.util.canIsViewParent(res)) {
        return;
      }
      this.childList = res;
   
      this.childHoverText = { id: this.childList[0].i_id, name: this.childList[0].s_real_name };
      this.GetCourseCalendarByParent();
      // this.getCourseCalendarByParentRed();
      this.defaultDay();
    });

  }
  ngAfterViewInit() {
    let startx = 0;
    let bindDom = document.querySelectorAll(".calendar");
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
    let endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    let direction = this.getDirection(this.startx, this.starty, endx, endy);


    switch (direction) {
      case 0:
        if (e.target['dataset'].value)
          this.dayClick(e.target['dataset'].value);
        break;
      case 3:
        this.moveAdd();
        break;
      case 4:
        this.moveLeft();
        break;
      default:
    }
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

  getDate() {
    return moment();
  }
  addDate() {
    let date = moment(this.dateArr.date + '/' + this.dateArr.day);
    this.dateArr.date = date.add(1, 'M').format(this.dateFormat);
    this.defaultDay();
  }
  reduceDate() {
    let date = moment(this.dateArr.date + '/' + this.dateArr.day);
    this.dateArr.date = date.subtract(1, 'M').format(this.dateFormat);
    this.defaultDay();
  }
  getWeeks(date = this.dateArr.date + '/' + this.dateArr.day) { // 获取周 
    let nowDate = moment(date);
    let week = nowDate.date(nowDate.date()).format('dd');
    return week;
  }
  getDay(date = this.dateArr.date + '/' + this.dateArr.day) { //获取天 
    let nowDate = moment(date).format('D');
    // console.log(nowDate);
    return nowDate;
  }
  setDay(day) { //设置天
    let date = moment(day);
    this.dateArr.date = date.format(this.dateFormat);
    this.dateArr.day = date.format('DD');
    //this.dateArr.day = day;
  }
  moveAdd() {
    this.domMoveValue = this.domMoveValue - 7 * (this.width / 14);
    this.dayEl.nativeElement['style']['transform'] = 'translate3d(' + this.domMoveValue + 'px,0,0)';
    this.moveDom();
  }
  moveLeft() {
    this.domMoveValue = this.domMoveValue + 7 * (this.width / 14);
    this.dayEl.nativeElement['style']['transform'] = 'translate3d(' + this.domMoveValue + 'px,0,0)';
    this.moveDom(2);
  }
  moveDom(v = 1) {
    let date;
    if (this.moveDay == null)//没有移动 
      this.moveDay = moment(this.dateArr.date + '/' + this.dateArr.day);
    if (v == 1)
      date = this.moveDay.add(7, 'd');
    else if (v == 2)
      date = this.moveDay.subtract(7, 'd');

    this.defaultDay(date);
    setTimeout(() => {
      this.dayEl.nativeElement['style']['transform'] = 'translate3d(0px,0,0)';
    }, 100);
  }

  //计算7天日期
  defaultDay(day = this.dateArr.date + '/' + this.dateArr.day) {
    let date = moment(day), befarDate = moment(this.dateArr.date + '/' + this.dateArr.day), nowM = date.month(),
      nowY = date.year(), dateMonth = befarDate.month(), dateY = befarDate.year();
   
    this.getCourseCalendarByParentRed(date.format('YYYY/MM/DD'));
    if (dateY != nowY || dateMonth != nowM) {
      this.setDay(date.format('YYYY/MM/DD'));
      this.moveDay = date;
    }
    let beginDate = moment(day).subtract(1, 'd'); //结束时间 
    let dayarr = [];
    for (let i = 0; i < 7; i++) {
      //有没不包含本月的日期
      let afterDate = beginDate.add(1, 'd');

      dayarr.push({ v: afterDate.format('YYYY/MM/DD') });
    }
    this.dateArr.dayArr = dayarr;
  }
  //点击日期
  dayClick(day) {
    //1选中日期
    this.hover = day;
    this.setDay(day);
    this.GetCourseCalendarByParent();
  }
  //切换孩子
  switchChild = (id, name) => {
    if (id == this.childHoverText['id']) {
      return;
    }
    this.childHoverText = { id: id, name: name };
    this.visible = false;
    this.GetCourseCalendarByParent();
    this.getCourseCalendarByParentRed();
  }
  GetCourseCalendarByParent() {
    this.getListFlag = false;
    let req = new GetCourseByParent();
    req.pageIndex = 1;
    req.pageSize = 10000;
    req.i_users_id = this.childHoverText.id; //孩子id
    //开始时间  结束时间
    let date = this.dateArr.date + '/' + this.dateArr.day;
    let begindate = new Date(date + " 00:00:00");
    let enddate = new Date(date + " 23:59:00");
    req.startTime = (begindate.valueOf() / 1000).toString();
    req.endTime = (enddate.valueOf() / 1000).toString();
    this.course.GetCourseCalendarByParent(req).subscribe(res => {
    
      this.list = res;
      this.getListFlag = true;
    });
  }
  getfooter(s_Absenteeism, s_Late, s_LeaveEarly, s_MissedSign, s_LateTime, s_LeaveEarlyTime) {
    return { s_Absenteeism: s_Absenteeism, s_Late: s_Late, s_LeaveEarly: s_LeaveEarly, s_MissedSign: s_MissedSign, s_LateTime: s_LateTime, s_LeaveEarlyTime: s_LeaveEarlyTime };
  }
}
