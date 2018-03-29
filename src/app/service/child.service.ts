import { Injectable } from '@angular/core';
import { GetSonListRequest } from '../interface/user/getSonListRequest';
import { HttpBaseService } from '../util/http-Base.service';
import { Urls } from './url';
import { CacheService } from './cache/cache.service';
import { AddSonRequest } from '../interface/user/add-son-request';
import { GetSonDetailsRequest } from '../interface/user/get-son-details';
import { LiftedSonRequest } from '../interface/user/lifted-son-request';
import { CacheEnum } from '../enum/cacheEnum';
import { GetSonCourseStatisticsRequest } from '../interface/user/get-son-course-statistics-request';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ChildService {
  childList = 0;
  constructor(private http: HttpBaseService, private cache: CacheService, private router: Router) { }
  GetSonList(): Observable<any> { //获取孩子列表
    let req = new GetSonListRequest();
    const user = this.cache.getUserModel();
    req.i_userid_id = user.UserId;
    let subjectArr = new Subject<any>();
    this.http.httpPost(Urls.GetSonList, req).subscribe(res => {
      if (res.StatusCode == 500) {
        res = null;
      }
      subjectArr.next(res);
    });
    // this.cache.setSessionCache(CacheEnum.childList, res);
    // value = res;

    // let value = this.cache.getSessionCache(CacheEnum.childList);
    // let subjectArr = new Subject<any>();
    // setTimeout(() => {
    //   if (!value) {
    //     this.http.httpPost(Urls.GetSonList, req).subscribe(res => {
    //       if (res.StatusCode == 500) {
    //         res = null;
    //       }
    //       this.cache.setSessionCache(CacheEnum.childList, res);
    //       value = res;
    //       subjectArr.next(value);
    //     });
    //     // return subjectArr.asObservable();
    //   }
    //   else {
    //     value = JSON.parse(value);
    //     subjectArr.next(value);
    //   }
    // }, 1);
    return subjectArr.asObservable();
  }
  clearSon() {
    this.cache.removeSessionCache(CacheEnum.childList);
  }
  AddSon(req: AddSonRequest) { //增加孩子.
    const user = this.cache.getUserModel();
    req.i_parent_id = user.UserId;
    return this.http.httpPost(Urls.AddSon, req);
  }
  GetSonDetails(id: number) { //获取孩子详情
    let req = new GetSonDetailsRequest();
    req.i_userid_id = id;
    return this.http.httpPost(Urls.GetSonDetails, req);
  }
  LiftedSon(id: number) {
    let req = new LiftedSonRequest();
    req.i_userid_id = id;
    return this.http.httpPost(Urls.LiftedSon, req);
  }
  GetSonErrorStatistics(id: number) { //获取孩子异常考勤
    return this.http.httpPost(Urls.GetSonErrorStatistics, { i_users_id: id });
  }
  GetSonCourseStatistics(req: GetSonCourseStatisticsRequest) { //家长端孩子课程文字统计
    return this.http.httpPost(Urls.GetSonCourseStatistics, req);
  }
  GetSonStatistics() {
    let user = this.cache.getUserModel();
    return this.http.httpPost(Urls.GetSonStatistics, { i_users_id: user.UserId });
  }
  GetCourseCalendarByParentRed(userId: number, startTime: string, endTime: string) {

    return this.http.httpPost(Urls.GetCourseCalendarByParentRed, { i_users_id: userId, startTime: startTime, endTime: endTime });
  }
}
