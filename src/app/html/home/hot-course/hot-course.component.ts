import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ScrollService } from '../../../util/mutual/scroll.service';
import { Observable } from 'rxjs';
import { CourseService } from '../../../service/course/course.service';
import { CourseModel } from '../../../interface/courseModel';

@Component({
  selector: 'app-hot-course',
  templateUrl: './hot-course.component.html',
  styleUrls: ['./hot-course.component.css']
})
export class HotCourseComponent implements OnInit {
  constructor(private courseService: CourseService, private scrollService: ScrollService) { }
  coursel = new Array();
  i: number = 0;
  getAsyncFlag = false;
  ngOnInit() {
    const getModel = this.scrollService.getModel();
    getModel.pageIndex = 0;
    this.getIndexCourse();
    this.getAsyncFlag = false;
  }
  getIndexCourse() {
    const req = new CourseModel();
    if (this.getAsyncFlag) return;
    req.i_course_type = 3;
    const getModel = this.scrollService.getModel();
    req.pageIndex = getModel.pageIndex + 1;
    this.courseService.GetIndexCourse(req).subscribe(res => {
     console.log(res,res.length,this.coursel);
      this.getAsyncFlag = true; 
      if (res.length == 0) {
        return;
      }
      getModel.pageIndex = getModel.pageIndex + 1;
      this.scrollService.setModel(getModel);
      this.coursel = this.coursel.concat(res);
    }); 
  }
  numberIChange(i: number) {
    this.getAsyncFlag = false;
    this.getIndexCourse();
  }
}
