import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from '../../../service/course/course.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AddinputComponent } from '../../../component/addinput/addinput.component';
import { ReviewAreaAdd } from '../../../interface/carousel/reviewAreaAdd';
import { CacheService } from '../../../service/cache/cache.service';
import { MessageService } from '../../../service/message.service';
import { NzScrollService } from 'ng-zorro-antd/src/core/scroll/nz-scroll.service';
@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit, AfterViewInit {
  @ViewChild(AddinputComponent) childAddInput: AddinputComponent
  ngAfterViewInit(): void {
    //this.load = false;
    //console.log(this.targetDiv.nativeElement, document.querySelector('.header'), this._el); 
    this.GetCourseReviewArea();
    // console.log(this.targetDiv.nativeElement as Element,(this.targetDiv.nativeElement as Element).scrollHeight);

  }

  constructor(private courseService: CourseService, private cache: CacheService, private message: MessageService, private scrollSrv: NzScrollService, private _elementRef: ElementRef) {
    this._el = _elementRef.nativeElement;

  }


  private _el: HTMLElement;
  private list = [];
  load = true;
  isScroll = true;
  input = false;
  isAffix = true;
  loadding = false;
  flag = false;
  private target: Element = null;
  @ViewChild('divTarget') targetDiv: ElementRef;
  private req = {
    pageIndex: 0,
    id: 0,
  }
  orderType: number;
  userType: number = 0;
  ngOnInit() {
    this.courseService.setnavHover(3);
  }
  GetCourseReviewArea() {
    if (!this.load) return false;
    this.load = false;
    this.req.id = this.courseService.content.Id;
    this.req.pageIndex = ++this.req.pageIndex;

    this.courseService.GetCourseReviewArea(this.req.id, this.req.pageIndex, this.orderType, this.userType).subscribe(res => {
      this.flag = this.courseService.content.flag;
      this._setCloseLoad(res);
      this._setList(res);
    })
  }
  _setCloseLoad(res) {
    this.load = true;
    this.isScroll = res.length > 0 ? true : false;
  }
  _setList(arr) {
    // if (arr.length == 0) { //没有数据
    //   return false;
    // }
    this.list = this.req.pageIndex != 1 ? this.list.concat(arr) : arr;
  }
  _getList(): Array<any> {
    return this.list;
  }
  changeScroll() {
    if (this.isScroll)
      this.GetCourseReviewArea(); //加载数据
  }
  onChange(status: boolean) {
    console.log(status);
  }
  affixClick(e) {
    this.isAffix = false;
    this.input = true;
    this.childAddInput._inputFocus();
    // console.log(e);
  }
  checkedFlag() {
    if (!this.flag) {
      this.message.setMessage({ error: 'error', message: '您无法发表操作' });
      return false;
    }
    return true;
  }
  changeInput(value) {
    if (!this.checkedFlag()) {
      return false;
    }
    this.isAffix = true;
    if (value.trim() == '') return;
    // this.input = false;
    this.loadding = true;
    this.CourseReviewAreaAdd(value);
  }
  CourseReviewAreaAdd(value) {
    let reviewAreaAdd = new ReviewAreaAdd();
    reviewAreaAdd.i_course_id = this.list[0] == null ? this.courseService.content.Id : this.list[0].i_course_id;
    reviewAreaAdd.s_review_title = value;
    reviewAreaAdd.i_users_id = this.cache.getUserModel().UserId;
    this.CourseReviewAreaAddAjax(reviewAreaAdd);
  }
  CourseReviewAreaAddAjax(req: ReviewAreaAdd) {
    this.courseService.CourseReviewAreaAdd(req).subscribe(res => {
      if (res) {
        this.loadding = false;
        this.req.pageIndex = 0;
        this.clickBackTop();
        setTimeout(() => {
          this.GetCourseReviewArea();
        }, 500);
      } else {
        this.message.setMessage('添加失败');
      }
    })
  }

  clickBackTop(): void {
    this.scrollSrv.scrollTo(this.getTarget(), 300);
  }

  private getTarget(): Element | Window {
    return window;
  }
  set nzTarget(el: Element) {
    this.target = el;
  }
  clickAdd(value) {//点赞 
    if (value.success.StatusCode) {
      return;
    }
    this.list.find(res => res.i_id == value.id).i_point++;
  }
  orderFilter(i) {
    this.userType = i;
    this.req.pageIndex = 0;
    this.GetCourseReviewArea();
  }
  order(i) {
    this.orderType = i;
    this.req.pageIndex = 0;
    this.GetCourseReviewArea();
  }
}
