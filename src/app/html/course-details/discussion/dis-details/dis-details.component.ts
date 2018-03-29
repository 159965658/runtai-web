import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../service/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { GetCourseReviewReply } from '../../../../interface/courseModel';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReviewAreaAdd } from '../../../../interface/carousel/reviewAreaAdd';
import { CacheService } from '../../../../service/cache/cache.service';
import { CourseReviewReplyAdd } from '../../../../interface/carousel/courseReviewReplyAdd';
import { NzScrollService } from 'ng-zorro-antd/src/core/scroll/nz-scroll.service';
import { CourseReviewReplyLike } from '../../../../interface/carousel/courseReviewReplyLike';
import { environment } from '../../../../../environments/environment';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-dis-details',
  templateUrl: './dis-details.component.html',
  styleUrls: ['./dis-details.component.css']
})
export class DisDetailsComponent implements OnInit {

  constructor(private message: MessageService, private _courseService: CourseService, private activeRoute: ActivatedRoute, private fb: FormBuilder, private cache: CacheService, private scroll: NzScrollService) { }
  private req = new GetCourseReviewReply();
  list = new Array();
  parentList = null;
  formModel: FormGroup;
  inputValue = '';
  isInput = false;
  isScroll = true;
  url = environment.pathImg;
  i_reply = ""
  flag = true;
  ngOnInit() {
    console.log('parent' + this.isScroll);
    this.isScroll = true;
    this.req.pageIndex = 0;
    this.activeRoute.queryParams.subscribe(res => {
      this._setId(res.id);
      this.GetCourseReviewAreaDetails();
      setTimeout(() => {
        this.GetCourseReviewReply();
        this.flag = this._courseService.content.flag;
      }, 500);
    });
    this.formModel = this.fb.group({
      inputValue: [null, [Validators.required]]
    });
  }
  GetCourseReviewReply() {
    if (!this.isScroll) return;
    this.isScroll = false;
    this.req.pageIndex = this.req.pageIndex + 1;
    this._courseService.GetCourseReviewReply(this.req.i_review_id, this.req.pageIndex).subscribe(res => {
      this.isScroll = res.length == 0 ? false : true;
      this._setList(res);
    });
  }
  GetCourseReviewAreaDetails() {
    this._courseService.GetCourseReviewAreaDetails(this.req.i_review_id).subscribe(res => {
      this._setParentList(res);
      this.i_reply = res.i_reply + "条回复";
    });
  }
  _setId(id: number) {
    this.req.i_review_id = id;
  }
  _setParentList(arr) {
    this.parentList = arr;
  }
  _setList(arr) {
    this.list = this.req.pageIndex == 1 ? arr : this.list.concat(arr)
    // this.list = this.list.concat(arr);
  }
  _setInput(b: boolean) {
    this.isInput = b;
  }
  submit() {
    if (!this.flag) {
      this.message.setMessage({ error: 'error', message: '您不能发表讨论' });
      return false;
    }
    if (this.inputValue.trim()) {
      this._setInput(true);
      this.CourseReviewReplyAdd();
    }
  }
  CourseReviewReplyAdd() {
    let addReq: CourseReviewReplyAdd = new CourseReviewReplyAdd();
    addReq.i_course_id = this.parentList.i_course_id;
    addReq.s_review_id = this.parentList.i_id;
    addReq.s_reply_content = this.inputValue;
    this._courseService.CourseReviewReplyAdd(addReq).subscribe(res => {
      this._setInput(false);
      if (res.StastCode) {
        return;
      }
      if (res) {
        this.req.pageIndex = 0;
        this.isScroll = true;
        this.scroll.scrollTo(window, 50);
        setTimeout(() => {
          this.GetCourseReviewReply();
        }, 500);
      }
    })
  }
  changeScroll() {
    this.GetCourseReviewReply();
  }
  CourseReviewReplyLike(id) { //点赞
    let request: CourseReviewReplyLike = new CourseReviewReplyLike();
    request.i_course_id = this.parentList.i_course_id;
    request.i_id = id;
    this._courseService.CourseReviewReplyLike(request).subscribe(res => {
      if (res.StatusCode) {
        return;
      }
      this.list.find(res => res.i_id == id).i_reply_point++;
    });
  }

}
