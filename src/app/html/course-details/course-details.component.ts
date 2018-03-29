import { Component, OnInit, ViewChild, OnChanges, AfterViewInit, DoCheck, ViewContainerRef, ComponentFactoryResolver, Input, AfterContentInit, ComponentRef } from '@angular/core';
import { CourseService } from '../../service/course/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseDetailsModel } from '../../interface/courseModel';
import { IntroduceComponent } from './introduce/introduce.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ArrangeComponent } from './arrange/arrange.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { count } from 'rxjs/operators';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  entryComponents: [IntroduceComponent, ArrangeComponent, DiscussionComponent, EvaluateComponent],
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, AfterContentInit {
  titleDetails: string;
  @ViewChild('childIntro') childIntro: IntroduceComponent;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  //  i_id = 49;
  subscription: Subscription;
  indexNavHover = {
    index: 1,
  }
  url = environment.pathImg;
  constructor(public courseService: CourseService, private route: ActivatedRoute, private router: Router, private resolver: ComponentFactoryResolver) { }
  paramsId: number;
  courseDetails: any;
  @Input() componentName;//需要加载的组件名 
  compRef: ComponentRef<any>; //  加载的组件实例
  nzspanNumber: number = 6;
  subscrModel: Subscription;
  ngOnInit() {
    this.titleDetails = '课程详情';
    this.route.params.subscribe((params) => {
      this.paramsId = params.id;
      this.courseService.content.Id = this.paramsId;
      this.GetCourseDetails();
    });
    Observable.merge(this.route.queryParams).subscribe(res => {
      this.courseService.content.type = res.type
    });
    this.courseService.setnavHover(1);
    //console.log(this.courseService.content.type);
  }


  GetCourseDetails() {
    let req = new CourseDetailsModel();
    req.i_course_id = this.paramsId;
    this.courseService.GetCourseDetails(req).subscribe(res => {
      let techer = res.s_speaker.split(',');
      let strTecher = '';
      for (let item in techer) {
        let te = techer[item].split("_");
        strTecher += te[1] + ',';
      }
      strTecher = strTecher.substring(0, strTecher.length - 1);
      res.s_speaker = strTecher;
      this.courseDetails = res;
      this.courseService.setDetails(res.s_course_details);
      this.courseService.content.type = this.courseDetails.i_course_type;
      this.courseService.content.flag = this.courseDetails.flag;
      console.log(this.courseDetails);
      if (this.courseDetails.i_course_type == 2) {
        this.nzspanNumber = 8;
      }
    })
  }
  createComponent(name) {
    let url = '/courseDetails/' + this.paramsId;
    switch (name) {
      case 1:
        this.courseService.setnavHover(1);
        //this.router.navigate(['/courseDetails/' + this.paramsId + '/introduce']);
        url += '/introduce';
        break;
      case 2:
        this.courseService.setnavHover(2);
        //this.courseService.content.type = 2;
        // this.router.navigate(['/courseDetails/' + this.paramsId + '/arrange']);
        url += '/arrange';
        break;
      case 3:
        this.courseService.setnavHover(3);
        // this.router.navigate(['/courseDetails/' + this.paramsId + '/discussion']);
        url += '/discussion';
        break;
      case 4:
        this.courseService.setnavHover(4);
        // this.router.navigate(['/courseDetails/' + this.paramsId + '/evaluate']);
        url += '/evaluate';
        break;
      case 5:
        this.courseService.setnavHover(5);
        //this.router.navigate(['/courseDetails/' + this.paramsId + '/c-t-r']);
        url += '/c-t-r';
        break;
    }
    this.router.navigate([url, { router: '/main' }], {
      queryParams: {
        type: this.courseService.content.type,
      }
    });
  }
  loadComponent(name) {
    this.container.clear();
    let factory = this.resolver.resolveComponentFactory(name);
    this.compRef = this.container.createComponent(factory) //创建组件
  }

  ngAfterContentInit() {
    // this.loadComponent()
  }
  ngOnDestroy() {
    if (this.compRef) {
      this.compRef.destroy();
    }

  }

}
