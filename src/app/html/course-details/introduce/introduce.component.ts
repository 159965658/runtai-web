import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CourseService } from '../../../service/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { CourseDetailsModel } from '../../../interface/courseModel';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css'],
})
export class IntroduceComponent implements OnInit, OnDestroy {
  intro = '';
  paramsId: number;
  courseDetails: any;
  subscription: any;
  subscrModel: Subscription;
  jsonList: any;
  type: number;
  constructor(private courserService: CourseService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe((params) => { this.paramsId = params.id });
    // console.log(this.paramsId);
    this.courserService.setnavHover(1);

    this.subscription = this.courserService.getDetails().subscribe(res => {
      this.intro = res;
    })
    Observable.merge(this.route.queryParams).subscribe(res => {
      // !res.id ? : this.courserService.content.Id = res.id;
      this.type = this.courserService.content.type = res.type
      console.log(res.type);
      if (res.type == 2) {
        this.getSwitch();
      }
      else {
        this.jsonList = [];
      }
    });
    this.GetCourseDetails();
  }
  GetCourseDetails() {
    let req = new CourseDetailsModel();
    req.i_course_id = this.courserService.content.Id;
    this.courserService.GetCourseDetails(req).subscribe(res => {
      this.courserService.setDetails(res.s_course_details);
    });
  }
  getSwitch() {
    if (this.courserService.content.type == 2) {
      this.GetCombinationCourse();
    }

  }
  GetCombinationCourse() {
    let req = new CourseDetailsModel();
    req.i_course_id = this.courserService.content.Id;
    this.courserService.GetCombinationCourse(req).subscribe(res => {
      console.log(res);
      this.jsonList = JSON.parse(res.s_pack_course);

      // console.log(this.jsonList);
    });
  }
  getintro() {
    // this.intro = this.courserService.content.intro;
    // console.log(this.intro);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
