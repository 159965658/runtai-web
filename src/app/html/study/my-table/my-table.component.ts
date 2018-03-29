import { Component, OnInit, AfterViewInit, enableProdMode } from '@angular/core';
import { StudyService } from '../../../service/study/study.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { PageBase } from '../../../interface/pageBase';
import { environment } from '../../../../environments/environment';
import { GetEnrollmentList } from '../../../interface/study/GetEnrollmentList';
import { CacheService } from '../../../service/cache/cache.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ObserveEnum } from '../../../enum/ObserveEnum';
import { UtilMethodService } from '../../../util/util-method.service';
import { CourseCalendarPhoneSearch } from '../../../interface/study/CourseCalendarPhoneSearch';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {
    // this._studyService.getSubAarr(ObserveEnum.studyScroll).subscribe(res => console.log(res));
  }
  req = new CourseCalendarPhoneSearch();
  myCourseList: Observable<any>;
  dataList = [];
  getListFlag = false;
  isScroll = true;
  userName = '';
  dateTitle = {
    date: '未知',
    week: '未知'
  };
  ngOnDestroy(): void {
    this._studyService.clearSubarr([ObserveEnum.studyScroll])
  }

  constructor(private _studyService: StudyService, private _cacheService: CacheService, private util: UtilMethodService, private router: Router) { }

  ngOnInit() {
    this.userName = this._cacheService.getUserModel().UserName;
    this._studyService.getSubAarr(ObserveEnum.studyScroll).subscribe(res => {
      this.dateTitle = res;
      this.getEnrollmentList();
      // return;
    });
    //开启导航
    this._studyService.setSubjectHeader(true);
    //  this.getEnrollmentList();
  }
  getDate() {

    //const startDate = moment(this.calendatList.year + "-" + this.calendatList.month);
  }
  getEnrollmentList() {
    if (!this.isScroll) return;
    this.isScroll = false;
    this.getListFlag = false;
    let userModel = this._cacheService.getUserModel();
    this.req.i_users_id = userModel.UserId;
    let date = new Date(this.dateTitle.date + " 00:00:00");
    let date1 = new Date(this.dateTitle.date + " 23:59:00");
    this.req.startTime = (date.valueOf() / 1000).toString();
    this.req.endTime = (date1.valueOf() / 1000).toString();
    this._studyService.CourseCalendarPhoneSearch(this.req)
      .subscribe(res => {
        console.log(res);
        this._setDataList(res);
        this.isScroll = true;
        this.getListFlag = true;
      });
  }
  _setDataList(item: Array<any>) {

    //if (!clear)
    this.dataList = item;
    // else {
    //   this.dataList = this.dataList.concat(item);
    // }
  }
  hrefCode(url, id) {
    this._studyService.UserGenseeBind(id).subscribe(res => {
      location.href = url + '?nickname=' + this.userName + "_" + this._cacheService.getUserModel().s_login_account;
    });
  }
  href(id) {
    // this.course.content.type = type;
    this.router.navigate(['/courseDetails/' + id + '/introduce']);
  }
}

