import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ErrorWorkCountComponent } from '../../public/error-work-count/error-work-count.component';
import { ActivatedRoute } from '@angular/router';
import { GetCourseByParent } from '../../../interface/carousel/get-course-by-parent';
import { CourseService } from '../../../service/course/course.service';
import { ChildService } from '../../../service/child.service';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent implements OnInit, AfterViewInit {

  constructor(private activedRouter: ActivatedRoute, private course: CourseService, private child: ChildService) { }
  @ViewChild('childWorkCount')
  childWork: ErrorWorkCountComponent;
  private id: number;
  list = [];
  getListFlag = false;
  asyncFlag = false;
  pageIndex = 1;
  type = 1;
  ngOnInit() {
    this.activedRouter.queryParams.subscribe(res => {
      this.id = res.id
      if (this.id == 0 || !this.id) {
        this.child.GetSonList().subscribe(childList => {
          this.id = childList[0].i_id;
          this.afInit();
        });
      } else {
        this.afInit();
      }
    });
  }
  ngAfterViewInit() {

  }
  afInit() {
    this.childWork.getCount(this.id);
    this.GetCourseCalendarByParent();
  }
  GetCourseCalendarByParent() {
    this.getListFlag = false;
    let req = new GetCourseByParent();
    req.pageIndex = this.pageIndex++;
    req.pageSize = 10;
    req.i_users_id = this.id; //孩子id 
    req.i_type = this.type;
    this.course.GetCourseErrorByParent(req).subscribe(res => {
      //console.log(res); 
      this.getListFlag = true;
      if (res.StatusCode == 500) {
        return;
      }
      this.list = req.pageIndex > 1 ? this.list.concat(res) : res;
      (res.length == 0 || res.length < req.pageSize) ? this.asyncFlag = true : this.asyncFlag = false;
      // this.getListFlag = true;
    });
  }
  changeScroll() {
    if (!this.asyncFlag) {
      this.asyncFlag = true;
      this.GetCourseCalendarByParent();
    }
  }

  clickDom(id) {
    this.type = id;
    this.pageIndex = 0;
    this.list = [];
    this.GetCourseCalendarByParent();
  }
}
