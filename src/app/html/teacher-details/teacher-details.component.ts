import { Component, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { TeacherService } from '../../service/teacher/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NzScrollService } from 'ng-zorro-antd/src/core/scroll/nz-scroll.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {

  constructor(private scrollSrv: NzScrollService, private _teacherService: TeacherService, private _actionRoute: ActivatedRoute, public el: ElementRef, @Inject(DOCUMENT) doc: any) {
    this.doc = doc;
  }
  url = environment.pathImg;
  id = 0;
  index = 1;
  teacherDetails: any;
  t = true;
  @ViewChild('imgStyle') imgBox: ElementRef;
  private doc: Document;
  courseList = [];
  ngOnInit() {
    this._actionRoute.queryParams.subscribe((res) => {
      this.id = res.id;
    })
    this._teacherService.GetTeacherDetails(this.id)
      .subscribe(res => {
        this.teacherDetails = res;
        let style = this.teacherDetails.s_teacher_img ? 'url(' + this.url + '' + this.teacherDetails.s_teacher_img + ')' : 'url(../../../assets/imgs/skms2.png)';
        setTimeout(() => {
          this.imgBox.nativeElement['style']['backgroundImage'] = style;
        }, 500)

      });
    this._teacherService.GetTeacherCourse(this.id, 1).subscribe(res => {
      //this.courseList = res;
      for (let i in res) {
        let mode = {
          i_course_id: res[i].i_course_id,
          i_course_type: res[i].i_course_type,
          s_course_name: res[i].s_courseName,
          i_present_price: res[i].i_present_price,
          i_original_price: res[i].i_original_price,
          s_course_img: res[i].s_course_img,
          i_grade: res[i].s_grade,
          i_course_time: res[i].courseTime,
          i_subject: res[i].i_subject,
        }
        this.courseList.push(mode);
      }
    });
  }
  nzOffsetTop = 0;

}
