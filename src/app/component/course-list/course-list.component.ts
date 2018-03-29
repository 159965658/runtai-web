import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CourseService } from '../../service/course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private router: Router, private course: CourseService) { }
  @Input() courseList = [];
  url = environment.pathImg;
  ngOnInit() {
  }
  href(id, type) {
    this.course.content.type = type;
    this.router.navigate(['/courseDetails/' + id + '/introduce'], {
      queryParams: {
        type: type
      }
    });
  }
}
