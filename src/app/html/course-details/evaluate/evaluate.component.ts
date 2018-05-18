import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../../service/course/course.service';
import { GetCourseAppraiseList } from '../../../interface/carousel/getCourseAppraiseList';
import { AddinputComponent } from '../../../component/addinput/addinput.component';
import { CourseReviewAreaSubmit } from '../../../interface/carousel/courseReviewAreaSubmit';
import { NzScrollService } from 'ng-zorro-antd/src/core/scroll/nz-scroll.service';
import { CourseAppraiseLike } from '../../../interface/carousel/courseAppraiseLike';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css'],
})
export class EvaluateComponent implements OnInit {

  @ViewChild(AddinputComponent) childAddInput: AddinputComponent
  constructor(private courseService: CourseService, private scrollSrv: NzScrollService) { }
  private req: GetCourseAppraiseList = new GetCourseAppraiseList();
  load = false;
  isAffix = true;
  input = false;
  loadding = false;
  url = environment.pathImg;
  flag = false;
  ngOnInit() {
    this.courseService.setnavHover(4);
    this.GetCourseAppraiseList();
  }
  list = [];
  GetCourseAppraiseList() {
    this.load = false;
    this.req.pageIndex = this.req.pageIndex + 1;
    this.req.i_course_id = this.courseService.content.Id;
    this.courseService.GetCourseAppraiseList(this.req).subscribe(res => {
      this._setList(res);
      this.flag = this.courseService.content.flag;
     // console.log(this.flag);
      this.load = true;
    });
  }
  _setList(arr) {
    this.list = this.req.pageIndex == 1 ? arr : this.list.concat(arr);
  }
  changeScroll() {
    let s = this.list.length >= this.req.pageIndex * this.req.pageSize ? this.GetCourseAppraiseList() : false;
   // console.log(s);
  }
  changeInput(value) {
    this.isAffix = true;
    if (value.trim() == '') return;
    this.loadding = true;
    this.CourseReviewAreaSubmit(value);
  }
  affixClick(e) {
    if (!this.flag) return;
    this.isAffix = false;
    this.input = true;
    this.childAddInput._inputFocus();
    // console.log(e);
  }
  CourseReviewAreaSubmit(value) {
    let req = new CourseReviewAreaSubmit();
    req.i_course_id = this.courseService.content.Id;
    req.s_appraise_text = value;
    this.courseService.CourseReviewAreaSubmit(req).subscribe(res => {
      this.loadding = false;
      if (res) {
        this.scrollSrv.scrollTo(window, 300);
        this.req.pageIndex = 0;
        this.GetCourseAppraiseList();
      }
      console.log(res)
    });
  }
  CourseAppraiseLike(id) {
    let req = new CourseAppraiseLike();
    req.i_appraise_id = id;
    req.i_course_id = this.courseService.content.Id;
    this.courseService.CourseAppraiseLike(req).subscribe(res => {
      console.log(res);
      if (res == "true" || res == true)
        this.list.find(p => p.i_id == id).i_point++;
    })
  }
}
