import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CacheService } from '../../../service/cache/cache.service';
import { ChildService } from '../../../service/child.service';
import { GetCourseByParent } from '../../../interface/carousel/get-course-by-parent';
import { CourseService } from '../../../service/course/course.service';
import { ErrorWorkCountComponent } from '../../public/error-work-count/error-work-count.component';
import { UtilMethodService } from '../../../util/util-method.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit, AfterViewInit {
  visible = false;
  constructor(private cache: CacheService, private child: ChildService, private course: CourseService, private util: UtilMethodService) { }
  user = null;
  list = [];
  url = environment.pathImg;
  childList: any;
  childHoverText = { s_real_name: '', s_schoolName: '', s_grade: '', i_id: 0, coursecount:0,coursetime:0,good:0};
  pageIndex = 0;
  @ViewChild('childWorkCount')
  childWorkCount: ErrorWorkCountComponent;
  moreBtn = true; moreBtn1 = true;
  getListFlag = false;
  ngOnInit() {
    this.getChild();
  }
  ngAfterViewInit() {

  }
  //更新统计
  setCount() {
    this.childWorkCount.getCount(this.childHoverText['i_id']);
  }
  getChild() {
    this.child.GetSonList().subscribe(res => {
      if (!this.util.canIsViewParent(res)) {
        return;
      }
      this.childList = res;
      this.childHoverText = res[0];
      this.setCount();
      this.GetCourseCalendarByParent();
      this.pageIndex = 0;
    });
  }
  GetCourseCalendarByParent(type = 1) {
    this.getListFlag = false;
    this.list = [];
    let req = new GetCourseByParent();
    req.pageIndex = 1;
    req.pageSize = 5;
    req.i_type = type;
    req.i_users_id = this.childHoverText['i_id']; //孩子id
    this.course.GetCourseErrorByParent(req).subscribe(res => {
      this.list = res;
      this.moreBtn1 = !(res.length > 4)
      this.getListFlag = true;
    });
  }
  //切换孩子
  switchChild = (item) => {
    this.childHoverText = item;
    this.visible = false;
    this.setCount();
    this.pageIndex = 0;
     this.GetCourseCalendarByParent();
  }

  more($event) {
    this.moreBtn = ($event > 4) ? false : true;
  }
  clickDom(type) {
    this.GetCourseCalendarByParent(type); 
   // this.pageIndex = 0;
  }
}
