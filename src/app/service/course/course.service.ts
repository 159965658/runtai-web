import { Urls } from "./../url";
import { Injectable } from "@angular/core";
import { HttpBaseService } from "../../util/http-Base.service";
import { LoginModel } from "../../interface/loginModel";
import { Observable } from "rxjs/Observable";
import { CourseModel, CourseDetailsModel, GetCourseReviewArea, GetCourseReviewReply } from "../../interface/courseModel";
import { environment } from "../../../environments/environment";
import { ScrollService } from "../../util/mutual/scroll.service";
import { GetElectiveCenter } from "../../interface/GetElectiveCenter";
import { Subject, BehaviorSubject } from "rxjs";
import { RequestBase } from "../../interface/requestBase";
import { ReviewAreaAdd } from "../../interface/carousel/reviewAreaAdd";
import { CourseReviewReplyLike } from "../../interface/carousel/courseReviewReplyLike";
import { CourseReviewReplyAdd } from "../../interface/carousel/courseReviewReplyAdd";
import { GetCourseAppraiseList } from "../../interface/carousel/getCourseAppraiseList";
import { CourseReviewAreaSubmit } from "../../interface/carousel/courseReviewAreaSubmit";
import { CourseAppraiseLike } from "../../interface/carousel/courseAppraiseLike";
import { GetCourseTeacher } from "../../interface/carousel/getCourseTeacher";
import { ChangePassWordRequest } from "../../interface/user/changePassWordRequest";
import { CacheService } from "../cache/cache.service";
import { GetButtonValue } from "../../interface/carousel/GetButtonValue";
import { SubjectModel } from "../../interface/subjectModel";
import { CacheEnum } from "../../enum/cacheEnum";
import { GetCourseByParent } from "../../interface/carousel/get-course-by-parent";
import { GetCombinationCourseWareRequest } from "../../interface/carousel/get-combination-course-ware-request";
@Injectable()
export class CourseService {
  private subjectOrder = new Subject<any>(); //确认订单通信
  private url = Urls;
  private subject = new Subject<any>();
  public content = {
    Id: 0,
    type: 0,
    flag: false,
  }
  private i = 0;
  constructor(private httpServe: HttpBaseService, private scrollService: ScrollService, private cache: CacheService) { }
  GetLogin(request: LoginModel): Observable<any> {
    // this.httpServe
    //   .httpPost(this.url.GetLogin, request);
    //   this.httpServe
    //   .httpPost(this.url.GetLogin, request);

    return this.httpServe
      .httpPost(this.url.GetLogin, request);
  }
  ChangePassWord(req: ChangePassWordRequest): Observable<any> { //重置用户密码
    req.i_users_id = this.cache.getUserModel().UserId;
    return this.httpServe.httpPost(this.url.UpdatePassWord, req);
  }
  getSubjectCache(): Observable<any[]> {
    let value = this.cache.getSessionSubjectCache();
    let subjectArr = new Subject<any>();
    setTimeout(() => {
      if (!value) {
        this.httpServe.httpPost(Urls.GetSubjectList, {}).subscribe(res => {
          if (res.StatusCode == 500)
            res = null;
          this.cache.setSessionCache(CacheEnum.subject, res);
          value = res;
          subjectArr.next(value)
        });
      }
      else {
        subjectArr.next(value)
      }
    }, 1);
    return subjectArr.asObservable();
  }
  GetIndexCourse(request: CourseModel) { //获取课程
    // return this.httpServe
    //   .httpPost(this.url.GetIndexCourse, request).map(r => r.json());// .map(r => {  let j = r.json();  j.Data = JSON.parse(j.Data); return j});

    return this.httpServe
      .httpPost(this.url.GetIndexCourse, request);
    //return subjectBehavior.asObservable();
    // return response;
  }

