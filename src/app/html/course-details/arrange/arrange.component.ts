import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { CourseService } from '../../../service/course/course.service';
import { GetCombinationCourseWareRequest } from '../../../interface/carousel/get-combination-course-ware-request';

@Component({
  selector: 'app-arrange',
  templateUrl: './arrange.component.html',
  styleUrls: ['./arrange.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ArrangeComponent implements OnInit {

  constructor(private courseService: CourseService, private el: ElementRef, private renderer: Renderer) { }
  listModel: any;
  type = 1;
  ngOnInit() {
    setTimeout(() => {

      if (this.courseService.content.type == 2) {
        let req = new GetCombinationCourseWareRequest();
        req.pageIndex = 1;
        req.pageSize = 9999;
        req.i_course_id = this.courseService.content.Id;
        this.courseService.GetCombinationCourseWare(req).subscribe(res => {
          this.listModel = res;
          this.type = 2;
          console.log(res);
          setTimeout(() => {
            this.changeDomStyle();
          }, 1);

        });
      }
      else {
        this.courseService.GetCourseWare(this.courseService.content.Id).subscribe(res => {
          this.type = 0;
          this.listModel = res;
        });
      }
      console.log(window.document.querySelector('.ant-collapse-header'));
    }, 1000);

    this.courseService.setnavHover(2);
  }
  changeDomStyle() {
    let dom = this.el.nativeElement.querySelectorAll('.ant-collapse-header');
    let dom2 = this.el.nativeElement.querySelectorAll('.ant-collapse-content');
    for (let i = 0; i < dom.length; i++) {
      const element = dom[i];
      element.className += ' ant-collapse-header2';
    }
    for (let i = 0; i < dom2.length; i++) {
      const element = dom2[i];
      element.className += ' ant-collapse-content2';
    }

  }

}
