import { CourseService } from "./../../../service/course/course.service";
import { Component, OnInit, Input } from "@angular/core";
import { CourseModel } from "../../../interface/courseModel";
import { Observable } from "rxjs/Observable";
import { ScrollService, ScrollModel } from "../../../util/mutual/scroll.service";
import { CacheService } from "../../../service/cache/cache.service";
import { CacheEnum } from "../../../enum/cacheEnum";

@Component({
  selector: "app-recommend-course",
  templateUrl: "./recommend-course.component.html",
  styleUrls: ["./recommend-course.component.css"]
})
export class RecommendCourseComponent implements OnInit {
  constructor(private courseService: CourseService, private scrollService: ScrollService, private cache: CacheService) { }
  coursel = new Array();
  i: number = 0;
  getAsyncFlag = false;
  async = true;
  j = 0;
  // pageIndex = 1;
  ngOnInit() {
    const getModel = this.scrollService.getModel();
    getModel.pageIndex = 0;
    this.getIndexCourse();
    this.coursel = new Array();
    this.getAsyncFlag = false;

  }
  getIndexCourse() {

    const req = new CourseModel();
    if (this.getAsyncFlag || !this.async) return;
    req.i_course_type = 2;
    const getModel = this.scrollService.getModel();
    req.pageIndex = getModel.pageIndex + 1;
    this.courseService.GetIndexCourse(req).subscribe(res => {
      //if (this.cache.getSessionCache(CacheEnum.subject)) {
       // setTimeout(() => {
          this.getlist(res);
      //  }, 2000);
      //  return false;
    //  }
   //   else {
      //  this.getlist(res);
     // }
    });

  }
  getlist(res) {
    const getModel = this.scrollService.getModel();
    this.j++;
    this.getAsyncFlag = true;
    if (res.length == 0) {
      this.async = false;
      return;
    }
    getModel.pageIndex = getModel.pageIndex + 1;
    this.scrollService.setModel(getModel);
    this.coursel = this.coursel.concat(res);
  }
  numberIChange(i: number) {
    if (!this.async) {
      return;
    }
    this.getAsyncFlag = false;
    // this.pageIndex = i;
    this.getIndexCourse();
  }
}

export class CourseList { }