  GetCombinationCourse(request: CourseDetailsModel): any { //获取组合课程详情
    let user = this.cache.getUserModel();
    request.i_user_id = user ? user.UserId : 0;
    return this.httpServe
      .httpPost(this.url.GetCombinationCourse, request);
  }
  GetCourseDetails(request: CourseDetailsModel): any { //获取课程详情
    let user = this.cache.getUserModel();
    request.i_user_id = user ? user.UserId : 0;
    return this.httpServe
      .httpPost(this.url.GetCourseDetails, request);
  }
  GetCourseWare(id) { //获取课程安排
    return this.httpServe
      .httpPost(this.url.GetCourseWare, { i_course_id: id });
  }
  GetElectiveCenter(request: GetElectiveCenter): Observable<any> { //获取选课中心
    return this.httpServe
      .httpPost(this.url.GetElectiveCenter, request);
  }
  GetCourseReviewArea(id: number, pageIndex: number, order: number, userType: number) { //获取讨论区
    let request = new GetCourseReviewArea();
    request.i_course_id = id;
    request.pageIndex = pageIndex;
    request.i_orderType = order;
    request.userType = userType;
    let user = this.cache.getUserModel();
    request.i_user_id = user ? user.UserId : 0;
    return this.httpServe
      .httpPost(this.url.GetCourseReviewArea, request);
  }
  GetCourseReviewReply(id: number, pageIndex: number) { //获取讨论区
    let request = new GetCourseReviewReply();
    request.i_review_id = id;
    request.pageIndex = pageIndex;
    return this.httpServe
      .httpPost(this.url.GetCourseReviewReply, request);
  }
  GetCourseReviewAreaDetails(id: number) { //获取讨论区详情
    let request = new RequestBase();
    request.s_domain_name = environment.s_domain_name;
    request['i_id'] = id;
    return this.httpServe
      .httpPost(this.url.GetCourseReviewAreaDetails, request);
  }
  CourseReviewAreaAdd(request: ReviewAreaAdd) { //讨论区详情增加
    return this.httpServe
      .httpPost(this.url.CourseReviewAreaAdd, request);
  }
  CourseReviewAreaLike(request: CourseReviewReplyLike) { //讨论区点赞
    return this.httpServe
      .httpPost(this.url.CourseReviewAreaLike, request);
  }
  CourseReviewReplyAdd(request: CourseReviewReplyAdd): Observable<any> { //讨论区评论增加
    return this.httpServe
      .httpPost(this.url.CourseReviewReplyAdd, request);
  }

  CourseReviewReplyLike(request: CourseReviewReplyLike): Observable<any> { //讨论区评论点赞 
    return this.httpServe
      .httpPost(this.url.CourseReviewReplyLike, request);
  }
  GetCourseAppraiseList(request: GetCourseAppraiseList): Observable<any> { //讨论区评论点赞 
    return this.httpServe
      .httpPost(this.url.GetCourseAppraiseList, request);
  }
  CourseReviewAreaSubmit(request: CourseReviewAreaSubmit) { //评论提交
    return this.httpServe
      .httpPost(this.url.CourseReviewAreaSubmit, request);
  }
  CourseAppraiseLike(request: CourseAppraiseLike) {//评论区点赞
    return this.httpServe
      .httpPost(this.url.CourseAppraiseLike, request);
  }
  GetButtonValue(id: number) { //获取按钮状态
    let user = this.cache.getUserModel();
    let request = new GetButtonValue();
    request.i_user_id = user.UserId;
    request.i_course_id = id;
    return this.httpServe.httpPost(this.url.GetButtonValue, request)
  }
  GetCourseTeacher() { //获取讲师介绍
    let request = new GetCourseTeacher();
    request.i_course_id = this.content.Id;
    return this.httpServe
      .httpPost(this.url.GetCourseTeacher, request);
  }
  GetCourseCalendarByParent(req: GetCourseByParent) { //获取学生课程
    return this.httpServe.httpPost(Urls.GetCourseCalendarByParent, req);
  }
  GetCourseErrorByParent(req: GetCourseByParent) { //获取学生课程
    return this.httpServe.httpPost(Urls.GetCourseErrorByParent, req);
  }
  GetCombinationCourseWare(req: GetCombinationCourseWareRequest) { //获取组合课程安排
    return this.httpServe.httpPost(Urls.GetCombinationCourseWare, req);
  }
  getDetails(): Observable<any> { //父子通信服务
    return this.subject.asObservable();
  }

  setDetails(something: any) {
    this.subject.next(something);
  }
  setnavHover(i) {
    this.i = i;
  }
  //订单父子通信
  getOrderConfirm() {
    return this.subjectOrder.asObservable();
  }
  setOrderConfirm(something: any) {
    this.subjectOrder.next(something);
  }
  getnavHover() {
    return this.i;
  }
}
