import { Component, OnInit } from '@angular/core';
import { StudyService } from '../../../service/study/study.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { PageBase } from '../../../interface/pageBase';
import { CacheService } from '../../../service/cache/cache.service';
import { CacheEnum } from '../../../enum/cacheEnum';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { UtilMethodService } from '../../../util/util-method.service';
import { Observable } from 'rxjs/Observable';
import { GetEnrollmentList } from '../../../interface/study/GetEnrollmentList';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    //throw new Error("Method not implemented.");
  }
  myCourseList: any;
  constructor(private _studyService: StudyService, private _cacheService: CacheService, private util: UtilMethodService, private activaRouter: ActivatedRoute, private router: Router) { }
  req = new GetEnrollmentList();
  index: number = 0;
  getListFlag = false;
  isScroll = true;
  dataList = [];
  ngOnInit() {
    this.activaRouter.queryParams.subscribe(params => {
      console.log((params.id));
      if (params.id) {
        this.index = params.id
      }

      this.dataList = [];
      this.getEnrollmentList();
    });
    //关闭导航
    this._studyService.setSubjectHeader(false);

  }
  getEnrollmentList() {
    this.getListFlag = false;
    let userModel = this._cacheService.getUserModel();
    this.req.i_users_id = userModel.UserId;
    this.req.i_EndType = this.index == 0 ? 1 : 2;
    let nowData = moment().format('YYYY/MM/DD HH:mm:ss');
    this.myCourseList = this._studyService.GetEnrollmentList(this.req).takeWhile(res => {
      console.log(res.length);
      res.length <= 0 ? this.req.pageIndex = this.req.pageIndex - 1 : this.req.pageIndex;
      if (this.req.pageIndex < 1) {
        this.req.pageIndex = 1;
      }
      return res.length > 0;
    });
    this.myCourseList.subscribe(res => {
      this._setDataList(res);
      // let arr1 = new Array();
      // let arr2 = new Array();
      // res.forEach(element => { 
      //   if (new Date(nowData) > new Date(this.util.timesTamp(element.d_course_endtime))) {
      //     arr1.push(element)
      //   }
      //   else {
      //     arr2.push(element)
      //   }

      // });
      // console.log(arr1,arr2);
      // if (this.index == 1) {
      //   this._setDataList(arr1);
      // }
      // else {
      //   this._setDataList(arr2);
      // }
      this.isScroll = true;

      //new Date(nowData) > new Date(this.util.timesTamp(res.d_course_endtime)))
    });
    console.log(this.myCourseList);
    this.getListFlag = true;
  }
  clickFinished(type: number) {

    this.index = type;
    location.href = '/#/main/study/my-course?id=' + type;
    // this._setDataList(new Array(), false);
    // this.req.pageIndex = 1;
    // this.getEnrollmentList();
  }
  _setDataList = (item: Array<any>, clear: boolean = true) => {
    if (!clear)
      this.dataList = item;
    else {
      this.dataList = this.dataList.concat(item);
    }
  }
  _changeScroll() {
    if (!this.isScroll) {
      return false;
    }
    //关闭滚动
    this.isScroll = false;

    this.req.pageIndex++;
    this.getEnrollmentList();
    //if()
  }
  hrefCode(url, id) {
    let user = this._cacheService.getUserModel();
    this._studyService.UserGenseeBind(id).subscribe(res => {
      location.href = url + '?nickname=' + user.UserName + "_" + user.s_login_account;
    });
  }
  href(id, i) {
    // this.course.content.type = type;
    console.log(i);
    if (i == 1) {
      return false;
    }
    this.router.navigate(['/courseDetails/' + id + '/introduce']);
  }

}

