import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpBaseService } from '../../util/http-Base.service';
import { Urls } from '../url';
import { Observable } from 'rxjs/Observable';
import { CacheService } from '../cache/cache.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class StudyService {
  private subjectHeader = new Subject();
  private subArr = {
  };
  constructor(private http: HttpBaseService, private cache: CacheService) { }

  setSubjectHeader(value) {
    this.subjectHeader.next(value);
  }
  getSubjectHeader() {
    return this.subjectHeader.asObservable();
  }
  ObserviceDefer() {
    return new Subject();
    //return Observable.defer(() => Observable.of(value));
  }
  setSubarr(key: string, value: any) { //1.准备服务开始推送
    if (this.subArr[key] == null) {
      this.subArr[key] = this.ObserviceDefer();
    }
    this.subArr[key].next(value)
  }
  getSubAarr(key: string): Observable<any> { //2.获取订阅信息
    if (!this.subArr[key]) {
      this.subArr[key] = this.ObserviceDefer();
    }
    return this.subArr[key];
  }
  clearSubarr(key: Array<any>) {
    for (let i in key) {
      delete this.subArr['StudyScroll'];
    }
  }
  GetEnrollmentList(req) { //我的课程
    return this.http.httpPost(Urls.GetEnrollmentList, req);
  }
  GetUserStatistics() { //学生个人中心统计
    let user = this.cache.getUserModel();
    return this.http.httpPost(Urls.GetUserStatistics, { i_user_id: user.UserId })
  }
  CourseCalendarPhoneSearch(req) { //我的课程日历
    //  alert('发送');
    // let subjectArr = new Subject<any>();
    // return subjectArr;
    return this.http.httpPost(Urls.CourseCalendarPhoneSearch, req);
  }
  UserGenseeBind(i_courseWare_id) {
    let user = this.cache.getUserModel();
    return this.http.httpPost(Urls.UserGenseeBind, { i_courseWare_id: i_courseWare_id, i_users_id: user.UserId });
  }
  GetToken() {
    let user = this.cache.getUserModel();
    return this.http.httpPost(Urls.GetToken, { uid: environment.uid + user.UserId });
  }
}
